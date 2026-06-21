import { PortfolioResponse } from "@/models"

export async function GET(req: Request) {
    const host = process.env.SYMFONIA_BACKEND!

    const { searchParams } = new URL(req.url)
    const period = searchParams.get("period")!

    const params = new URLSearchParams({
        period: period
    })

    const res = await fetch(host + `/portfolio/trend?${params.toString()}`)

    const data: PortfolioResponse = await res.json()

    return Response.json(data)
}