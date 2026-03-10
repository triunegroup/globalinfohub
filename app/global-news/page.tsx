import { Suspense } from 'react'
import RegionTabs from '@/components/RegionTabs'
import FeedSection from '@/components/FeedSection'
import { RSS_FEEDS } from '@/lib/feeds'
import { Globe } from 'lucide-react'

const REGIONS = [
  { key: 'americas',  label: 'The Americas' },
  { key: 'european',  label: 'European'     },
  { key: 'asian',     label: 'Asian'        },
  { key: 'african',   label: 'African'      },
  { key: 'caribbean', label: 'Caribbean'    },
]

const TITLES: Record<string, string> = {
  americas:  'The Americas',
  european:  'European',
  asian:     'Asian',
  african:   'African',
  caribbean: 'Caribbean',
}

export default async function GlobalNewsPage({ searchParams }: { searchParams: Promise<{ region?: string }> }) {
  const params = await searchParams
  const region = (params.region || 'americas') as keyof typeof RSS_FEEDS['global-news']
  const sources = RSS_FEEDS['global-news'][region] ?? RSS_FEEDS['global-news'].americas

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Globe size={20} className="text-blue-400" />
        <h1 className="text-xl font-bold text-white">Global News</h1>
      </div>

      <Suspense>
        <RegionTabs regions={REGIONS} />
      </Suspense>

      <FeedSection
        sources={sources}
        title={`${TITLES[region] ?? region} — Top Stories`}
      />
    </div>
  )
}
