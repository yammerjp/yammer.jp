import type { JsonFeedItem } from '../types/JsonFeedItem'

interface JsonFeedItemWithSummary extends JsonFeedItem {
  summary?: string;
}

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
    applicableRegex: /^https:\/\/zenn\.dev\//,
    siteName: 'Zenn'
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
  },
  {
    applicableRegex: /^https:\/\/www\.youtube\.com\//,
    siteName: 'Youtube'
  },
  {
    applicableRegex: /^https:\/\/listen\.style\/p\/h173club/,
    siteName: 'h173.club on LISTEN'
  },
  {
    applicableRegex: /^https:\/\/listen\.style\/p\/yammer/,
    siteName: 'yammerの日記 on LISTEN'
  },
  {
    applicableRegex: /^https:\/\/gihyo\.jp\//,
    siteName: '技術評論社'
  },
]

const url2fqdn = (url: string): string => {
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
