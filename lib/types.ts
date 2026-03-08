export interface FeedItem {
  title: string
  link: string
  description: string
  pubDate: string
  source: string
  sourceUrl: string
  imageUrl?: string
}

export interface StockData {
  symbol: string
  price: number
  change: number
  changePercent: number
  marketCap?: string
  volume?: string
  name?: string
}

export interface VideoFeed {
  id: string
  title: string
  embedUrl: string
  source: string
}

export type Region = 'americas' | 'european' | 'asian' | 'african'
export type Category = 'technology' | 'global-news' | 'markets' | 'sports' | 'real-estate'
