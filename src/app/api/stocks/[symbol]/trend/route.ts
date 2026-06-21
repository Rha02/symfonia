import { Period, StockTrendCoord } from "@/models"

export async function GET(req: Request, { params }: { params: Promise<{ symbol: string }>}) {
    const host = process.env.SYMFONIA_BACKEND!

    const { searchParams } = new URL(req.url)
    const period = searchParams.get("period")! as Period
    const timeframe = getTimeframe(period)
    
    const limit = "1000"

    // Get current time. If weekend, set to friday night
    const now = new Date()
    const day = now.getUTCDay()
    if (day === 0 || day === 6) {
        const daysToSubtract = day === 0 ? 2 : 1
        now.setUTCDate(now.getUTCDate() - daysToSubtract)
        now.setUTCHours(23, 59, 59, 0)
    }

    const start = getStartDate(now, period)
    const startStr = start.toISOString().replace(/\.\d{3}Z$/, "Z");

    const urlParams = new URLSearchParams({
        timeframe: timeframe,
        start: startStr,
        limit: limit
    })

    const { symbol } = await params

    const res = await fetch(host + `/stocks/${symbol}/trend?${urlParams.toString()}`)

    const data: StockTrendCoord[] = await res.json()

    return Response.json(data)
}

const getTimeframe = (period: Period) => {
    switch (period) {
        case "1D":
            return '2T'
        case "1W":
            return '12T'
        case "1M":
            return '45T'
        case "3M":
            return '3H'
        case "1Y":
            return '9H'
        case "5Y":
            return '1W'
        case "All":
            return '1M'
    }
}

const getStartDate = (end: Date, period: Period) => {
    // For now, return all starting from 1990
    if (period == 'All') {
        return new Date(1990, 0, 1)
    }

    let diff = 24 * 60 * 60 * 1000
    if (period == '1W') {
        diff *= 7
    } else if (period == '1M') {
        diff *= 31
    } else if (period == '3M') {
        diff *= 31 * 3
    } else if (period == '1Y') {
        diff *= 366
    } else if (period == '5Y') {
        diff *= 366 * 5
    }

    const start = new Date(end.getTime() - diff)
    return start
}