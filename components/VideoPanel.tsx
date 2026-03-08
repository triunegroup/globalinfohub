'use client'
import { useState } from 'react'
import { VIDEO_FEEDS } from '@/lib/feeds'
import { Tv, ChevronDown } from 'lucide-react'

export default function VideoPanel() {
  const [active, setActive] = useState(VIDEO_FEEDS[0])
  const [open, setOpen] = useState(true)

  return (
    <div className="card mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Tv size={16} className="text-blue-400" />
          <span className="text-sm font-semibold text-white">Live Video</span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </div>
        <button onClick={() => setOpen(p => !p)} className="text-slate-400 hover:text-white transition-colors">
          <ChevronDown size={16} className={`transition-transform ${open ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {open && (
        <>
          {/* Channel selector */}
          <div className="flex gap-2 flex-wrap mb-3">
            {VIDEO_FEEDS.map(v => (
              <button key={v.id} onClick={() => setActive(v)}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                  active.id === v.id
                    ? 'bg-red-600 text-white'
                    : 'text-slate-400 hover:text-white bg-slate-700/50'
                }`}>
                {v.source}
              </button>
            ))}
          </div>

          {/* Video embed */}
          <div className="relative w-full rounded-lg overflow-hidden bg-black" style={{ aspectRatio: '16/9', maxHeight: '280px' }}>
            <iframe
              key={active.id}
              src={active.embedUrl}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <p className="text-xs text-slate-600 mt-2">
            Live stream from {active.source}. GlobalInfoHub does not own this content.{' '}
            <a href="#" className="text-slate-500 hover:text-slate-400 underline">Content Policy</a>
          </p>
        </>
      )}
    </div>
  )
}
