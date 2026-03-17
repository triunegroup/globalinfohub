import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get('lat')
  const lon = req.nextUrl.searchParams.get('lon')
  const units = req.nextUrl.searchParams.get('units') || 'fahrenheit'

  if (!lat || !lon) return NextResponse.json({ error: 'Missing lat/lon' }, { status: 400 })

  const windUnit = units === 'fahrenheit' ? 'mph' : 'kmh'

  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum` +
      `&temperature_unit=${units}&wind_speed_unit=${windUnit}&timezone=auto&forecast_days=7`

    const res = await fetch(url, { next: { revalidate: 300 } })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
