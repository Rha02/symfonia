import { SearchResult } from "@/models";

export async function GET(req: Request) {
    const dummyResponse: SearchResult[] = [
        {
            symbol: "STCK",
            name: "Some Stock",
            price: 101.12
        },
        {
            symbol: "TEST",
            name: "Some Stock",
            price: 90.58
        },
        {
            symbol: "SOME",
            name: "Some Stock",
            price: 423.15
        },
        {
            symbol: "SUM",
            name: "Some Stock",
            price: 12.91
        },
        {
            symbol: "TIX",
            name: "Some Stock",
            price: 203.47
        }
    ]

    return Response.json(dummyResponse)
}