'use client'
import { useState, useEffect } from 'react'
import FeedCard from './FeedCard'
import { FeedItem } from '@/lib/types'
import { RefreshCw, AlertCircle } from 'lucide-react'

interface FeedSource {
  name: string
  url: string
  siteUrl: string
}

interface Props {
  sources: FeedSource[]
  title?: string
}

export default function FeedSection({ sources, title }: Props) {
  const [items, setItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<string[]>([])
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const sourceKey = sources.map(s => s.url).join(',')

  async function loadFeeds() {
    setLoading(true)
    setErrors([])
    const all: FeedItem[] = []
    const errs: string[] = []

    await Promise.all(
      sources.map(async (src) => {
        try {
          const res = await fetch(`/api/rss?url=${encodeURIComponent(src.url)}`)
          const data = await res.json()
          if (data.items) {
            all.push(...data.items.map((item: Omit<FeedItem, 'source' | 'sourceUrl'>) => ({
              ...item,
              source: src.name,
              sourceUrl: src.siteUrl,
            })))
          }
          if (data.error) errs.push(`${src.name}: ${data.error}`)
        } catch {
          errs.push(`${src.name}: Network error`)
        }
      })
    )

    // Sort by date
    all.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    setItems(all)
    setErrors(errs)
    setLastUpdated(new Date())
    setLoading(false)
  }

  useEffect(() => { loadFeeds() }, [sourceKey])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {title && <h2 className="text-base font-semibold text-white">{title}</h2>}
        <div className="flex items-center gap-3 ml-auto">
          {lastUpdated && (
            <span className="text-xs text-slate-500">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button onClick={loadFeeds} disabled={loading}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors disabled:opacity-50">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {errors.map((e, i) => (
            <span key={i} className="flex items-center gap-1 text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
              <AlertCircle size={10} /> {e}
            </span>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="w-full h-28 bg-slate-700 rounded-lg mb-3" />
              <div className="h-3 bg-slate-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-slate-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <AlertCircle size={24} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No articles could be loaded. RSS feeds may be temporarily unavailable.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {items.map((item, i) => (
            <FeedCard key={`${item.source}-${i}`} item={item} />
          ))}
        </div>
      )}

      <div className="mt-4 p-3 rounded-lg text-xs text-slate-600 leading-relaxed"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        Content sourced from: {sources.map(s => (
          <a key={s.name} href={s.siteUrl} target="_blank" rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-400 underline mx-0.5">{s.name}</a>
        ))}. GlobalInfoHub does not own this content. All rights belong to respective publishers.
      </div>
    </div>
  )
}
