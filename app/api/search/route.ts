import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')
  if (!q) return NextResponse.json({ error: 'Missing query' }, { status: 400 })

  try {
    // DuckDuckGo Instant Answer API (free, no key)
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1`
    const ddgRes = await fetch(ddgUrl, { next: { revalidate: 60 } })
    const ddg = await ddgRes.json()

    const answer = ddg.AbstractText || ddg.Answer || ''
    const answerSource = ddg.AbstractSource || ''
    const answerUrl = ddg.AbstractURL || ''
    const relatedTopics = (ddg.RelatedTopics || [])
      .filter((t: Record<string, string>) => t.FirstURL && t.Text)
      .slice(0, 8)
      .map((t: Record<string, string>) => ({ title: t.Text, url: t.FirstURL }))

    return NextResponse.json({
      query: q,
      answer,
      answerSource,
      answerUrl,
      relatedTopics,
      searchUrl: `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
      googleUrl: `https://www.google.com/search?q=${encodeURIComponent(q)}`,
      newsUrl: `https://news.google.com/search?q=${encodeURIComponent(q)}`,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
