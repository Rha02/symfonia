"use client"
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { Eye, Reload } from '@/components/icons'
import { PortfolioResponse, StockTrendCoord, TrendCoord } from '@/models';
import { useCallback, useEffect, useState } from 'react';
import CrosshairPlugin from '@/lib/plugins/crosshair';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    CrosshairPlugin
);

type TrendMode =
    | { type: 'portfolio' }
    | { type: 'stock', symbol: string }

type PortfolioTrendProps = {
    mode: TrendMode
}

const PERIODS = ['1D', '1W', '1M', '3M', '1Y', '5Y', 'All'] as const;
type Period = typeof PERIODS[number];

const buildUrl = (mode: TrendMode, period: Period) => {
    if (mode.type === 'portfolio') {
        return `/api/portfolio/trend?period=${period}`
    }
    return `/api/stocks/${mode.symbol}/trend?period=${period}`
}

const fetchTrendCoords = async (mode: TrendMode, period: Period) => {
    const res = await fetch(buildUrl(mode, period))
    if (!res.ok) {
        return []
    }
    if (mode.type == 'stock') {
        const data: StockTrendCoord[] = await res.json()
        const coords: TrendCoord[] = data.map(st => {
            return {
                value: st.vw,
                timestamp: st.t
            }
        })
        return coords
    }
    const data: PortfolioResponse = await res.json()
    const coords: TrendCoord[] = data.timestamp.map((ts, i) => ({
        timestamp: new Date(ts * 1000).toISOString(),
        value: data.equity[i],
    }))
    return coords
}

const formatTrendLabel = (isoString: string, period: Period) => {
    const date = new Date(isoString)

    if (period === '1D') {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
    }

    if (period === '1W' || period === '1M' || period === '3M' || period === '1Y') {
        return date.toLocaleDateString([], {
            month: 'short',
            day: 'numeric', 
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
    }

    // 5Y, All
    return date.toLocaleDateString([], {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

export default function PortfolioTrend(props: PortfolioTrendProps) {
    const [coords, setCoords] = useState<TrendCoord[]>([])
    const [period, setPeriod] = useState<Period>('1D')

    const fetchCoords = useCallback(async (p: Period) => {
        const newCoords = await fetchTrendCoords(props.mode, p)
        setCoords(newCoords)
    }, [props.mode])

    useEffect(() => {
        let ignore = false
        const run = async () => {
            const newCoords = await fetchTrendCoords(props.mode, period)
            if (!ignore) {
                setCoords(newCoords)
            }
        }
        run()
        return () => {
            ignore = true
        }
    }, [period, props.mode])

    const options: ChartOptions<'line'> = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                mode: 'index' as const,
                intersect: false,
                callbacks: {
                    title: (items) => {
                        const date = labels[items[0].dataIndex]
                        return formatTrendLabel(date, period)
                    },
                    label: (item) => `Value: ${item.formattedValue}`
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 5,
                    callback: (value, idx) => {
                        if (idx === 0) return ''
                        const date = labels[Number(value)]
                        return formatTrendLabel(date, period)
                    }
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 4
                }
            }
        }
    };

    const labels = coords.map(coord => coord.timestamp)
    const values = coords.map(coord => coord.value)

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'My Dataset',
                data: values,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointRadius: 0
            }
        ]
    }

    const onReload = () => {
        fetchCoords(period)
    }

    return (
        <section className='w-1/2 px-4 py-2 border-1 rounded-lg shadow border-indigo-300'>
            <div className='flex justify-between items-center mb-2'>
                <div className='flex gap-x-2 items-center'>
                    <PriceComponent coords={coords} />
                    <button className='py-1 px-1 rounded-lg hover:bg-indigo-100'>
                        <Eye className='opacity-75' />
                    </button>
                </div>
                <ul className='flex gap-x-1 text-indigo-900'>
                    {PERIODS.map(p => (
                        <li key={p}>
                            <button className={`py-1 px-2 rounded ${period === p ? 'bg-indigo-100' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
                        </li>
                    ))}
                    <li>
                        <button className='py-1 px-2 rounded hover:bg-indigo-50 rounded-full transition ease-in-out duration-150'
                            onClick={onReload}>
                            <Reload width={16} />
                        </button>
                    </li>
                </ul>
            </div>
            <Line data={data} options={options} />
        </section>
    )
}

type PriceComponentProps = {
    coords: TrendCoord[]
}

function PriceComponent(props: PriceComponentProps) {
    const coords = props.coords

    if (coords.length === 0) {
        return (
            <div className='flex gap-x-2 items-end'>
                <h2 className='font-semibold text-2xl text-indigo-950'>???</h2>
                <p className='text-lg font-semibold text-green-600'>+??%</p>
            </div>
        )
    }

    let i = 0
    for (; i < coords.length && coords[i].value == 0; i++) { }

    const firstPrice = coords[i].value
    const lastPrice = coords[coords.length - 1].value
    const percentChange = ((lastPrice / firstPrice) - 1) * 100

    return (
        <div className='flex gap-x-2 items-end'>
            <h2 className='font-semibold text-2xl text-indigo-950'>${lastPrice.toFixed(2)}</h2>
            {percentChange > 0 ? <p className='text-lg font-semibold text-green-600'>+{Math.abs(percentChange).toFixed(2)}%</p>
                : <p className='text-lg font-semibold text-red-600'>{percentChange.toFixed(2)}%</p>}

        </div>
    )
}