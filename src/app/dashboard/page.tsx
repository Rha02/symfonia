import PortfolioTrend from "@/components/PortfolioTrend";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Symfonia | Dashboard",
    description: "Dashboard page of Symfonia",
};

export default function Dashboard() {
    return (
        <main className="mx-8 my-2">
            <PortfolioTrend />
        </main>
    )
}