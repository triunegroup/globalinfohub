import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get('symbol')?.toUpperCase()
  if (!symbol) return NextResponse.json({ error: 'Missing symbol' }, { status: 400 })

  try {
    // Yahoo Finance v8 API (free, no key needed, ~15 min delay)
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 60 },
    })
    const data = await res.json()
    const result = data?.chart?.result?.[0]
    if (!result) throw new Error('No data')

    const meta = result.meta
    const price = meta.regularMarketPrice
    const prev = meta.previousClose || meta.chartPreviousClose
    const change = price - prev
    const changePercent = (change / prev) * 100

    // Also fetch news via Yahoo
    const newsUrl = `https://query1.finance.yahoo.com/v1/finance/search?q=${symbol}&newsCount=5&quotesCount=0`
    const newsRes = await fetch(newsUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 300 },
    })
    const newsData = await newsRes.json()
    const newsItems = newsData?.news?.slice(0, 5).map((n: Record<string, string>) => ({
      title: n.title,
      link: n.link,
      publisher: n.publisher,
      pubDate: new Date(Number(n.providerPublishTime) * 1000).toISOString(),
    })) || []

    return NextResponse.json({
      symbol,
      name: meta.longName || meta.shortName || symbol,
      price: parseFloat(price.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      currency: meta.currency || 'USD',
      exchange: meta.exchangeName || '',
      volume: meta.regularMarketVolume?.toLocaleString() || 'N/A',
      marketCap: meta.marketCap ? formatMarketCap(meta.marketCap) : 'N/A',
      fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh?.toFixed(2),
      fiftyTwoWeekLow: meta.fiftyTwoWeekLow?.toFixed(2),
      news: newsItems,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 200 })
  }
}

function formatMarketCap(val: number): string {
  if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`
  if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`
  if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`
  return `$${val.toLocaleString()}`
}
