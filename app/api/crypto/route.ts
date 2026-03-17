import { NextResponse } from 'next/server'

const PRIORITY_IDS = ['bitcoin', 'ethereum', 'ripple']

export async function GET() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets' +
      '?vs_currency=usd&order=market_cap_desc&per_page=30&page=1' +
      '&sparkline=true&price_change_percentage=24h',
      { next: { revalidate: 120 } }
    )
    if (!res.ok) throw new Error(`CoinGecko ${res.status}`)
    const coins = await res.json()

    // Pin BTC → ETH → XRP to positions 1-3, rest by market cap
    const priority = PRIORITY_IDS
      .map(id => coins.find((c: { id: string }) => c.id === id))
      .filter(Boolean)
    const rest = coins.filter((c: { id: string }) => !PRIORITY_IDS.includes(c.id))

    return NextResponse.json([...priority, ...rest])
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
