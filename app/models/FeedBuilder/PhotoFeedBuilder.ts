import { JsonFeedItem } from "../../types/JsonFeedItem";
import FeedBuilder from "../../types/FeedBuilder";
import { XMLParser } from 'fast-xml-parser'

export class PhotoFeedBuilder implements FeedBuilder {
    async build(): Promise<JsonFeedItem[]> {
        const xmlText = await fetch("https://toycamera.yammer.jp/@yammer/feed.xml").then(req => req.text())
        return this.parse(xmlText)
    }

    private parse(xmlText: string): JsonFeedItem[] {
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        })
        const xmlObject = parser.parse(xmlText)

        const items = xmlObject.rss?.channel?.item ?? []
        return items.map((item: any) => {
            const imageUrl = item.enclosure?.["@_url"] ?? item.link ?? ''
            const text = item.title ?? ''
            const guid = item.guid?.["#text"] ?? item.guid ?? ''
            const pageUrl = item.link ?? ''
            const pubDate = item.pubDate ?? ''

            return {
                id: guid,
                url: pageUrl,
                content_html: imageUrl ? `<img src="${imageUrl}" alt="${text}" style="max-width: 100%; height: auto; display: block; border-radius: 4px; margin-bottom: 12px;" />` : undefined,
                content_text: text,
                date_published: new Date(pubDate).toISOString(),
                _site_name: 'toycamera.yammer.jp'
            }
        })
    }
}
