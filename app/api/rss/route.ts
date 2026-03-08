import { NextRequest, NextResponse } from 'next/server'
import { parseStringPromise } from 'xml2js'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 })

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'GlobalInfoHub/1.0 RSS Reader',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      next: { revalidate: 300 }, // cache 5 min
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const xml = await res.text()
    const parsed = await parseStringPromise(xml, { explicitArray: false })

    const channel = parsed?.rss?.channel || parsed?.feed
    if (!channel) return NextResponse.json({ items: [] })

    // Handle both RSS and Atom
    const rawItems = channel.item || channel.entry || []
    const items = (Array.isArray(rawItems) ? rawItems : [rawItems]).slice(0, 10).map((item: Record<string, unknown>) => {
      const mediaContent = item['media:content'] as Record<string, unknown> | undefined
      const mediaThumb = item['media:thumbnail'] as Record<string, unknown> | undefined
      const enclosure = item.enclosure as Record<string, unknown> | undefined
      const contentEncoded = item['content:encoded'] as string | undefined

      // Extract image from various RSS patterns
      let imageUrl = (mediaContent?.$ as Record<string, string>)?.url
        || (mediaThumb?.$ as Record<string, string>)?.url
        || (enclosure?.$ as Record<string, string>)?.url

      // Try to extract from content:encoded
      if (!imageUrl && contentEncoded) {
        const match = contentEncoded.match(/<img[^>]+src="([^"]+)"/i)
        if (match) imageUrl = match[1]
      }

      const link = typeof item.link === 'string' ? item.link
        : (item.link as Record<string, string>)?._
        || (Array.isArray(item.link) ? (item.link[0] as Record<string, string>)?.$ ?.href : undefined)
        || ''

      return {
        title: item.title?._ || item.title || '',
        link,
        description: item.description?._ || item.description || item.summary?._ || item.summary || '',
        pubDate: item.pubDate || item.updated || item.published || new Date().toISOString(),
        imageUrl: imageUrl || null,
      }
    })

    return NextResponse.json({ items })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg, items: [] }, { status: 200 })
  }
}
