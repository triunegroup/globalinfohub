'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Monitor, Globe, TrendingUp, Trophy, Building2, Cloud, Bitcoin,
  ChevronRight, ChevronDown, Menu, X,
} from 'lucide-react'

const NAV = [
  {
    label: 'Technology', icon: Monitor, href: '/technology',
    sub: ['The Americas', 'European', 'Asian'],
  },
  {
    label: 'Global News', icon: Globe, href: '/global-news',
    sub: ['The Americas', 'European', 'Asian', 'African', 'Caribbean'],
  },
  {
    label: 'Global Markets', icon: TrendingUp, href: '/markets',
    sub: ['The Americas', 'European', 'Asian'],
  },
  {
    label: 'Global Sports', icon: Trophy, href: '/sports',
    sub: ['Global Events', 'Soccer', 'Cricket', 'Basketball', 'NFL', 'Hockey', 'Tennis', 'Table Tennis', 'Track & Field'],
  },
  {
    label: 'Real Estate', icon: Building2, href: '/real-estate',
    sub: ['US Markets', 'Canada', 'Caribbean', 'Mortgage'],
  },
  {
    label: 'Crypto', icon: Bitcoin, href: '/crypto',
    sub: [],
  },
  {
    label: 'Weather', icon: Cloud, href: '/weather',
    sub: [],
  },
]

function NavItems({
  pathname,
  expanded,
  toggle,
  onNavigate,
}: {
  pathname: string
  expanded: string | null
  toggle: (label: string) => void
  onNavigate?: () => void
}) {
  return (
    <nav className="flex-1 px-2 pb-4 space-y-0.5">
      {NAV.map(({ label, icon: Icon, href, sub }) => {
        const active = pathname.startsWith(href)
        const open = expanded === label

        return (
          <div key={href}>
            <div className="flex items-center gap-1">
              <Link href={href} onClick={onNavigate}
                className={`sidebar-link flex-1 ${active ? 'active' : ''}`}>
                <Icon size={16} />
                <span>{label}</span>
              </Link>
              {sub.length > 0 && (
                <button onClick={() => toggle(label)} className="p-1.5 text-slate-500 hover:text-slate-300">
                  {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              )}
            </div>

            {open && sub.length > 0 && (
              <div className="ml-6 mt-0.5 space-y-0.5">
                {sub.map(s => (
                  <Link key={s}
                    href={`${href}?region=${s.toLowerCase().replace(/\s+/g, '-').replace('&', '')}`}
                    onClick={onNavigate}
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
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState(false)   // desktop only
  const [mobileOpen, setMobileOpen] = useState(false) // mobile only

  const toggle = (label: string) => setExpanded(p => p === label ? null : label)

  return (
    <>
      {/* ── MOBILE: hamburger trigger (always visible on small screens) ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>

      {/* ── MOBILE: backdrop ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── MOBILE: slide-in panel ── */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 flex flex-col overflow-y-auto scrollbar-thin transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between px-3 py-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Navigation</span>
          <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-white p-1">
            <X size={16} />
          </button>
        </div>

        <NavItems
          pathname={pathname}
          expanded={expanded}
          toggle={toggle}
          onNavigate={() => setMobileOpen(false)}
        />

        <div className="px-3 py-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs text-slate-600 leading-relaxed">
            Read-only portal. All content sourced from public feeds.
          </p>
        </div>
      </aside>

      {/* ── DESKTOP: icon-only collapsed state ── */}
      {collapsed && (
        <aside className="hidden md:flex flex-col items-center py-4 gap-4 w-14 shrink-0"
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
      )}

      {/* ── DESKTOP: full sidebar ── */}
      {!collapsed && (
        <aside className="hidden md:flex flex-col w-56 shrink-0 overflow-y-auto scrollbar-thin"
          style={{ backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between px-3 py-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Navigation</span>
            <button onClick={() => setCollapsed(true)} className="text-slate-400 hover:text-white p-1">
              <X size={14} />
            </button>
          </div>

          <NavItems pathname={pathname} expanded={expanded} toggle={toggle} />

          <div className="px-3 py-3 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs text-slate-600 leading-relaxed">
              Read-only portal. All content sourced from public feeds.
            </p>
          </div>
        </aside>
      )}
    </>
  )
}
