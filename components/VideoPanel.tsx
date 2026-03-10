'use client'
import { useState } from 'react'
import { VIDEO_FEEDS } from '@/lib/feeds'
import { Tv, ChevronDown, ExternalLink } from 'lucide-react'

export default function VideoPanel() {
  const [active, setActive] = useState(VIDEO_FEEDS[0])
  const [open, setOpen] = useState(true)

  return (
    <div className="card mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Tv size={16} className="text-blue-400" />
          <span className="text-sm font-semibold text-white">Live News</span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </div>
        <button onClick={() => setOpen(p => !p)} className="text-slate-400 hover:text-white transition-colors">
          <ChevronDown size={16} className={`transition-transform ${open ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {open && (
        <>
          {/* Channel selector */}
          <div className="flex gap-1.5 flex-wrap mb-3">
            {VIDEO_FEEDS.map(v => (
              <button key={v.id} onClick={() => setActive(v)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                  active.id === v.id
                    ? 'bg-red-600 text-white'
                    : 'text-slate-400 hover:text-white bg-slate-700/50'
                }`}>
                {v.source}
              </button>
            ))}
          </div>

          {/* Video embed */}
          <div className="relative w-full rounded-lg overflow-hidden bg-black" style={{ aspectRatio: '16/9', maxHeight: '260px' }}>
            <iframe
              key={active.id}
              src={active.embedUrl}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Footer: attribution + fallback link */}
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-slate-600">
              Live stream via YouTube · GlobalInfoHub does not own this content.
            </p>
            <a
              href={active.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-400 transition-colors shrink-0 ml-2"
            >
              Watch on {active.source} <ExternalLink size={10} />
            </a>
          </div>
        </>
      )}
    </div>
  )
}
