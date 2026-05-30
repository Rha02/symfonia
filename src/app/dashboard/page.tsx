import PortfolioTrend from "@/components/PortfolioTrend";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Symfonia | Dashboard",
    description: "Dashboard page of Symfonia",
};

export default function Dashboard() {
    return (
        <PortfolioTrend />
    )
}