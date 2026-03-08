import { Suspense } from 'react'
import RegionTabs from '@/components/RegionTabs'
import FeedSection from '@/components/FeedSection'
import { RSS_FEEDS } from '@/lib/feeds'
import { Monitor } from 'lucide-react'

const REGIONS = [
  { key: 'americas', label: 'The Americas' },
  { key: 'european', label: 'European' },
  { key: 'asian', label: 'Asian' },
]

export default async function TechnologyPage({ searchParams }: { searchParams: Promise<{ region?: string }> }) {
  const params = await searchParams
  const region = (params.region || 'americas') as keyof typeof RSS_FEEDS.technology
  const sources = RSS_FEEDS.technology[region] || RSS_FEEDS.technology.americas

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Monitor size={20} className="text-purple-400" />
        <h1 className="text-xl font-bold text-white">Technology News</h1>
      </div>
      <Suspense>
        <RegionTabs regions={REGIONS} />
      </Suspense>
      <FeedSection sources={sources} title={`Tech — ${REGIONS.find(r => r.key === region)?.label}`} />
    </div>
  )
}
