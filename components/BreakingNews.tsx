'use client'
import { useState, useEffect } from 'react'
import { Radio, TrendingUp } from 'lucide-react'

type BreakingItem = { title: string; link: string; pubDate: string; source: string }

const SOURCE_STYLES: Record<string, string> = {
  'BBC News':     'bg-red-900/50 text-red-300',
  'AP News':      'bg-blue-900/50 text-blue-300',
  'NPR':          'bg-orange-900/50 text-orange-300',
  'The Guardian': 'bg-emerald-900/50 text-emerald-300',
  'Al Jazeera':   'bg-amber-900/50 text-amber-300',
  'Reuters':      'bg-sky-900/50 text-sky-300',
  'DW News':      'bg-purple-900/50 text-purple-300',
}
const FALLBACK_STYLE = 'bg-slate-700/50 text-slate-300'

function sourceStyle(source: string) {
  return SOURCE_STYLES[source] ?? FALLBACK_STYLE
}

function timeAgo(dateStr: string) {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function BreakingNews() {
  const [items, setItems]     = useState<BreakingItem[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await fetch('/api/breaking')
      const data = await res.json()
      if (Array.isArray(data)) setItems(data)
    } catch { /* silent */ } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const id = setInterval(load, 120_000)
    return () => clearInterval(id)
  }, [])

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-10 rounded-xl animate-pulse" style={{ backgroundColor: 'var(--bg-card)' }} />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl animate-pulse" style={{ backgroundColor: 'var(--bg-card)' }} />
          ))}
        </div>
      </div>
    )
  }

  if (!items.length) return null

  const tickerItems = [...items, ...items]
  const trending    = items.slice(0, 8)

  return (
    <div className="space-y-3">

      {/* ── Ticker strip ── */}
      <div
        className="flex items-center rounded-xl overflow-hidden"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        {/* LIVE badge */}
        <div className="flex items-center gap-1.5 px-3 py-2.5 shrink-0 border-r" style={{ borderColor: 'var(--border)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <Radio size={13} className="text-red-400" />
          <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Live</span>
        </div>

        {/* Scrolling headlines */}
        <div className="flex-1 overflow-hidden py-2.5">
          <div className="animate-ticker flex gap-10 whitespace-nowrap">
            {tickerItems.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-blue-400 transition-colors group"
              >
                <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${sourceStyle(item.source)}`}>
                  {item.source}
                </span>
                <span className="text-sm text-slate-200 group-hover:text-blue-400">
                  {item.title}
                </span>
                <span className="text-xs text-slate-600">{timeAgo(item.pubDate)}</span>
                <span className="text-slate-700">·</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trending grid ── */}
      <div>
        <h2 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
          <TrendingUp size={14} className="text-blue-400" /> Trending Now
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {trending.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex flex-col gap-2 hover:border-blue-500/40 transition-all group"
            >
              <span className={`self-start text-xs font-medium px-1.5 py-0.5 rounded ${sourceStyle(item.source)}`}>
                {item.source}
              </span>
              <p className="text-sm text-slate-200 leading-snug line-clamp-3 group-hover:text-blue-400 transition-colors flex-1">
                {item.title}
              </p>
              <span className="text-xs text-slate-600">{timeAgo(item.pubDate)}</span>
            </a>
          ))}
        </div>
      </div>

    </div>
  )
}
