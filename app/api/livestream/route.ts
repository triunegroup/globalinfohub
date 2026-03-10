import { NextResponse } from 'next/server'

// Patterns to extract an 11-char YouTube video ID from the page HTML
const ID_PATTERNS = [
  /"videoId":"([a-zA-Z0-9_-]{11})"/,
  /watch\?v=([a-zA-Z0-9_-]{11})/,
  /"canonical":"https:\\\/\\\/www\.youtube\.com\\\/watch\?v=([a-zA-Z0-9_-]{11})"/,
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const handle = searchParams.get('handle')

  if (!handle) {
    return NextResponse.json({ error: 'Missing handle parameter' }, { status: 400 })
  }

  try {
    // Fetch the channel's /live page — YouTube redirects this to the current active stream
    const res = await fetch(`https://www.youtube.com/${handle}/live`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml',
      },
      // Cache for 5 minutes — live streams rarely change ID more than once a day
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      return NextResponse.json({ error: `YouTube returned ${res.status}` }, { status: 502 })
    }

    const html = await res.text()

    // Try each pattern until we find a video ID
    for (const pattern of ID_PATTERNS) {
      const match = html.match(pattern)
      if (match?.[1]) {
        return NextResponse.json(
          { videoId: match[1] },
          { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' } }
        )
      }
    }

    return NextResponse.json({ error: 'No live stream found' }, { status: 404 })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch channel page' }, { status: 500 })
  }
}
