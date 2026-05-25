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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function PortfolioTrend() {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
    };

    const data = {
        labels: ['9:00', '12:00', '16:00', '20:00'],
        datasets: [
            {
                label: 'My Dataset',
                data: [1000, 1020, 890, 1120],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
        ]
    }

    return (
        <section className='w-1/2 px-4 py-2 border-1 rounded-lg shadow border-indigo-300'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold text-gray-700'>Portfolio</h1>
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
            <div className='flex gap-x-2 items-center'>
                <div className='flex gap-x-2 items-end'>
                    <h2 className='font-semibold text-2xl text-indigo-950'>$123,123.12</h2>
                    <p className='text-lg font-semibold text-green-600'>+5.68%</p>
                </div>
                <button className='py-1 px-1 rounded-lg hover:bg-indigo-100'>
                    <Eye className='opacity-75' />
                </button>
            </div>
            <Line data={data} options={options} />
        </section>
    )
}