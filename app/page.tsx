import VideoPanel from '@/components/VideoPanel'
import FeedSection from '@/components/FeedSection'
import { RSS_FEEDS } from '@/lib/feeds'
import { TrendingUp, Globe, Monitor, Trophy, Building2, ExternalLink } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Bloomberg', url: 'https://www.bloomberg.com', desc: 'Markets & Finance' },
  { label: 'BBC News', url: 'https://www.bbc.com/news', desc: 'World News' },
  { label: 'Reuters', url: 'https://www.reuters.com', desc: 'Breaking News' },
  { label: 'Yahoo Finance', url: 'https://finance.yahoo.com', desc: 'Stocks & Markets' },
  { label: 'Al Jazeera', url: 'https://www.aljazeera.com', desc: 'Global News' },
  { label: 'ESPN', url: 'https://www.espn.com', desc: 'Sports' },
  { label: 'TechCrunch', url: 'https://techcrunch.com', desc: 'Tech News' },
  { label: 'The Guardian', url: 'https://www.theguardian.com', desc: 'World News' },
]

const STAT_CARDS = [
  { label: 'Tech News', icon: Monitor, href: '/technology', color: 'text-purple-400' },
  { label: 'Global News', icon: Globe, href: '/global-news', color: 'text-blue-400' },
  { label: 'Markets', icon: TrendingUp, href: '/markets', color: 'text-green-400' },
  { label: 'Sports', icon: Trophy, href: '/sports', color: 'text-yellow-400' },
  { label: 'Real Estate', icon: Building2, href: '/real-estate', color: 'text-orange-400' },
]

export default function Home() {
  const topFeeds = [
    ...RSS_FEEDS['global-news'].americas.slice(0, 1),
    ...RSS_FEEDS['global-news'].european.slice(0, 1),
    ...RSS_FEEDS['global-news'].asian.slice(0, 1),
    ...RSS_FEEDS.markets.americas.slice(0, 1),
  ]

  return (
    <div className="space-y-5">
      {/* Category nav cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {STAT_CARDS.map(({ label, icon: Icon, href, color }) => (
          <a key={href} href={href}
            className="card flex flex-col items-center gap-2 py-4 hover:border-blue-500/40 transition-all group text-center">
            <Icon size={24} className={color} />
            <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{label}</span>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left: Video + quick links */}
        <div className="xl:col-span-1">
          <VideoPanel />

          {/* Quick Links */}
          <div className="card">
            <h3 className="text-sm font-semibold text-white mb-3">Quick Links</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {QUICK_LINKS.map(({ label, url, desc }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  style={{ border: '1px solid var(--border)' }}>
                  <div>
                    <div className="text-xs font-medium text-white group-hover:text-blue-400">{label}</div>
                    <div className="text-xs text-slate-600">{desc}</div>
                  </div>
                  <ExternalLink size={10} className="text-slate-600 group-hover:text-blue-400 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Top headlines */}
        <div className="xl:col-span-2">
          <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
            <Globe size={16} className="text-blue-400" /> Top Headlines
          </h2>
          <FeedSection sources={topFeeds} />
        </div>
      </div>
    </div>
  )
}
