import PortfolioTrend from "@/components/PortfolioTrend";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Symfonia | Dashboard",
    description: "Dashboard page of Symfonia",
};

export default function Dashboard() {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">
                Portfolio
            </h1>
            <PortfolioTrend coords={[]} />
        </div>
    )
}