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
} from 'chart.js';
import { Eye, Reload } from '@/components/icons'
import { TrendCoord } from '@/models';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type PortfolioTrendProps = {
    coords: TrendCoord[]
}

export default function PortfolioTrend(props: PortfolioTrendProps) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 5,
                    callback: (value: string | number, idx: number) => {
                        if (idx < 30) {
                            return null
                        }
                        
                        const date = new Date(labels[Number(value)])
                        return date.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            hour12: false 
                        })
                    }
                }
            }
        }
    };

    const coords = props.coords
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

    const firstPrice = coords[0].value
    const lastPrice = coords[coords.length - 1].value
    const percentChange = ((lastPrice / firstPrice) - 1) * 100

    return (
        <section className='w-1/2 px-4 py-2 border-1 rounded-lg shadow border-indigo-300'>
            <div className='flex justify-between items-center mb-2'>
                <div className='flex gap-x-2 items-center'>
                    <div className='flex gap-x-2 items-end'>
                        <h2 className='font-semibold text-2xl text-indigo-950'>{lastPrice.toFixed(2)}</h2>
                        {percentChange > 0 ? <p className='text-lg font-semibold text-green-600'>+{Math.abs(percentChange).toFixed(2)}%</p>
                            : <p className='text-lg font-semibold text-red-600'>{percentChange.toFixed(2)}%</p> }
                        
                    </div>
                    <button className='py-1 px-1 rounded-lg hover:bg-indigo-100'>
                        <Eye className='opacity-75' />
                    </button>
                </div>
                <ul className='flex gap-x-1 text-indigo-900'>
                    <li>
                        <button className='py-1 px-2 bg-indigo-100 rounded'>1D</button>
                    </li>
                    <li>
                        <button className='py-1 px-2 rounded'>1W</button>
                    </li>
                    <li>
                        <button className='py-1 px-2 rounded'>1M</button>
                    </li>
                    <li>
                        <button className='py-1 px-2 rounded'>3M</button>
                    </li>
                    <li>
                        <button className='py-1 px-2 rounded'>1Y</button>
                    </li>
                    <li>
                        <button className='py-1 px-2 rounded'>5Y</button>
                    </li>
                    <li>
                        <button className='py-1 px-2 rounded'>All</button>
                    </li>
                    <li>
                        <button className='py-1 px-2 rounded hover:bg-indigo-50 rounded-full transition ease-in-out duration-150'><Reload width={16} /></button>
                    </li>
                </ul>
            </div>
            <Line data={data} options={options} />
        </section>
    )
}