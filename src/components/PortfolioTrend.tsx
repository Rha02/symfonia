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
        <section className='w-1/2'>
            <div className=''>
                <h1 className='text-2xl font-semibold text-gray-700'>Portfolio</h1>
            </div>
            <Line data={data} options={options} />
        </section>
    )
}