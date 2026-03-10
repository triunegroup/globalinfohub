'use client'
import { useEffect, useRef } from 'react'
import { LayoutGrid } from 'lucide-react'

const HEATMAP_CONFIG = {
  exchanges: [],
  dataSource: 'SPX500',
  grouping: 'sector',
  blockSize: 'market_cap_basic',
  blockColor: 'change',
  locale: 'en',
  colorTheme: 'dark',
  hasTopBar: false,
  isDataSetEnabled: false,
  isZoomEnabled: true,
  hasSymbolTooltip: true,
  isMonoSize: false,
  width: '100%',
  height: 500,
}

export default function MarketHeatmap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Clear any previous render
    el.innerHTML = ''

    const widgetDiv = document.createElement('div')
    widgetDiv.className = 'tradingview-widget-container__widget'
    el.appendChild(widgetDiv)

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js'
    script.async = true
    script.textContent = JSON.stringify(HEATMAP_CONFIG)
    el.appendChild(script)

    return () => { el.innerHTML = '' }
  }, [])

  return (
    <div className="card mb-5">
      <div className="flex items-center gap-2 mb-3">
        <LayoutGrid size={16} className="text-green-400" />
        <span className="text-sm font-semibold text-white">S&amp;P 500 Heat Map</span>
        <span className="text-xs text-slate-500 ml-1">— size: market cap · color: % change</span>
      </div>
      <div
        className="tradingview-widget-container rounded-lg overflow-hidden"
        ref={containerRef}
        style={{ minHeight: 500 }}
      />
      <p className="text-xs text-slate-600 mt-2">
        Heat map data via{' '}
        <a href="https://www.tradingview.com" target="_blank" rel="noopener noreferrer"
          className="text-slate-500 hover:text-slate-400 underline">TradingView</a>.
        {' '}Green = up · Red = down · Box size = market cap weight. ~15 min delayed.
      </p>
    </div>
  )
}
