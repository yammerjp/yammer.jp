import { parse } from 'fast-xml-parser'
import type { JsonFeedItem } from '../types/JsonFeedItem'

type TextFetcher = (baseURL: string) => Promise<string>

type Options = {
    excludeTitle?: boolean
    textFetcher?: TextFetcher
}

function defaultTextFetcher(baseURL: string): Promise<string> {
    return fetch(baseURL).then(req => req.text())
}

export class RSSFetcher {
    private options?: Options
    private textFetcher: TextFetcher

    constructor(options?: Options) {
        this.options = options
        this.textFetcher = options?.textFetcher ?? defaultTextFetcher
    }

    async fetch(baseURL: string): Promise<JsonFeedItem[]> {
        const xmlText = await this.textFetcher(baseURL)
        return this.parse(xmlText)
    }

    private parse(xmlText: string): JsonFeedItem[] {
        const xmlObject = parse(xmlText,{
            ignoreAttributes: false,
            attributeNamePrefix : "@_"
        })

        const articles = xmlObject.rss?.channel?.item ?? xmlObject.feed?.entry
        return articles.map((item: any) => {
            const url = (() => {
                if (Array.isArray(item.link)) {
                    return item.link.filter((linkItem: any) => !linkItem["@_rel"])[0]["@_href"]
                } if (typeof item.link["@_href"] === 'string') {
                    return item.link["@_href"]
                } else {
                    return item.link
                }
            })();

            const contentText = buildContentText((() => {
                if (typeof item.content === 'string') {
                    return  item.content;
                } else if (typeof item.summary === 'string') {
                    return item.summary;
                } else if (typeof item.summary === 'object' &&  typeof item.summary['#text'] === 'string') {
                    return item.summary['#text'];
                } else if (typeof item.content === 'object' &&  typeof item.content['#text'] === 'string') {
                    return item.content['#text'];
                } else if (typeof item.description === 'string') {
                    return item.description;
                }
                return ''
            })());

            return {
                id: item.id ?? item.link ?? '',
                url,
                ...(this.options?.excludeTitle ? {} : {title: item.title ?? ''}),
                content_text: contentText,
                date_published: new Date(item.pubDate ?? item.published ?? '').toISOString(),
                _site_name: siteName(url)
            };
        })
    }
}

function buildContentText(description: string) {
    return description.
        replace(/&lt;/g, "<").
        replace(/&gt;/g, ">").
        replace(/<[^>]*>/g, "\n").
        replace(/LISTENで開く/,"").
        replace(/\&nbsp;/, "")
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

export function siteName(url: string): string {
  return siteNameCorrespondences.find(c => c.applicableRegex.test(url))?.siteName ?? url2fqdn(url)
}

const url2fqdn = (url: string): string => {
  return url.split(':').
    flatMap(s => s?.split('/')).
    flatMap(s => s?.split('?')).
    flatMap(s => s?.split('#')).
    filter(s => s).
    at(1) ?? url
}
