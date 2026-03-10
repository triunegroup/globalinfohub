import { Suspense } from 'react'
import RegionTabs from '@/components/RegionTabs'
import FeedSection from '@/components/FeedSection'
import { RSS_FEEDS } from '@/lib/feeds'
import { Building2, Home, MapPin, Landmark } from 'lucide-react'

const TABS = [
  { key: 'us-markets', label: 'US Markets'  },
  { key: 'canada',     label: 'Canada'       },
  { key: 'caribbean',  label: 'Caribbean'    },
  { key: 'mortgage',   label: 'Mortgage'     },
]

const META: Record<string, { title: string; icon: React.ElementType; color: string; note?: string }> = {
  'us-markets': {
    title: 'US Real Estate',
    icon: Home,
    color: 'text-blue-400',
  },
  canada: {
    title: 'Canadian Real Estate',
    icon: MapPin,
    color: 'text-red-400',
  },
  caribbean: {
    title: 'Caribbean Real Estate',
    icon: MapPin,
    color: 'text-emerald-400',
    note: 'Coverage focused on Jamaica and the broader Caribbean market.',
  },
  mortgage: {
    title: 'Mortgage Market',
    icon: Landmark,
    color: 'text-yellow-400',
    note: 'US mortgage rates, lending news, and housing finance.',
  },
}

export default async function RealEstatePage({ searchParams }: { searchParams: Promise<{ region?: string }> }) {
  const params = await searchParams
  const tab = (params.region || 'us-markets') as keyof typeof RSS_FEEDS['real-estate']
  const sources = RSS_FEEDS['real-estate'][tab] ?? RSS_FEEDS['real-estate']['us-markets']
  const meta = META[tab] ?? META['us-markets']
  const Icon = meta.icon

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Building2 size={20} className="text-orange-400" />
        <h1 className="text-xl font-bold text-white">Real Estate</h1>
      </div>

      <Suspense>
        <RegionTabs regions={TABS} />
      </Suspense>

      {meta.note && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <Icon size={16} className={`${meta.color} mt-0.5 shrink-0`} />
          <p className="text-slate-400 leading-relaxed">{meta.note}</p>
        </div>
      )}

      <FeedSection
        sources={sources}
        title={meta.title}
      />
    </div>
  )
}
