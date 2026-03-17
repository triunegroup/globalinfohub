import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get('city')
  if (!city) return NextResponse.json({ error: 'Missing city' }, { status: 400 })

  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
      { next: { revalidate: 86400 } }
    )
    const data = await res.json()
    const r = data.results?.[0]
    if (!r) return NextResponse.json({ error: 'City not found' }, { status: 404 })

    return NextResponse.json({
      name: r.name,
      country: r.country,
      latitude: r.latitude,
      longitude: r.longitude,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
