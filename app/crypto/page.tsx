'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import FeedSection from '@/components/FeedSection'
import { CRYPTO_FEEDS } from '@/lib/feeds'
import { Bitcoin, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react'

type Coin = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  price_change_percentage_24h: number
  sparkline_in_7d: { price: number[] }
}

function fmtPrice(n: number) {
  if (n >= 1000) return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  if (n >= 1)    return `$${n.toFixed(4)}`
  return `$${n.toFixed(6)}`
}

function fmtLarge(n: number) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(2)}M`
  return `$${n.toLocaleString()}`
}

function Sparkline({ prices, positive }: { prices: number[]; positive: boolean }) {
  if (!prices?.length) return <div className="w-20 h-8" />
  const w = 80
  const h = 32
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const range = max - min || 1
  // Downsample to ~40 points for performance
  const step = Math.ceil(prices.length / 40)
  const sampled = prices.filter((_, i) => i % step === 0)
  const pts = sampled
    .map((p, i) => `${(i / (sampled.length - 1)) * w},${h - ((p - min) / range) * h}`)
    .join(' ')
  return (
    <svg width={w} height={h}>
      <polyline
        points={pts}
        fill="none"
        stroke={positive ? '#10b981' : '#ef4444'}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

const SKELETON_ROWS = Array.from({ length: 15 })

export default function CryptoPage() {
  const [coins, setCoins]           = useState<Coin[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchCoins = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/crypto')
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setCoins(data)
      setLastUpdated(new Date())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchCoins() }, [fetchCoins])

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-white flex items-center gap-2">
          <Bitcoin size={18} className="text-yellow-400" /> Crypto Markets
        </h1>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs text-slate-500">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={fetchCoins}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:text-white transition-colors disabled:opacity-50"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Price table */}
      {error ? (
        <div className="card text-red-400 text-sm">{error}</div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b" style={{ borderColor: 'var(--border)' }}>
                  <th className="px-4 py-3 text-left font-medium w-10">#</th>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-right font-medium">Price</th>
                  <th className="px-4 py-3 text-right font-medium">24h %</th>
                  <th className="px-4 py-3 text-right font-medium hidden sm:table-cell">7d Chart</th>
                  <th className="px-4 py-3 text-right font-medium hidden md:table-cell">Market Cap</th>
                  <th className="px-4 py-3 text-right font-medium hidden lg:table-cell">24h Volume</th>
                </tr>
              </thead>
              <tbody>
                {loading && coins.length === 0
                  ? SKELETON_ROWS.map((_, i) => (
                      <tr key={i} className="border-b animate-pulse" style={{ borderColor: 'var(--border)' }}>
                        <td className="px-4 py-3.5"><div className="h-3 w-4 bg-slate-700 rounded" /></td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="h-6 w-6 bg-slate-700 rounded-full" />
                            <div className="space-y-1.5">
                              <div className="h-3 w-20 bg-slate-700 rounded" />
                              <div className="h-2.5 w-10 bg-slate-700 rounded" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5"><div className="h-3 w-20 bg-slate-700 rounded ml-auto" /></td>
                        <td className="px-4 py-3.5"><div className="h-3 w-12 bg-slate-700 rounded ml-auto" /></td>
                        <td className="px-4 py-3.5 hidden sm:table-cell"><div className="h-8 w-20 bg-slate-700 rounded ml-auto" /></td>
                        <td className="px-4 py-3.5 hidden md:table-cell"><div className="h-3 w-20 bg-slate-700 rounded ml-auto" /></td>
                        <td className="px-4 py-3.5 hidden lg:table-cell"><div className="h-3 w-20 bg-slate-700 rounded ml-auto" /></td>
                      </tr>
                    ))
                  : coins.map((coin, i) => {
                      const pos = coin.price_change_percentage_24h >= 0
                      return (
                        <tr
                          key={coin.id}
                          className="border-b hover:bg-slate-700/20 transition-colors"
                          style={{ borderColor: 'var(--border)' }}
                        >
                          <td className="px-4 py-3.5 text-slate-500 text-xs">{i + 1}</td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <Image
                                src={coin.image}
                                alt={coin.name}
                                width={24}
                                height={24}
                                className="rounded-full shrink-0"
                              />
                              <div>
                                <div className="font-medium text-white leading-tight">{coin.name}</div>
                                <div className="text-xs text-slate-500 uppercase">{coin.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-right font-medium text-white tabular-nums">
                            {fmtPrice(coin.current_price)}
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <span className={`inline-flex items-center justify-end gap-0.5 text-xs font-medium ${pos ? 'text-emerald-400' : 'text-red-400'}`}>
                              {pos ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right hidden sm:table-cell">
                            <div className="flex justify-end">
                              <Sparkline prices={coin.sparkline_in_7d?.price ?? []} positive={pos} />
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-right text-slate-300 tabular-nums hidden md:table-cell">
                            {fmtLarge(coin.market_cap)}
                          </td>
                          <td className="px-4 py-3.5 text-right text-slate-400 tabular-nums hidden lg:table-cell">
                            {fmtLarge(coin.total_volume)}
                          </td>
                        </tr>
                      )
                    })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* News */}
      <div>
        <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
          <TrendingUp size={15} className="text-yellow-400" /> Crypto News
        </h2>
        <FeedSection sources={CRYPTO_FEEDS} />
      </div>

    </div>
  )
}
