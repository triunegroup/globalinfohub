import { NextResponse } from 'next/server'
import { parseStringPromise } from 'xml2js'

export const revalidate = 120

const SOURCES = [
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml',          source: 'BBC News'     },
  { url: 'https://rsshub.app/apnews/topics/apf-topnews',         source: 'AP News'      },
  { url: 'https://feeds.npr.org/1001/rss.xml',                   source: 'NPR'          },
  { url: 'https://www.theguardian.com/world/rss',                source: 'The Guardian' },
  { url: 'https://www.aljazeera.com/xml/rss/all.xml',            source: 'Al Jazeera'   },
  { url: 'https://feeds.reuters.com/reuters/worldNews',          source: 'Reuters'      },
  { url: 'https://rss.dw.com/rdf/rss-en-all',                   source: 'DW News'      },
]

type BreakingItem = { title: string; link: string; pubDate: string; source: string }

async function fetchFeed(url: string, source: string): Promise<BreakingItem[]> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'GlobalInfoHub/1.0 RSS Reader', Accept: 'application/rss+xml, */*' },
      next: { revalidate: 120 },
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return []
    const xml = await res.text()
    const parsed = await parseStringPromise(xml, { explicitArray: false })
    const channel = parsed?.rss?.channel || parsed?.feed
    if (!channel) return []

    const rawItems = channel.item || channel.entry || []
    const items = Array.isArray(rawItems) ? rawItems : [rawItems]

    return items.slice(0, 8).flatMap((item: Record<string, unknown>) => {
      const linkRaw = item.link
      const link =
        typeof linkRaw === 'string' ? linkRaw
        : (linkRaw as Record<string, string>)?._
        || (Array.isArray(linkRaw)
          ? ((linkRaw[0] as Record<string, Record<string, string>>)?.$)?.href
          : undefined)
        || ''

      const asStr = (v: unknown): string => {
        if (typeof v === 'string') return v
        if (v && typeof v === 'object') return (v as Record<string, string>)._ || ''
        return ''
      }

      const title = asStr(item.title)
      const pubDate = String(item.pubDate || item.updated || item.published || '')
      if (!title || !link) return []
      return [{ title, link, pubDate, source }]
    })
  } catch {
    return []
  }
}

export async function GET() {
  const all = (await Promise.all(SOURCES.map(s => fetchFeed(s.url, s.source)))).flat()
  all.sort((a, b) => {
    const ta = a.pubDate ? new Date(a.pubDate).getTime() : 0
    const tb = b.pubDate ? new Date(b.pubDate).getTime() : 0
    return tb - ta
  })
  return NextResponse.json(all.slice(0, 24))
}
