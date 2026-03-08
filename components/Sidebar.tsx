'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Monitor, Globe, TrendingUp, Trophy, Building2,
  ChevronRight, ChevronDown, Menu, X
} from 'lucide-react'

const NAV = [
  {
    label: 'Technology', icon: Monitor, href: '/technology',
    sub: ['The Americas', 'European', 'Asian'],
  },
  {
    label: 'Global News', icon: Globe, href: '/global-news',
    sub: ['The Americas', 'European', 'Asian', 'African'],
  },
  {
    label: 'Global Markets', icon: TrendingUp, href: '/markets',
    sub: ['The Americas', 'European', 'Asian'],
  },
  {
    label: 'Global Sports', icon: Trophy, href: '/sports',
    sub: ['Soccer', 'Cricket', 'Hockey', 'Basketball', 'NFL', 'Tennis', 'Table Tennis', 'Track & Field'],
  },
  {
    label: 'Real Estate', icon: Building2, href: '/real-estate',
    sub: ['The Americas', 'European', 'Asian'],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState(false)

  const toggle = (label: string) => setExpanded(p => p === label ? null : label)

  if (collapsed) {
    return (
      <aside className="flex flex-col items-center py-4 gap-4 w-14 shrink-0"
        style={{ backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border)' }}>
        <button onClick={() => setCollapsed(false)} className="text-slate-400 hover:text-white p-1">
          <Menu size={20} />
        </button>
        {NAV.map(({ icon: Icon, href, label }) => (
          <Link key={href} href={href} title={label}
            className={`p-2 rounded-lg transition-colors ${pathname.startsWith(href) ? 'text-blue-400 bg-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
            <Icon size={18} />
          </Link>
        ))}
      </aside>
    )
  }

  return (
    <aside className="flex flex-col w-56 shrink-0 overflow-y-auto scrollbar-thin"
      style={{ backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border)' }}>
      <div className="flex items-center justify-between px-3 py-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Navigation</span>
        <button onClick={() => setCollapsed(true)} className="text-slate-400 hover:text-white p-1">
          <X size={14} />
        </button>
      </div>

      <nav className="flex-1 px-2 pb-4 space-y-0.5">
        {NAV.map(({ label, icon: Icon, href, sub }) => {
          const active = pathname.startsWith(href)
          const open = expanded === label

          return (
            <div key={href}>
              <div className="flex items-center gap-1">
                <Link href={href}
                  className={`sidebar-link flex-1 ${active ? 'active' : ''}`}>
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
                <button onClick={() => toggle(label)} className="p-1.5 text-slate-500 hover:text-slate-300">
                  {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              </div>

              {open && (
                <div className="ml-6 mt-0.5 space-y-0.5">
                  {sub.map(s => (
                    <Link key={s}
                      href={`${href}?region=${s.toLowerCase().replace(/\s+/g, '-').replace('&', '')}`}
                      className="block px-2 py-1.5 text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-700/30 rounded transition-colors">
                      {s}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="px-3 py-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-xs text-slate-600 leading-relaxed">
          Read-only portal. All content sourced from public feeds.
        </p>
      </div>
    </aside>
  )
}
