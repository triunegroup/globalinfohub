import { Suspense } from 'react'
import RegionTabs from '@/components/RegionTabs'
import FeedSection from '@/components/FeedSection'
import { RSS_FEEDS } from '@/lib/feeds'
import { Trophy, Zap } from 'lucide-react'

const SPORTS_TABS = [
  { key: 'global-events', label: 'Global Events'  },
  { key: 'soccer',        label: 'Soccer / Football' },
  { key: 'cricket',       label: 'Cricket'          },
  { key: 'basketball',    label: 'Basketball'       },
  { key: 'nfl',           label: 'NFL'              },
  { key: 'hockey',        label: 'Hockey'           },
  { key: 'tennis',        label: 'Tennis'           },
  { key: 'table-tennis',  label: 'Table Tennis'     },
  { key: 'track-field',   label: 'Track & Field'    },
]

const TITLES: Record<string, string> = {
  'global-events': 'Global Events',
  soccer:          'Soccer / Football',
  cricket:         'Cricket',
  basketball:      'Basketball',
  nfl:             'NFL',
  hockey:          'Hockey',
  tennis:          'Tennis',
  'table-tennis':  'Table Tennis',
  'track-field':   'Track & Field',
}

export default async function SportsPage({ searchParams }: { searchParams: Promise<{ region?: string }> }) {
  const params = await searchParams
  const sport = (params.region || 'global-events') as keyof typeof RSS_FEEDS.sports
  const sources = RSS_FEEDS.sports[sport] ?? RSS_FEEDS.sports['global-events']

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Trophy size={20} className="text-yellow-400" />
        <h1 className="text-xl font-bold text-white">Global Sports</h1>
      </div>

      <Suspense>
        <RegionTabs regions={SPORTS_TABS} />
      </Suspense>

      {sport === 'global-events' && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <Zap size={16} className="text-yellow-400 mt-0.5 shrink-0" />
          <p className="text-slate-400 leading-relaxed">
            <span className="text-white font-medium">Live event coverage</span> — this feed automatically surfaces
            whatever major tournament is underway: the <span className="text-yellow-400">Olympics</span>,{' '}
            <span className="text-yellow-400">FIFA World Cup</span>,{' '}
            <span className="text-yellow-400">ICC tournaments</span>, Grand Slams, and more.
            No configuration needed — sources follow the news.
          </p>
        </div>
      )}

      <FeedSection
        sources={sources}
        title={TITLES[sport] ?? sport}
      />
    </div>
  )
}
