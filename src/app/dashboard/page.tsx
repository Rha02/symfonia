import PortfolioTrend from "@/components/PortfolioTrend";
import { PortfolioResponse, TrendCoord } from "@/models";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Symfonia | Dashboard",
    description: "Dashboard page of Symfonia",
};

export default async function Dashboard() {

    const host = process.env.SYMFONIA_BACKEND!
    const portfolioPromise: Promise<PortfolioResponse> = fetch(host + `/portfolio/trend?period=1D`).then(async res => {
        return await res.json()
    })

    const portfolioData = await portfolioPromise;

    const coords: TrendCoord[] = []
    for (let i = 0; i < portfolioData.timestamp.length; i++) {
        const ts: string = new Date(portfolioData.timestamp[i] * 1000).toISOString()
        const v: number = portfolioData.equity[i]
        coords.push({
            value: v,
            timestamp: ts
        })
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">
                Portfolio
            </h1>
            <PortfolioTrend coords={coords} />
        </div>
    )
}