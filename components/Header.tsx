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

const CATEGORIES = [
  { id: 'all',          label: 'All',         keyword: '',                  href: null },
  { id: 'technology',   label: 'Technology',  keyword: 'technology news',   href: '/technology' },
  { id: 'global-news',  label: 'Global News', keyword: 'world news',        href: '/global-news' },
  { id: 'markets',      label: 'Markets',     keyword: 'financial markets', href: '/markets' },
  { id: 'sports',       label: 'Sports',      keyword: 'sports news',       href: '/sports' },
  { id: 'crypto',       label: 'Crypto',      keyword: 'cryptocurrency',    href: '/crypto' },
  { id: 'real-estate',  label: 'Real Estate', keyword: 'real estate news',  href: '/real-estate' },
  { id: 'weather',      label: 'Weather',     keyword: 'weather forecast',  href: '/weather' },
]

const CATEGORY_SOURCES: Record<string, { name: string; url: string }[]> = {
  technology: [
    { name: 'TechCrunch',  url: 'https://techcrunch.com' },
    { name: 'Wired',       url: 'https://www.wired.com' },
    { name: 'Ars Technica',url: 'https://arstechnica.com' },
    { name: 'The Verge',   url: 'https://www.theverge.com' },
  ],
  'global-news': [
    { name: 'BBC News',    url: 'https://www.bbc.com/news' },
    { name: 'Reuters',     url: 'https://www.reuters.com' },
    { name: 'Al Jazeera', url: 'https://www.aljazeera.com' },
    { name: 'The Guardian',url: 'https://www.theguardian.com' },
  ],
  markets: [
    { name: 'Bloomberg',   url: 'https://www.bloomberg.com' },
    { name: 'Yahoo Finance',url: 'https://finance.yahoo.com' },
    { name: 'CNBC',        url: 'https://www.cnbc.com' },
    { name: 'MarketWatch', url: 'https://www.marketwatch.com' },
  ],
  sports: [
    { name: 'ESPN',        url: 'https://www.espn.com' },
    { name: 'BBC Sport',   url: 'https://www.bbc.com/sport' },
    { name: 'Sky Sports',  url: 'https://www.skysports.com' },
    { name: 'The Athletic',url: 'https://theathletic.com' },
  ],
  crypto: [
    { name: 'CoinDesk',      url: 'https://www.coindesk.com' },
    { name: 'Cointelegraph', url: 'https://cointelegraph.com' },
    { name: 'Decrypt',       url: 'https://decrypt.co' },
    { name: 'The Block',     url: 'https://www.theblock.co' },
  ],
  'real-estate': [
    { name: 'Realtor.com', url: 'https://www.realtor.com' },
    { name: 'Zillow',      url: 'https://www.zillow.com' },
    { name: 'HousingWire', url: 'https://www.housingwire.com' },
    { name: 'Redfin',      url: 'https://www.redfin.com' },
  ],
  weather: [
    { name: 'Weather.com',      url: 'https://www.weather.com' },
    { name: 'AccuWeather',      url: 'https://www.accuweather.com' },
    { name: 'Weather Underground', url: 'https://www.wunderground.com' },
  ],
}

export default function Header() {
  const [query, setQuery]                 = useState('')
  const [results, setResults]             = useState<SearchResult | null>(null)
  const [loading, setLoading]             = useState(false)
  const [showPanel, setShowPanel]         = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
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
        const cat = CATEGORIES.find(c => c.id === selectedCategory)
        const scopedQ = cat?.keyword ? `${q} ${cat.keyword}` : q
        const res = await fetch(`/api/search?q=${encodeURIComponent(scopedQ)}`)
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
        className="pl-12 pr-4 md:px-4 py-3 flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity">
          <Globe className="text-blue-400" size={22} />
          <span className="font-bold text-white text-lg tracking-tight">GlobalInfoHub</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto relative">
          <div className="flex items-center gap-2" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem' }}>

            {/* Category selector */}
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="ml-3 text-xs text-slate-400 bg-transparent outline-none cursor-pointer border-r pr-2 shrink-0"
              style={{ borderColor: 'var(--border)' }}
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id} style={{ backgroundColor: '#1a2235' }}>
                  {c.label}
                </option>
              ))}
            </select>

            <Search size={14} className="text-slate-500 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search news, stocks (NVDA), or ask anything..."
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
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
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
              {!isStock && selectedCategory !== 'all' && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  {CATEGORIES.find(c => c.id === selectedCategory)?.label}
                </span>
              )}
            </div>
            <button onClick={clear} className="text-slate-400 hover:text-white"><X size={16} /></button>
          </div>

          <div className="p-4 max-h-[70vh] overflow-y-auto scrollbar-thin">
            {loading ? (
              <div className="text-center py-8 text-slate-400">Searching...</div>
            ) : isStock && results ? (
              <StockPanel data={results} />
            ) : results ? (
              <SearchPanel data={results} selectedCategory={selectedCategory} />
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

function SearchPanel({ data, selectedCategory }: { data: SearchResult; selectedCategory: string }) {
  const cat = CATEGORIES.find(c => c.id === selectedCategory)
  const scopedQ = cat?.keyword ? `${data.query} ${cat.keyword}` : data.query
  const enc = encodeURIComponent(scopedQ)
  const sources = selectedCategory !== 'all' ? (CATEGORY_SOURCES[selectedCategory] ?? []) : []

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

      {/* Browse on GlobalInfoHub shortcut */}
      {cat?.href && (
        <Link href={cat.href}
          className="flex items-center justify-between w-full mb-4 p-3 rounded-lg hover:bg-blue-600/10 transition-colors"
          style={{ border: '1px solid var(--border)' }}>
          <span className="text-sm text-blue-400 font-medium">Browse {cat.label} on GlobalInfoHub</span>
          <ExternalLink size={13} className="text-blue-400" />
        </Link>
      )}

      {/* External search links */}
      <div className="flex gap-2 flex-wrap mb-4">
        {[
          { label: 'DuckDuckGo', url: `https://duckduckgo.com/?q=${enc}` },
          { label: 'Google',     url: `https://www.google.com/search?q=${enc}` },
          { label: 'Google News',url: `https://news.google.com/search?q=${enc}` },
        ].map(({ label, url }) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 rounded-lg transition-colors">
            Search {label} <ExternalLink size={10} />
          </a>
        ))}
      </div>

      {/* Category source quick links */}
      {sources.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
            {cat?.label} Sources
          </div>
          <div className="flex gap-2 flex-wrap">
            {sources.map(s => (
              <a key={s.name}
                href={`https://www.google.com/search?q=${encodeURIComponent(data.query)}+site:${new URL(s.url).hostname}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:text-white transition-colors"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                {s.name} <ExternalLink size={10} className="text-slate-500" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Related topics */}
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
