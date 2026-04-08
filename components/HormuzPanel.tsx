'use client'
import { useState } from 'react'
import { Ship, ChevronDown, ExternalLink } from 'lucide-react'

// VesselFinder free embed — near real-time AIS ship tracking data (~5 min delay)
// Centered on Strait of Hormuz: 26.4°N, 56.3°E, zoom 8
const EMBED_URL =
  'https://www.vesselfinder.com/embed?lat=26.4&lon=56.3&zoom=8&names=true&track=&base=0&shadw=true'

const FULLSCREEN_URL =
  'https://www.vesselfinder.com/?minlat=24.5&minlon=54.5&maxlat=27.5&maxlon=59.5'

export default function HormuzPanel() {
  const [open, setOpen] = useState(true)

  return (
    <div className="card mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Ship size={16} className="text-cyan-400" />
          <span className="text-sm font-semibold text-white">Strait of Hormuz</span>
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
        </div>
        <button
          onClick={() => setOpen(p => !p)}
          className="text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle Hormuz panel"
        >
          <ChevronDown size={16} className={`transition-transform ${open ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {open && (
        <>
          <p className="text-xs text-slate-500 mb-2">
            Vessel traffic — AIS near real-time data
          </p>

          {/* Map embed */}
          <div
            className="relative w-full rounded-lg overflow-hidden bg-slate-900"
            style={{ aspectRatio: '16/9', maxHeight: '260px' }}
          >
            <iframe
              src={EMBED_URL}
              title="Strait of Hormuz vessel traffic"
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
              loading="lazy"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-slate-600">AIS data · ~5 min delay · VesselFinder</p>
            <a
              href={FULLSCREEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-cyan-400 transition-colors shrink-0 ml-2"
            >
              Full map <ExternalLink size={10} />
            </a>
          </div>
        </>
      )}
    </div>
  )
}
