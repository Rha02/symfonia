import PortfolioTrend from "@/components/PortfolioTrend";
import SearchBar from "@/components/SearchBar";
import { Stock } from "@/models";
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
    
    const stock = await stockPromise;

    return (
        <div>
            <SearchBar />
            <div className="mt-4">
                <div className="flex gap-x-2">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        {symbol}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {stock.name}
                    </p>
                </div>
                <PortfolioTrend mode={{ type: "stock", symbol: symbol }} />
            </div>
        </div>
    )
}