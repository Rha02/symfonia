import { SearchResult } from "@/models";

export async function GET(req: Request) {
    const host = process.env.SYMFONIA_BACKEND!
    
    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q")!

    const params = new URLSearchParams({
        value: q
    })
    
    const res = await fetch(host + `/search/stocks?${params.toString()}`)

    const data: SearchResult[] = await res.json()

    return Response.json(data)
}