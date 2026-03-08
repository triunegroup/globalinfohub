'use client'
import { ExternalLink, Clock, Rss } from 'lucide-react'
import { FeedItem } from '@/lib/types'

export default function FeedCard({ item }: { item: FeedItem }) {
  const date = new Date(item.pubDate)
  const timeAgo = getTimeAgo(date)

  // Strip HTML tags from description
  const desc = item.description
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
    .slice(0, 160)

  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer"
      className="card flex flex-col gap-2 hover:border-blue-500/40 transition-all duration-200 group cursor-pointer">

      {item.imageUrl && (
        <div className="w-full h-32 rounded-lg overflow-hidden bg-slate-700">
          <img src={item.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
        </div>
      )}

      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h3>
          {desc && (
            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{desc}</p>
          )}
        </div>
        <ExternalLink size={12} className="shrink-0 text-slate-600 group-hover:text-blue-400 mt-0.5 transition-colors" />
      </div>

      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-400 transition-colors">
          <Rss size={10} />
          {item.source}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-600">
          <Clock size={10} />
          {timeAgo}
        </span>
      </div>
    </a>
  )
}

function getTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}
