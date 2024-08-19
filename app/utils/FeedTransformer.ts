import { fetchFeeds } from './JsonFeedFetcher'
import type { JsonFeedItemWithSummary } from './JsonFeedFetcher'

const siteNameCorrespondences = [
  {
    applicableRegex: /^https:\/\/memo\.yammer\.jp\//,
    siteName:  'memo.yammer.jp'
  },
  {
    applicableRegex: /^https:\/\/basd4g\.hatenablog\.com\//,
    siteName: 'はてなブログ'
  },
  {
    applicableRegex: /^https:\/\/qiita\.com\/yammerjp\//,
    siteName: 'Qiita'
  },
  {
    applicableRegex: /^https:\/\/microblog\.yammer\.jp/,
    siteName: 'microblog'
  },
  {
    applicableRegex: /^https:\/\/usememos\.yammer\.jp/,
    siteName: 'microblog'
  },

  {
    applicableRegex: /^https:\/\/speakerdeck\.com/,
    siteName: 'Speaker Deck'
  },
  {
    applicableRegex: /^https:\/\/tech\.pepabo\.com/,
    siteName: 'Pepabo Tech Portal'
  }
]

const　url2fqdn = (url: string): string => {
  return url.split(':').
    flatMap(s => s?.split('/')).
    flatMap(s => s?.split('?')).
    flatMap(s => s?.split('#')).
    filter(s => s).
    at(1) ?? url
}

function siteName(url: string): string {
  return siteNameCorrespondences.find(c => c.applicableRegex.test(url))?.siteName ?? url2fqdn(url)
}

export const transformFeeds = (feeds: JsonFeedItemWithSummary[]) => feeds.map(elm => ({
  ...elm,
  content_text: elm.summary ?? elm.content_text,
  _site_name: siteName(elm.url)
}))

export const fetchAndTransformFeeds = (url: string) => fetchFeeds(url).then(transformFeeds)
