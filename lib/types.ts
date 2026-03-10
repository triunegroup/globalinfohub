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
  embedUrl: string   // static fallback ID — used if dynamic resolution fails
  channelHandle: string  // YouTube @handle — used to resolve the current live stream ID
  source: string
  liveUrl: string    // channel's own website — shown as fallback link
}

export type Region = 'americas' | 'european' | 'asian' | 'african'
export type Category = 'technology' | 'global-news' | 'markets' | 'sports' | 'real-estate'
