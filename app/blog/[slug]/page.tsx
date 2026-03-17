import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPost, CATEGORY_STYLES, CATEGORY_FEEDS } from '@/lib/blog'
import FeedSection from '@/components/FeedSection'
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const { meta } = getPost(slug)
    return { title: `${meta.title} — GlobalInfoHub Blog` }
  } catch {
    return { title: 'Post not found' }
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post
  try {
    post = getPost(slug)
  } catch {
    notFound()
  }

  const { meta, content } = post
  const catStyle  = CATEGORY_STYLES[meta.category]
  const sideFeeds = CATEGORY_FEEDS[meta.category] ?? []

  return (
    <div className="max-w-6xl">

      {/* Back link */}
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-5">
        <ArrowLeft size={14} /> Back to Blog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Main content ── */}
        <article className="lg:col-span-2">
          {/* Post header */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              {catStyle && (
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${catStyle.badge}`}>
                  {catStyle.label}
                </span>
              )}
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar size={11} />
                {new Date(meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock size={11} /> {meta.readTime} min read
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white leading-snug">{meta.title}</h1>
            <p className="text-slate-400 leading-relaxed">{meta.excerpt}</p>
            <div className="text-xs text-slate-500 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
              By {meta.author}
            </div>
          </div>

          {/* MDX content */}
          <div className="card prose-dark">
            <MDXRemote source={content} />
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside className="space-y-4">
          {/* Related news */}
          {sideFeeds.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <BookOpen size={14} className="text-blue-400" />
                Related {catStyle?.label ?? 'News'}
              </h2>
              <FeedSection sources={sideFeeds} />
            </div>
          )}

          {/* Browse category link */}
          {meta.category && (
            <Link
              href={`/${meta.category === 'global-affairs' ? 'global-news' : meta.category}`}
              className="card flex items-center justify-between hover:border-blue-500/40 transition-all group"
            >
              <span className="text-sm text-slate-300 group-hover:text-blue-400 transition-colors">
                Browse all {catStyle?.label ?? meta.category} coverage
              </span>
              <span className="text-blue-400">→</span>
            </Link>
          )}
        </aside>
      </div>
    </div>
  )
}
