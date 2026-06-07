import PortfolioTrend from "@/components/PortfolioTrend";
import SearchBar from "@/components/SearchBar";
import { Stock, StockTrendCoord, TrendCoord } from "@/models";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Symfonia | Stock",
    description: "Stock page of Symfonia",
};

type StockPageProps = {
    params: Promise<{ symbol: string }>
}

export default async function StockPage(props: StockPageProps) {
    const { symbol } = await props.params

    const host = process.env.SYMFONIA_BACKEND!
    const stockPromise: Promise<Stock> = fetch(host + `/stocks/${symbol}`).then(async res => {
        return await res.json()
    })

    const LIMIT = 500;

    const TIMEFRAME_MINUTES = Math.ceil((24 * 60) / LIMIT);
    const TIMEFRAME = `${TIMEFRAME_MINUTES}T`;
    
    const now = new Date()
    const day = now.getUTCDay()
    if (day === 0 || day === 6) {
        const daysToSubtract = day === 0 ? 2 : 1
        now.setUTCDate(now.getUTCDate() - daysToSubtract)
        now.setUTCHours(23, 59, 59, 0)
    }

    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    const msPerFrame = TIMEFRAME_MINUTES * 60 * 1000;
    const flooredMs = Math.floor(oneDayAgo.getTime() / msPerFrame) * msPerFrame
    const start = new Date(flooredMs).toISOString().replace(/\.\d{3}Z$/, "Z");

    const params = new URLSearchParams({
        timeframe: TIMEFRAME,
        start: start,
        limit: "500"
    })

    const stockTrendPromise: Promise<StockTrendCoord[]> = fetch(host + `/stocks/${symbol}/trend?${params.toString()}`).then(async res => {
        return await res.json()
    })

    const stock = await stockPromise;
    const stockTrend = await stockTrendPromise;

    const coords: TrendCoord[] = stockTrend.map(st => {
        return {
            value: st.vw,
            timestamp: st.t
        }
    })

    return (
        <div>
            <SearchBar />
            <div className="mt-4">
                <div className="flex gap-x-2 ">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        {symbol}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {stock.name}
                    </p>
                </div>
                <PortfolioTrend coords={coords} />
            </div>
        </div>
    )
}