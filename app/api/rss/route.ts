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

      const linkRaw = item.link
      const link = typeof linkRaw === 'string' ? linkRaw
        : (linkRaw as Record<string, string>)?._
        || (Array.isArray(linkRaw) ? ((linkRaw[0] as Record<string, Record<string, string>>)?.$ )?.href : undefined)
        || ''

      const asStr = (v: unknown): string => {
        if (typeof v === 'string') return v
        if (v && typeof v === 'object') return (v as Record<string, string>)._ || ''
        return ''
      }

      return {
        title: asStr(item.title),
        link,
        description: asStr(item.description) || asStr(item.summary),
        pubDate: (item.pubDate || item.updated || item.published || new Date().toISOString()) as string,
        imageUrl: imageUrl || null,
      }
    })

    return NextResponse.json({ items })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg, items: [] }, { status: 200 })
  }
}
