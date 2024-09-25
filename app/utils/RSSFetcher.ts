import { parse } from 'fast-xml-parser'
import type { JsonFeedItem } from '../types/JsonFeedItem'

export async function fetchRSS(baseURL: string): Promise<JsonFeedItem[]> {
    const xmlText = await fetch(baseURL).then(req => req.text());
    const xmlObject = parse(xmlText)

    return xmlObject.rss.channel.item.map((item: any) => ({
        id: item.link ?? '',
        url: item.link ?? '',
        title: item.title ?? '',
        content_text: buildContentText(item.description ?? ''),
        date_published: new Date(item.pubDate ?? '').toISOString(),
    }))
}

function buildContentText(description: string) {
    return description.replace(/<[^>]*>/g, "\n").replace(/LISTENで開く/,"").replace(/\&nbsp;/, "")
}
