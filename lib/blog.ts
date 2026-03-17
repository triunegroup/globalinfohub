import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export type PostMeta = {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  author: string
  readTime: number
}

export type Post = {
  meta: PostMeta
  content: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data } = matter(raw)
      return { slug, ...data } as PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)
  return { meta: { slug, ...data } as PostMeta, content }
}

export const CATEGORY_STYLES: Record<string, { badge: string; label: string }> = {
  crypto:          { badge: 'bg-yellow-900/50 text-yellow-300',  label: 'Crypto'         },
  markets:         { badge: 'bg-green-900/50 text-green-300',    label: 'Markets'        },
  technology:      { badge: 'bg-purple-900/50 text-purple-300',  label: 'Technology'     },
  'global-affairs':{ badge: 'bg-blue-900/50 text-blue-300',      label: 'Global Affairs' },
  'real-estate':   { badge: 'bg-orange-900/50 text-orange-300',  label: 'Real Estate'    },
  sports:          { badge: 'bg-red-900/50 text-red-300',        label: 'Sports'         },
  caribbean:       { badge: 'bg-teal-900/50 text-teal-300',      label: 'Caribbean'      },
}

// RSS feeds shown in the blog post sidebar, keyed by category
export const CATEGORY_FEEDS: Record<string, { name: string; url: string; siteUrl: string }[]> = {
  crypto: [
    { name: 'CoinDesk',      url: 'https://www.coindesk.com/arc/outboundfeeds/rss/',  siteUrl: 'https://www.coindesk.com'    },
    { name: 'Cointelegraph', url: 'https://cointelegraph.com/rss',                    siteUrl: 'https://cointelegraph.com'   },
    { name: 'Decrypt',       url: 'https://decrypt.co/feed',                          siteUrl: 'https://decrypt.co'          },
  ],
  markets: [
    { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/rssindex',                         siteUrl: 'https://finance.yahoo.com'  },
    { name: 'MarketWatch',   url: 'https://feeds.marketwatch.com/marketwatch/topstories/',           siteUrl: 'https://www.marketwatch.com' },
    { name: 'CNBC Markets',  url: 'https://www.cnbc.com/id/10000664/device/rss/rss.html',            siteUrl: 'https://www.cnbc.com'        },
  ],
  technology: [
    { name: 'TechCrunch',   url: 'https://techcrunch.com/feed/',                       siteUrl: 'https://techcrunch.com'   },
    { name: 'Wired',        url: 'https://www.wired.com/feed/rss',                     siteUrl: 'https://www.wired.com'    },
    { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index',    siteUrl: 'https://arstechnica.com'  },
  ],
  'global-affairs': [
    { name: 'BBC World',    url: 'https://feeds.bbci.co.uk/news/world/rss.xml',        siteUrl: 'https://www.bbc.com/news' },
    { name: 'Al Jazeera',  url: 'https://www.aljazeera.com/xml/rss/all.xml',          siteUrl: 'https://www.aljazeera.com'},
    { name: 'The Guardian', url: 'https://www.theguardian.com/world/rss',              siteUrl: 'https://www.theguardian.com'},
  ],
  'real-estate': [
    { name: 'HousingWire',  url: 'https://www.housingwire.com/articles/category/housing/feed/', siteUrl: 'https://www.housingwire.com' },
    { name: 'Redfin News',  url: 'https://www.redfin.com/blog/feed/',                           siteUrl: 'https://www.redfin.com'       },
    { name: 'Inman',        url: 'https://www.inman.com/feed/',                                  siteUrl: 'https://www.inman.com'        },
  ],
  sports: [
    { name: 'ESPN',         url: 'https://www.espn.com/espn/rss/news',                 siteUrl: 'https://www.espn.com'     },
    { name: 'BBC Sport',    url: 'https://feeds.bbci.co.uk/sport/rss.xml',             siteUrl: 'https://www.bbc.com/sport'},
  ],
  caribbean: [
    { name: 'Jamaica Observer', url: 'https://www.jamaicaobserver.com/feed/',          siteUrl: 'https://www.jamaicaobserver.com' },
    { name: 'Caribbean Journal',url: 'https://www.caribjournal.com/feed/',             siteUrl: 'https://www.caribjournal.com'    },
  ],
}
