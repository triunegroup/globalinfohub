'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { Search, X, TrendingUp, Globe, ExternalLink } from 'lucide-react'

interface SearchResult {
  query: string
  answer: string
  answerSource: string
  answerUrl: string
  relatedTopics: { title: string; url: string }[]
  searchUrl: string
  googleUrl: string
  newsUrl: string
  // stock fields
  symbol?: string
  name?: string
  price?: number
  change?: number
  changePercent?: number
  currency?: string
  exchange?: string
  volume?: string
  marketCap?: string
  fiftyTwoWeekHigh?: string
  fiftyTwoWeekLow?: string
  news?: { title: string; link: string; publisher: string; pubDate: string }[]
  error?: string
}

const STOCK_PATTERN = /^[A-Z]{1,5}(\.[A-Z]{1,2})?$/

export default function Header() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isStockQuery = (q: string) => STOCK_PATTERN.test(q.trim().toUpperCase())

  async function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault()
    const q = query.trim()
    if (!q) return

    setLoading(true)
    setShowPanel(true)

    try {
      if (isStockQuery(q)) {
        const res = await fetch(`/api/stock?symbol=${encodeURIComponent(q.toUpperCase())}`)
        const data = await res.json()
        setResults({ query: q, ...data })
      } else {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
        const data = await res.json()
        setResults({ query: q, ...data })
      }
    } finally {
      setLoading(false)
    }
  }

  function clear() {
    setQuery('')
    setResults(null)
    setShowPanel(false)
    inputRef.current?.focus()
  }

  const isStock = results && results.price !== undefined

  return (
    <div className="relative z-50">
      <header style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}
        className="px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity">
          <Globe className="text-blue-400" size={22} />
          <span className="font-bold text-white text-lg tracking-tight">GlobalInfoHub</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto relative">
          <div className="flex items-center gap-2" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem' }}>
            <Search size={16} className="ml-3 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder='Search news, stocks (NVDA), or ask anything...'
              className="flex-1 bg-transparent py-2 pr-2 text-sm text-white placeholder-slate-500 outline-none"
            />
            {query && (
              <button type="button" onClick={clear} className="mr-1 p-1 text-slate-400 hover:text-white">
                <X size={14} />
              </button>
            )}
            <button type="submit"
              className="mr-2 px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
              Search
            </button>
          </div>
        </form>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-slate-400">Live</span>
        </div>
      </header>

      {/* Results panel */}
      {showPanel && (
        <div className="absolute top-full left-0 right-0 z-50 mx-4 mt-2 rounded-xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2">
              {isStock ? <TrendingUp size={16} className="text-blue-400" /> : <Search size={16} className="text-blue-400" />}
              <span className="text-sm font-medium text-white">
                {isStock ? 'Stock Quote' : 'Search Results'}: <span className="text-blue-400">{results?.query}</span>
              </span>
            </div>
            <button onClick={clear} className="text-slate-400 hover:text-white"><X size={16} /></button>
          </div>

          <div className="p-4 max-h-[70vh] overflow-y-auto scrollbar-thin">
            {loading ? (
              <div className="text-center py-8 text-slate-400">Searching...</div>
            ) : isStock && results ? (
              <StockPanel data={results} />
            ) : results ? (
              <SearchPanel data={results} />
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

function StockPanel({ data }: { data: SearchResult }) {
  const up = (data.change ?? 0) >= 0
  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <div className="text-2xl font-bold text-white">{data.currency} {data.price?.toFixed(2)}</div>
          <div className={`text-sm font-medium ${up ? 'text-green-400' : 'text-red-400'}`}>
            {up ? '+' : ''}{data.change?.toFixed(2)} ({up ? '+' : ''}{data.changePercent?.toFixed(2)}%)
          </div>
          <div className="text-xs text-slate-500 mt-0.5">~15 min delayed · Yahoo Finance</div>
        </div>
        <div className="flex gap-6 flex-wrap">
          {[
            ['Exchange', data.exchange],
            ['Volume', data.volume],
            ['Mkt Cap', data.marketCap],
            ['52W High', `$${data.fiftyTwoWeekHigh}`],
            ['52W Low', `$${data.fiftyTwoWeekLow}`],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-xs text-slate-500">{k}</div>
              <div className="text-sm text-white font-medium">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <a href={`https://finance.yahoo.com/quote/${data.symbol}`} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mb-4">
        View full quote on Yahoo Finance <ExternalLink size={12} />
      </a>

      {data.news && data.news.length > 0 && (
        <div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Related News</div>
          <div className="space-y-2">
            {data.news.map((n, i) => (
              <a key={i} href={n.link} target="_blank" rel="noopener noreferrer"
                className="block p-3 rounded-lg hover:bg-slate-700/50 transition-colors"
                style={{ border: '1px solid var(--border)' }}>
                <div className="text-sm text-white hover:text-blue-400">{n.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{n.publisher} · {new Date(n.pubDate).toLocaleDateString()}</div>
              </a>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-slate-600 mt-4">
        Stock data sourced from Yahoo Finance. ~15 minute delay. Not financial advice.
      </p>
    </div>
  )
}

function SearchPanel({ data }: { data: SearchResult }) {
  return (
    <div>
      {data.answer && (
        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          <div className="text-sm text-white leading-relaxed">{data.answer}</div>
          {data.answerSource && (
            <a href={data.answerUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-2">
              Source: {data.answerSource} <ExternalLink size={10} />
            </a>
          )}
        </div>
      )}

      <div className="flex gap-2 flex-wrap mb-4">
        {[
          { label: 'DuckDuckGo', url: data.searchUrl },
          { label: 'Google', url: data.googleUrl },
          { label: 'Google News', url: data.newsUrl },
        ].map(({ label, url }) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 rounded-lg transition-colors">
            Search {label} <ExternalLink size={10} />
          </a>
        ))}
      </div>

      {data.relatedTopics?.length > 0 && (
        <div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Related</div>
          <div className="space-y-1">
            {data.relatedTopics.map((t, i) => (
              <a key={i} href={t.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2 p-2 rounded-lg hover:bg-slate-700/50 text-sm text-slate-300 hover:text-white transition-colors">
                <ExternalLink size={12} className="mt-0.5 shrink-0 text-slate-500" />
                {t.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
