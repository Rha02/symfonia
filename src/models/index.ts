type SearchResult = {
    symbol: string;
    name: string;
    price: number;
}

type Stock = {
    symbol: string;
    name: string;
}

type StockTrendCoord = {
    t: string;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
    n: number;
    vw: number;
}

type TrendCoord = {
    value: number
    timestamp: string
}

type PortfolioResponse = {
    timestamp: number[],
    equity: number[],
    profit_loss: number[],
    profit_loss_pct: number[]
    base_value: number
}

export type { SearchResult, Stock, StockTrendCoord, TrendCoord, PortfolioResponse };