import SearchBar from "@/components/SearchBar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Symfonia | Dashboard",
    description: "Dashboard page of Symfonia",
};

type StockPageProps = {
    params: Promise<{ symbol: string }>
}

export default async function StockPage(props: StockPageProps) {
    const { symbol } = await props.params

    return (
        <div>
            <SearchBar />
            <div className="mt-4">
                {symbol}
            </div>
        </div>
    )
}