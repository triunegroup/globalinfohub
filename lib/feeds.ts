export const RSS_FEEDS: Record<string, Record<string, { name: string; url: string; siteUrl: string }[]>> = {
  technology: {
    americas: [
      { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', siteUrl: 'https://techcrunch.com' },
      { name: 'Wired', url: 'https://www.wired.com/feed/rss', siteUrl: 'https://www.wired.com' },
      { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index', siteUrl: 'https://arstechnica.com' },
      { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', siteUrl: 'https://www.theverge.com' },
    ],
    european: [
      { name: 'BBC Technology', url: 'https://feeds.bbci.co.uk/news/technology/rss.xml', siteUrl: 'https://www.bbc.com/news/technology' },
      { name: 'The Register', url: 'https://www.theregister.com/headlines.atom', siteUrl: 'https://www.theregister.com' },
      { name: 'Euronews Tech', url: 'https://www.euronews.com/rss?format=mrss&level=theme&name=news', siteUrl: 'https://www.euronews.com' },
    ],
    asian: [
      { name: 'Nikkei Asia Tech', url: 'https://asia.nikkei.com/rss/feed/technology', siteUrl: 'https://asia.nikkei.com' },
      { name: 'Tech in Asia', url: 'https://www.techinasia.com/feed', siteUrl: 'https://www.techinasia.com' },
      { name: 'South China Morning Post Tech', url: 'https://www.scmp.com/rss/5/feed', siteUrl: 'https://www.scmp.com/technology' },
    ],
  },
  'global-news': {
    americas: [
      { name: 'AP News', url: 'https://rsshub.app/apnews/topics/apf-topnews', siteUrl: 'https://apnews.com' },
      { name: 'Reuters World', url: 'https://feeds.reuters.com/reuters/worldNews', siteUrl: 'https://www.reuters.com/world/' },
      { name: 'NPR News', url: 'https://feeds.npr.org/1001/rss.xml', siteUrl: 'https://www.npr.org' },
      { name: 'CBC News', url: 'https://www.cbc.ca/cmlink/rss-world', siteUrl: 'https://www.cbc.ca' },
    ],
    european: [
      { name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml', siteUrl: 'https://www.bbc.com/news/world' },
      { name: 'The Guardian', url: 'https://www.theguardian.com/world/rss', siteUrl: 'https://www.theguardian.com' },
      { name: 'Deutsche Welle', url: 'https://rss.dw.com/rdf/rss-en-all', siteUrl: 'https://www.dw.com' },
      { name: 'France 24', url: 'https://www.france24.com/en/rss', siteUrl: 'https://www.france24.com' },
    ],
    asian: [
      { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', siteUrl: 'https://www.aljazeera.com' },
      { name: 'SCMP Asia', url: 'https://www.scmp.com/rss/91/feed', siteUrl: 'https://www.scmp.com/asia' },
      { name: 'The Hindu', url: 'https://www.thehindu.com/news/national/?service=rss', siteUrl: 'https://www.thehindu.com' },
      { name: 'Japan Times', url: 'https://www.japantimes.co.jp/feed/', siteUrl: 'https://www.japantimes.co.jp' },
    ],
    african: [
      { name: 'AllAfrica', url: 'https://allafrica.com/tools/headlines/rdf/africa/headlines.rdf', siteUrl: 'https://allafrica.com' },
      { name: 'Daily Maverick', url: 'https://www.dailymaverick.co.za/dmrss/', siteUrl: 'https://www.dailymaverick.co.za' },
      { name: 'The East African', url: 'https://www.theeastafrican.co.ke/rss/2558108-2558108-format-rss-5di2c1z/index.xml', siteUrl: 'https://www.theeastafrican.co.ke' },
    ],
  },
  markets: {
    americas: [
      { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/rssindex', siteUrl: 'https://finance.yahoo.com' },
      { name: 'MarketWatch', url: 'https://feeds.marketwatch.com/marketwatch/topstories/', siteUrl: 'https://www.marketwatch.com' },
      { name: 'Seeking Alpha', url: 'https://seekingalpha.com/feed.xml', siteUrl: 'https://seekingalpha.com' },
      { name: 'Investopedia', url: 'https://www.investopedia.com/feedbuilder/feed/getfeed/?feedName=rss_headline', siteUrl: 'https://www.investopedia.com' },
    ],
    european: [
      { name: 'Financial Times', url: 'https://www.ft.com/?format=rss', siteUrl: 'https://www.ft.com' },
      { name: 'Reuters Finance', url: 'https://feeds.reuters.com/reuters/businessNews', siteUrl: 'https://www.reuters.com/finance/' },
      { name: 'Euronews Business', url: 'https://www.euronews.com/rss?format=mrss&level=theme&name=business', siteUrl: 'https://www.euronews.com/business' },
    ],
    asian: [
      { name: 'Nikkei Asia Markets', url: 'https://asia.nikkei.com/rss/feed/markets', siteUrl: 'https://asia.nikkei.com/markets' },
      { name: 'Business Standard', url: 'https://www.business-standard.com/rss/markets-106.rss', siteUrl: 'https://www.business-standard.com/markets' },
      { name: 'SCMP Markets', url: 'https://www.scmp.com/rss/92/feed', siteUrl: 'https://www.scmp.com/business/markets' },
    ],
  },
  sports: {
    soccer: [
      { name: 'BBC Football', url: 'https://feeds.bbci.co.uk/sport/football/rss.xml', siteUrl: 'https://www.bbc.com/sport/football' },
      { name: 'ESPN FC', url: 'https://www.espn.com/espn/rss/soccer/news', siteUrl: 'https://www.espn.com/soccer' },
      { name: 'The Guardian Football', url: 'https://www.theguardian.com/football/rss', siteUrl: 'https://www.theguardian.com/football' },
    ],
    cricket: [
      { name: 'ESPNcricinfo', url: 'https://static.espncricinfo.com/rss/livescores.xml', siteUrl: 'https://www.espncricinfo.com' },
      { name: 'BBC Cricket', url: 'https://feeds.bbci.co.uk/sport/cricket/rss.xml', siteUrl: 'https://www.bbc.com/sport/cricket' },
      { name: 'Cricket.com.au', url: 'https://www.cricket.com.au/rss', siteUrl: 'https://www.cricket.com.au' },
    ],
    basketball: [
      { name: 'NBA News', url: 'https://www.nba.com/rss/nba_rss.xml', siteUrl: 'https://www.nba.com' },
      { name: 'ESPN NBA', url: 'https://www.espn.com/espn/rss/nba/news', siteUrl: 'https://www.espn.com/nba' },
      { name: 'The Athletic NBA', url: 'https://theathletic.com/nba/feed/', siteUrl: 'https://theathletic.com/nba' },
    ],
    nfl: [
      { name: 'ESPN NFL', url: 'https://www.espn.com/espn/rss/nfl/news', siteUrl: 'https://www.espn.com/nfl' },
      { name: 'NFL.com', url: 'https://www.nfl.com/rss/rsslanding?recordType=NEWS', siteUrl: 'https://www.nfl.com' },
      { name: 'CBS Sports NFL', url: 'https://www.cbssports.com/rss/headlines/nfl/', siteUrl: 'https://www.cbssports.com/nfl' },
    ],
    hockey: [
      { name: 'ESPN NHL', url: 'https://www.espn.com/espn/rss/nhl/news', siteUrl: 'https://www.espn.com/nhl' },
      { name: 'NHL.com', url: 'https://www.nhl.com/rss/news.xml', siteUrl: 'https://www.nhl.com' },
      { name: 'The Hockey News', url: 'https://thehockeynews.com/feed/', siteUrl: 'https://thehockeynews.com' },
    ],
    tennis: [
      { name: 'BBC Tennis', url: 'https://feeds.bbci.co.uk/sport/tennis/rss.xml', siteUrl: 'https://www.bbc.com/sport/tennis' },
      { name: 'Tennis.com', url: 'https://www.tennis.com/rss/', siteUrl: 'https://www.tennis.com' },
      { name: 'The Guardian Tennis', url: 'https://www.theguardian.com/sport/tennis/rss', siteUrl: 'https://www.theguardian.com/sport/tennis' },
    ],
    'table-tennis': [
      { name: 'ITTF News', url: 'https://www.ittf.com/feed/', siteUrl: 'https://www.ittf.com' },
      { name: 'Table Tennis Daily', url: 'https://tabletennisdaily.com/feed/', siteUrl: 'https://tabletennisdaily.com' },
    ],
    'track-field': [
      { name: 'World Athletics', url: 'https://www.worldathletics.org/news/rss.xml', siteUrl: 'https://www.worldathletics.org' },
      { name: 'BBC Athletics', url: 'https://feeds.bbci.co.uk/sport/athletics/rss.xml', siteUrl: 'https://www.bbc.com/sport/athletics' },
      { name: 'LetsRun', url: 'https://www.letsrun.com/rss/', siteUrl: 'https://www.letsrun.com' },
    ],
  },
  'real-estate': {
    americas: [
      { name: 'Zillow Research', url: 'https://www.zillow.com/blog/research/feed/', siteUrl: 'https://www.zillow.com/research' },
      { name: 'Realtor.com News', url: 'https://www.realtor.com/news/feed/', siteUrl: 'https://www.realtor.com/news' },
      { name: 'HousingWire', url: 'https://www.housingwire.com/feed/', siteUrl: 'https://www.housingwire.com' },
      { name: 'Inman', url: 'https://www.inman.com/feed/', siteUrl: 'https://www.inman.com' },
    ],
    european: [
      { name: 'Property Week', url: 'https://www.propertyweek.com/rss', siteUrl: 'https://www.propertyweek.com' },
      { name: 'Estate Agent Today', url: 'https://www.estateagenttoday.co.uk/rss/', siteUrl: 'https://www.estateagenttoday.co.uk' },
      { name: 'EuroProperty', url: 'https://europeanpropertyinvestor.eu/feed/', siteUrl: 'https://europeanpropertyinvestor.eu' },
    ],
    asian: [
      { name: 'PropertyGuru', url: 'https://www.propertyguru.com.sg/property-management-news/feed', siteUrl: 'https://www.propertyguru.com.sg' },
      { name: 'SCMP Property', url: 'https://www.scmp.com/rss/94/feed', siteUrl: 'https://www.scmp.com/property' },
      { name: 'The Business Times Property', url: 'https://www.businesstimes.com.sg/property/rss.xml', siteUrl: 'https://www.businesstimes.com.sg/property' },
    ],
  },
}

export const VIDEO_FEEDS = [
  { id: 'bbc-news', title: 'BBC News Live', embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA', source: 'BBC News' },
  { id: 'bloomberg', title: 'Bloomberg Markets Live', embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCIALMKvObZNtJ6AmdCLP7Lg', source: 'Bloomberg' },
  { id: 'al-jazeera', title: 'Al Jazeera English', embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCNye-wNBqNL5ZzHSJdrlvxQ', source: 'Al Jazeera' },
  { id: 'france24', title: 'France 24 English', embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCQfwfsi5VrQ8yKZ-UGuJ7Pw', source: 'France 24' },
  { id: 'dw-news', title: 'DW News', embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCknLrEdhRCp1aegoMqRaCZg', source: 'Deutsche Welle' },
]

export const DISCLAIMER = 'GlobalInfoHub aggregates publicly available content from third-party sources. We do not own, produce, or endorse the content displayed. All trademarks belong to their respective owners. Links to third-party sites are provided for informational purposes only.'
