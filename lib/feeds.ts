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
      { name: 'PBS NewsHour', url: 'https://www.pbs.org/newshour/feeds/rss/headlines', siteUrl: 'https://www.pbs.org/newshour' },
      { name: 'CBC News', url: 'https://www.cbc.ca/cmlink/rss-world', siteUrl: 'https://www.cbc.ca' },
      { name: 'Voice of America', url: 'https://feeds.voanews.com/voaenglish', siteUrl: 'https://www.voanews.com' },
      { name: 'Telesur English', url: 'https://www.telesurenglish.net/rss/', siteUrl: 'https://www.telesurenglish.net' },
    ],
    european: [
      { name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml', siteUrl: 'https://www.bbc.com/news/world' },
      { name: 'The Guardian', url: 'https://www.theguardian.com/world/rss', siteUrl: 'https://www.theguardian.com' },
      { name: 'Deutsche Welle', url: 'https://rss.dw.com/rdf/rss-en-all', siteUrl: 'https://www.dw.com' },
      { name: 'France 24', url: 'https://www.france24.com/en/rss', siteUrl: 'https://www.france24.com' },
      { name: 'Euronews', url: 'https://www.euronews.com/rss?format=mrss&level=theme&name=news', siteUrl: 'https://www.euronews.com' },
      { name: 'Radio Free Europe', url: 'https://www.rferl.org/api/epiqq', siteUrl: 'https://www.rferl.org' },
      { name: 'SwissInfo', url: 'https://www.swissinfo.ch/rssfeed/46696706', siteUrl: 'https://www.swissinfo.ch/eng' },
    ],
    asian: [
      { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', siteUrl: 'https://www.aljazeera.com' },
      { name: 'Channel News Asia', url: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml', siteUrl: 'https://www.channelnewsasia.com' },
      { name: 'South China Morning Post', url: 'https://www.scmp.com/rss/91/feed', siteUrl: 'https://www.scmp.com/asia' },
      { name: 'The Hindu', url: 'https://www.thehindu.com/news/national/?service=rss', siteUrl: 'https://www.thehindu.com' },
      { name: 'Japan Times', url: 'https://www.japantimes.co.jp/feed/', siteUrl: 'https://www.japantimes.co.jp' },
      { name: 'Bangkok Post', url: 'https://www.bangkokpost.com/rss/data/topstories.xml', siteUrl: 'https://www.bangkokpost.com' },
      { name: 'Dawn (Pakistan)', url: 'https://www.dawn.com/feeds/home', siteUrl: 'https://www.dawn.com' },
    ],
    african: [
      { name: 'AllAfrica', url: 'https://allafrica.com/tools/headlines/rdf/africa/headlines.rdf', siteUrl: 'https://allafrica.com' },
      { name: 'Daily Maverick', url: 'https://www.dailymaverick.co.za/dmrss/', siteUrl: 'https://www.dailymaverick.co.za' },
      { name: 'The East African', url: 'https://www.theeastafrican.co.ke/rss/2558108-2558108-format-rss-5di2c1z/index.xml', siteUrl: 'https://www.theeastafrican.co.ke' },
      { name: 'The Africa Report', url: 'https://www.theafricareport.com/feed/', siteUrl: 'https://www.theafricareport.com' },
      { name: 'Premium Times Nigeria', url: 'https://www.premiumtimesng.com/feed', siteUrl: 'https://www.premiumtimesng.com' },
      { name: 'African Arguments', url: 'https://africanarguments.org/feed/', siteUrl: 'https://africanarguments.org' },
    ],
    // Caribbean — Jamaica-first, then broader island coverage
    // All feeds live-verified as working RSS 2.0 sources
    caribbean: [
      // Jamaica
      { name: 'Jamaica Observer', url: 'https://www.jamaicaobserver.com/feed/', siteUrl: 'https://www.jamaicaobserver.com' },
      { name: 'Jamaica Gleaner', url: 'https://jamaica-gleaner.com/rss.xml', siteUrl: 'https://jamaica-gleaner.com' },
      // Caribbean regional
      { name: 'Caribbean Journal', url: 'https://www.caribjournal.com/feed/', siteUrl: 'https://www.caribjournal.com' },
      { name: 'Barbados Today', url: 'https://barbadostoday.bb/feed/', siteUrl: 'https://barbadostoday.bb' },
      { name: 'Nation News (Barbados)', url: 'https://www.nationnews.com/feed/', siteUrl: 'https://www.nationnews.com' },
      { name: 'Antigua Observer', url: 'https://antiguaobserver.com/feed/', siteUrl: 'https://antiguaobserver.com' },
      { name: 'Stabroek News (Guyana)', url: 'https://www.stabroeknews.com/feed/', siteUrl: 'https://www.stabroeknews.com' },
      { name: 'Kaieteur News (Guyana)', url: 'https://www.kaieteurnewsonline.com/feed/', siteUrl: 'https://www.kaieteurnewsonline.com' },
      { name: 'iWitness News (SVG)', url: 'https://iwnsvg.com/feed/', siteUrl: 'https://iwnsvg.com' },
    ],
  },
  markets: {
    // US — shown on Americas tab + homepage preview
    americas: [
      { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/rssindex', siteUrl: 'https://finance.yahoo.com' },
      { name: 'MarketWatch', url: 'https://feeds.marketwatch.com/marketwatch/topstories/', siteUrl: 'https://www.marketwatch.com' },
      { name: 'CNBC Markets', url: 'https://www.cnbc.com/id/10000664/device/rss/rss.html', siteUrl: 'https://www.cnbc.com/markets/' },
      { name: 'Seeking Alpha', url: 'https://seekingalpha.com/feed.xml', siteUrl: 'https://seekingalpha.com' },
      { name: 'Investopedia', url: 'https://www.investopedia.com/feedbuilder/feed/getfeed/?feedName=rss_headline', siteUrl: 'https://www.investopedia.com' },
    ],
    // Canada & Mexico
    'americas-ca-mx': [
      { name: 'BNN Bloomberg', url: 'https://www.bnnbloomberg.ca/rss', siteUrl: 'https://www.bnnbloomberg.ca' },
      { name: 'Financial Post', url: 'https://financialpost.com/feed/', siteUrl: 'https://financialpost.com' },
      { name: 'Globe and Mail Business', url: 'https://www.theglobeandmail.com/arc/outboundfeeds/rss/category/business/', siteUrl: 'https://www.theglobeandmail.com/business' },
      { name: 'Mexico News Daily', url: 'https://mexiconewsdaily.com/category/economy-business/feed/', siteUrl: 'https://mexiconewsdaily.com' },
    ],
    // Brazil & Latin America
    'americas-latam': [
      { name: 'Merco Press', url: 'https://en.mercopress.com/rss', siteUrl: 'https://en.mercopress.com' },
      { name: 'Buenos Aires Times', url: 'https://www.batimes.com.ar/feed', siteUrl: 'https://www.batimes.com.ar' },
      { name: 'The Rio Times', url: 'https://riotimesonline.com/feed/', siteUrl: 'https://riotimesonline.com' },
      { name: 'BNamericas', url: 'https://www.bnamericas.com/en/rss/news', siteUrl: 'https://www.bnamericas.com' },
    ],
    european: [
      { name: 'Financial Times', url: 'https://www.ft.com/?format=rss', siteUrl: 'https://www.ft.com' },
      { name: 'Reuters Finance', url: 'https://feeds.reuters.com/reuters/businessNews', siteUrl: 'https://www.reuters.com/finance/' },
      { name: 'Euronews Business', url: 'https://www.euronews.com/rss?format=mrss&level=theme&name=business', siteUrl: 'https://www.euronews.com/business' },
      { name: 'The Economist', url: 'https://www.economist.com/finance-and-economics/rss.xml', siteUrl: 'https://www.economist.com/finance-and-economics' },
    ],
    asian: [
      { name: 'Nikkei Asia Markets', url: 'https://asia.nikkei.com/rss/feed/markets', siteUrl: 'https://asia.nikkei.com/markets' },
      { name: 'Business Standard', url: 'https://www.business-standard.com/rss/markets-106.rss', siteUrl: 'https://www.business-standard.com/markets' },
      { name: 'SCMP Markets', url: 'https://www.scmp.com/rss/92/feed', siteUrl: 'https://www.scmp.com/business/markets' },
      { name: 'The Straits Times Business', url: 'https://www.straitstimes.com/business/rss.xml', siteUrl: 'https://www.straitstimes.com/business' },
    ],
  },
  sports: {
    // Broad top-level feeds — auto-covers Olympics, FIFA World Cup, ICC tournaments, Grand Slams etc.
    'global-events': [
      { name: 'BBC Sport', url: 'https://feeds.bbci.co.uk/sport/rss.xml', siteUrl: 'https://www.bbc.com/sport' },
      { name: 'ESPN', url: 'https://www.espn.com/espn/rss/news', siteUrl: 'https://www.espn.com' },
      { name: 'Sky Sports', url: 'https://www.skysports.com/rss/12040', siteUrl: 'https://www.skysports.com' },
      { name: 'The Guardian Sport', url: 'https://www.theguardian.com/sport/rss', siteUrl: 'https://www.theguardian.com/sport' },
      { name: 'Reuters Sports', url: 'https://feeds.reuters.com/reuters/sportsNews', siteUrl: 'https://www.reuters.com/sports' },
      { name: 'Sports Illustrated', url: 'https://www.si.com/rss/si_topstories.rss', siteUrl: 'https://www.si.com' },
      { name: 'Sporting News', url: 'https://www.sportingnews.com/rss', siteUrl: 'https://www.sportingnews.com' },
    ],
    soccer: [
      { name: 'BBC Football', url: 'https://feeds.bbci.co.uk/sport/football/rss.xml', siteUrl: 'https://www.bbc.com/sport/football' },
      { name: 'ESPN FC', url: 'https://www.espn.com/espn/rss/soccer/news', siteUrl: 'https://www.espn.com/soccer' },
      { name: 'The Guardian Football', url: 'https://www.theguardian.com/football/rss', siteUrl: 'https://www.theguardian.com/football' },
      { name: '90min', url: 'https://www.90min.com/feed', siteUrl: 'https://www.90min.com' },
      { name: 'Sky Sports Football', url: 'https://www.skysports.com/rss/0,20514,11661,00.xml', siteUrl: 'https://www.skysports.com/football' },
      { name: 'FourFourTwo', url: 'https://www.fourfourtwo.com/rss', siteUrl: 'https://www.fourfourtwo.com' },
    ],
    cricket: [
      { name: 'ESPNcricinfo', url: 'https://www.espncricinfo.com/rss/content/story/feeds/0.xml', siteUrl: 'https://www.espncricinfo.com' },
      { name: 'BBC Cricket', url: 'https://feeds.bbci.co.uk/sport/cricket/rss.xml', siteUrl: 'https://www.bbc.com/sport/cricket' },
      { name: 'The Guardian Cricket', url: 'https://www.theguardian.com/sport/cricket/rss', siteUrl: 'https://www.theguardian.com/sport/cricket' },
      { name: 'Cricket.com.au', url: 'https://www.cricket.com.au/rss', siteUrl: 'https://www.cricket.com.au' },
      { name: 'ICC Cricket', url: 'https://www.icc-cricket.com/media-releases/feed', siteUrl: 'https://www.icc-cricket.com' },
      { name: 'CricketCountry', url: 'https://www.cricketcountry.com/feed/', siteUrl: 'https://www.cricketcountry.com' },
    ],
    basketball: [
      { name: 'NBA News', url: 'https://www.nba.com/rss/nba_rss.xml', siteUrl: 'https://www.nba.com' },
      { name: 'ESPN NBA', url: 'https://www.espn.com/espn/rss/nba/news', siteUrl: 'https://www.espn.com/nba' },
      { name: 'CBS Sports NBA', url: 'https://www.cbssports.com/rss/headlines/nba/', siteUrl: 'https://www.cbssports.com/nba' },
      { name: 'Bleacher Report NBA', url: 'https://bleacherreport.com/nba.rss', siteUrl: 'https://bleacherreport.com/nba' },
      { name: 'Sky Sports Basketball', url: 'https://www.skysports.com/rss/0,20514,12040,00.xml', siteUrl: 'https://www.skysports.com/basketball' },
    ],
    nfl: [
      { name: 'ESPN NFL', url: 'https://www.espn.com/espn/rss/nfl/news', siteUrl: 'https://www.espn.com/nfl' },
      { name: 'NFL.com', url: 'https://www.nfl.com/rss/rsslanding?recordType=NEWS', siteUrl: 'https://www.nfl.com' },
      { name: 'CBS Sports NFL', url: 'https://www.cbssports.com/rss/headlines/nfl/', siteUrl: 'https://www.cbssports.com/nfl' },
      { name: 'Pro Football Talk', url: 'https://profootballtalk.nbcsports.com/feed/', siteUrl: 'https://profootballtalk.nbcsports.com' },
      { name: 'Bleacher Report NFL', url: 'https://bleacherreport.com/nfl.rss', siteUrl: 'https://bleacherreport.com/nfl' },
    ],
    hockey: [
      { name: 'ESPN NHL', url: 'https://www.espn.com/espn/rss/nhl/news', siteUrl: 'https://www.espn.com/nhl' },
      { name: 'NHL.com', url: 'https://www.nhl.com/rss/news.xml', siteUrl: 'https://www.nhl.com' },
      { name: 'The Hockey News', url: 'https://thehockeynews.com/feed/', siteUrl: 'https://thehockeynews.com' },
      { name: 'CBS Sports NHL', url: 'https://www.cbssports.com/rss/headlines/nhl/', siteUrl: 'https://www.cbssports.com/nhl' },
    ],
    tennis: [
      { name: 'BBC Tennis', url: 'https://feeds.bbci.co.uk/sport/tennis/rss.xml', siteUrl: 'https://www.bbc.com/sport/tennis' },
      { name: 'Tennis.com', url: 'https://www.tennis.com/rss/', siteUrl: 'https://www.tennis.com' },
      { name: 'The Guardian Tennis', url: 'https://www.theguardian.com/sport/tennis/rss', siteUrl: 'https://www.theguardian.com/sport/tennis' },
      { name: 'Tennis World USA', url: 'https://www.tennisworldusa.org/feed/', siteUrl: 'https://www.tennisworldusa.org' },
      { name: 'Sky Sports Tennis', url: 'https://www.skysports.com/rss/0,20514,12110,00.xml', siteUrl: 'https://www.skysports.com/tennis' },
    ],
    'table-tennis': [
      { name: 'ITTF News', url: 'https://www.ittf.com/feed/', siteUrl: 'https://www.ittf.com' },
      { name: 'Table Tennis Daily', url: 'https://tabletennisdaily.com/feed/', siteUrl: 'https://tabletennisdaily.com' },
      { name: 'PongWorld', url: 'https://www.pongworld.com/news/feed', siteUrl: 'https://www.pongworld.com' },
    ],
    'track-field': [
      { name: 'World Athletics', url: 'https://www.worldathletics.org/news/rss.xml', siteUrl: 'https://www.worldathletics.org' },
      { name: 'BBC Athletics', url: 'https://feeds.bbci.co.uk/sport/athletics/rss.xml', siteUrl: 'https://www.bbc.com/sport/athletics' },
      { name: 'LetsRun', url: 'https://www.letsrun.com/rss/', siteUrl: 'https://www.letsrun.com' },
      { name: 'FloTrack', url: 'https://www.flotrack.org/rss/articles', siteUrl: 'https://www.flotrack.org' },
    ],
  },
  'real-estate': {
    // Keys match the sidebar-generated ?region= param (label.toLowerCase().replace spaces with -)
    'us-markets': [
      { name: 'HousingWire', url: 'https://www.housingwire.com/feed/', siteUrl: 'https://www.housingwire.com' },
      { name: 'Inman', url: 'https://www.inman.com/feed/', siteUrl: 'https://www.inman.com' },
      { name: 'Zillow Research', url: 'https://www.zillow.com/blog/research/feed/', siteUrl: 'https://www.zillow.com/research' },
      { name: 'Realtor.com News', url: 'https://www.realtor.com/news/feed/', siteUrl: 'https://www.realtor.com/news' },
      { name: 'BiggerPockets', url: 'https://www.biggerpockets.com/blog/feed', siteUrl: 'https://www.biggerpockets.com' },
      { name: 'Curbed', url: 'https://www.curbed.com/rss/index.xml', siteUrl: 'https://www.curbed.com' },
    ],
    canada: [
      { name: 'Better Dwelling', url: 'https://betterdwelling.com/feed/', siteUrl: 'https://betterdwelling.com' },
      { name: 'Storeys', url: 'https://storeys.com/feed/', siteUrl: 'https://storeys.com' },
      { name: 'Canadian Real Estate Magazine', url: 'https://www.canadianrealestatemagazine.ca/rss/', siteUrl: 'https://www.canadianrealestatemagazine.ca' },
      { name: 'REM Real Estate Magazine', url: 'https://realestatemagazine.ca/feed/', siteUrl: 'https://realestatemagazine.ca' },
      { name: 'Canadian Mortgage Trends', url: 'https://www.canadianmortgagetrends.com/feed/', siteUrl: 'https://www.canadianmortgagetrends.com' },
    ],
    caribbean: [
      // Jamaica — primary focus
      { name: 'Jamaica Gleaner Business', url: 'https://jamaica-gleaner.com/section/business/feed', siteUrl: 'https://jamaica-gleaner.com/business' },
      { name: 'Loop Jamaica', url: 'https://loopjamaica.com/category/business/feed', siteUrl: 'https://loopjamaica.com' },
      { name: 'Jamaica Observer Business', url: 'https://www.jamaicaobserver.com/feed/', siteUrl: 'https://www.jamaicaobserver.com/business' },
      // Broader Caribbean
      { name: 'Caribbean Journal', url: 'https://www.caribjournal.com/feed/', siteUrl: 'https://www.caribjournal.com' },
      { name: 'Caribbean Business', url: 'https://caribbeanbusiness.com/feed/', siteUrl: 'https://caribbeanbusiness.com' },
      { name: 'Cayman Compass', url: 'https://www.caymancompass.com/feed/', siteUrl: 'https://www.caymancompass.com' },
      { name: 'Barbados Today', url: 'https://barbadostoday.bb/feed/', siteUrl: 'https://barbadostoday.bb' },
    ],
    mortgage: [
      { name: 'Mortgage News Daily', url: 'https://www.mortgagenewsdaily.com/rss/mortgage_news', siteUrl: 'https://www.mortgagenewsdaily.com' },
      { name: 'National Mortgage News', url: 'https://www.nationalmortgagenews.com/feed', siteUrl: 'https://www.nationalmortgagenews.com' },
      { name: 'The Mortgage Reports', url: 'https://themortgagereports.com/feed', siteUrl: 'https://themortgagereports.com' },
      { name: 'HousingWire Mortgage', url: 'https://www.housingwire.com/articles/category/mortgage/feed/', siteUrl: 'https://www.housingwire.com/mortgage' },
      { name: 'Inman Mortgage', url: 'https://www.inman.com/category/mortgage/feed/', siteUrl: 'https://www.inman.com/category/mortgage' },
      { name: 'Bankrate Mortgages', url: 'https://www.bankrate.com/mortgages/news/feed/', siteUrl: 'https://www.bankrate.com/mortgages' },
    ],
  },
}

export const CRYPTO_FEEDS: { name: string; url: string; siteUrl: string }[] = [
  { name: 'CoinDesk',         url: 'https://www.coindesk.com/arc/outboundfeeds/rss/',  siteUrl: 'https://www.coindesk.com' },
  { name: 'Cointelegraph',    url: 'https://cointelegraph.com/rss',                    siteUrl: 'https://cointelegraph.com' },
  { name: 'Decrypt',          url: 'https://decrypt.co/feed',                          siteUrl: 'https://decrypt.co' },
  { name: 'Bitcoin Magazine',  url: 'https://bitcoinmagazine.com/.rss/full/',           siteUrl: 'https://bitcoinmagazine.com' },
  { name: 'The Block',        url: 'https://www.theblock.co/rss.xml',                  siteUrl: 'https://www.theblock.co' },
]

// channelHandle is used by /api/livestream to dynamically resolve the current live stream ID.
// embedUrl is the static fallback used if dynamic resolution fails.
export const VIDEO_FEEDS = [
  {
    id: 'bbc-news',
    title: 'BBC News Live',
    channelHandle: '@BBCNews',
    embedUrl: 'https://www.youtube.com/embed/w_Ma8oQLmSM',
    source: 'BBC News',
    liveUrl: 'https://www.bbc.com/news/av/live/c702600',
  },
  {
    id: 'al-jazeera',
    title: 'Al Jazeera English',
    channelHandle: '@AlJazeeraEnglish',
    embedUrl: 'https://www.youtube.com/embed/Z_1Q0LLDVEE',
    source: 'Al Jazeera',
    liveUrl: 'https://www.aljazeera.com/live',
  },
  {
    id: 'bloomberg',
    title: 'Bloomberg Markets Live',
    channelHandle: '@BloombergTV',
    embedUrl: 'https://www.youtube.com/embed/dp8PhLsUcFE',
    source: 'Bloomberg',
    liveUrl: 'https://www.bloomberg.com/live',
  },
  {
    id: 'sky-news',
    title: 'Sky News Live',
    channelHandle: '@SkyNews',
    embedUrl: 'https://www.youtube.com/embed/9Auq9mYxFEE',
    source: 'Sky News',
    liveUrl: 'https://news.sky.com/watch-live',
  },
  {
    id: 'abc-news',
    title: 'ABC News Live',
    channelHandle: '@ABCNews',
    embedUrl: 'https://www.youtube.com/embed/w_ISAA3Gn1E',
    source: 'ABC News',
    liveUrl: 'https://abcnews.go.com/Live',
  },
  {
    id: 'france24',
    title: 'France 24 English',
    channelHandle: '@FRANCE24English',
    embedUrl: 'https://www.youtube.com/embed/l8PMl7tUy_E',
    source: 'France 24',
    liveUrl: 'https://www.france24.com/en/live-news/',
  },
  {
    id: 'dw-news',
    title: 'DW News',
    channelHandle: '@dwnews',
    embedUrl: 'https://www.youtube.com/embed/ZvFHEBNMzDM',
    source: 'Deutsche Welle',
    liveUrl: 'https://www.dw.com/en/live-tv/s-100825',
  },
]

export const DISCLAIMER = 'GlobalInfoHub aggregates publicly available content from third-party sources. We do not own, produce, or endorse the content displayed. All trademarks belong to their respective owners. Links to third-party sites are provided for informational purposes only.'
