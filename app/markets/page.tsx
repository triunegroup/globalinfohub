import { Suspense } from 'react'
import RegionTabs from '@/components/RegionTabs'
import FeedSection from '@/components/FeedSection'
import MarketHeatmap from '@/components/MarketHeatmap'
import { RSS_FEEDS } from '@/lib/feeds'
import { TrendingUp, Flag, Globe, MapPin } from 'lucide-react'

const REGIONS = [
  { key: 'americas', label: 'The Americas' },
  { key: 'european', label: 'European' },
  { key: 'asian', label: 'Asian' },
]

function SectionHeader({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 mt-6 mb-3">
      <Icon size={15} className={color} />
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{label}</h3>
      <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
    </div>
  )
}

export default async function MarketsPage({ searchParams }: { searchParams: Promise<{ region?: string }> }) {
  const params = await searchParams
  const region = params.region || 'americas'

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <TrendingUp size={20} className="text-green-400" />
        <h1 className="text-xl font-bold text-white">Global Markets</h1>
      </div>

      <Suspense>
        <RegionTabs regions={REGIONS} />
      </Suspense>

      {region === 'americas' && (
        <>
          {/* US Heat Map */}
          <MarketHeatmap />

          {/* US Markets */}
          <SectionHeader icon={Flag} label="United States" color="text-blue-400" />
          <FeedSection
            sources={RSS_FEEDS.markets.americas}
            title="US Markets"
          />

          {/* Canada & Mexico */}
          <SectionHeader icon={MapPin} label="Canada &amp; Mexico" color="text-red-400" />
          <FeedSection
            sources={RSS_FEEDS.markets['americas-ca-mx']}
            title="Canada &amp; Mexico"
          />

          {/* Brazil & Latin America */}
          <SectionHeader icon={Globe} label="Brazil &amp; Latin America" color="text-yellow-400" />
          <FeedSection
            sources={RSS_FEEDS.markets['americas-latam']}
            title="Brazil &amp; Latin America"
          />
        </>
      )}

      {region === 'european' && (
        <FeedSection
          sources={RSS_FEEDS.markets.european}
          title="European Markets"
        />
      )}

      {region === 'asian' && (
        <FeedSection
          sources={RSS_FEEDS.markets.asian}
          title="Asian Markets"
        />
      )}
    </div>
  )
}
