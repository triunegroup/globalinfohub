'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface Props {
  regions: { key: string; label: string }[]
}

export default function RegionTabs({ regions }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get('region') || regions[0]?.key

  function select(key: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('region', key)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex gap-1 flex-wrap">
      {regions.map(({ key, label }) => (
        <button key={key} onClick={() => select(key)}
          className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 ${
            current === key
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
          style={current !== key ? { border: '1px solid var(--border)' } : {}}>
          {label}
        </button>
      ))}
    </div>
  )
}
