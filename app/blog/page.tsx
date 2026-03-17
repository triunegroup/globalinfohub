import Link from 'next/link'
import { getAllPosts, CATEGORY_STYLES } from '@/lib/blog'
import { BookOpen, Clock, Calendar } from 'lucide-react'

export const metadata = { title: 'Blog — GlobalInfoHub' }

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-white flex items-center gap-2 mb-1">
          <BookOpen size={20} className="text-blue-400" /> Blog
        </h1>
        <p className="text-sm text-slate-400">
          Original analysis and commentary on markets, crypto, global affairs, and more.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="card text-slate-500 text-sm">No posts yet — check back soon.</div>
      ) : (
        <div className="space-y-4">

          {/* Featured post */}
          <Link href={`/blog/${posts[0].slug}`} className="card block hover:border-blue-500/40 transition-all group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${CATEGORY_STYLES[posts[0].category]?.badge ?? 'bg-slate-700 text-slate-300'}`}>
                  {CATEGORY_STYLES[posts[0].category]?.label ?? posts[0].category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar size={11} /> {new Date(posts[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock size={11} /> {posts[0].readTime} min read
                </span>
              </div>
              <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors leading-snug">
                {posts[0].title}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">{posts[0].excerpt}</p>
              <span className="text-sm text-blue-400 font-medium">Read more →</span>
            </div>
          </Link>

          {/* Remaining posts grid */}
          {posts.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {posts.slice(1).map(post => {
                const catStyle = CATEGORY_STYLES[post.category]
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`}
                    className="card flex flex-col gap-2.5 hover:border-blue-500/40 transition-all group">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${catStyle?.badge ?? 'bg-slate-700 text-slate-300'}`}>
                        {catStyle?.label ?? post.category}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar size={11} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-auto">
                      <Clock size={10} /> {post.readTime} min read
                    </span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
