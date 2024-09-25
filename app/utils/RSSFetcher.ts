import { parse } from 'fast-xml-parser'
import type { JsonFeedItem } from '../types/JsonFeedItem'

type Options = {
    excludeTitle?: boolean
}

export async function fetchRSS(baseURL: string, options?: Options): Promise<JsonFeedItem[]> {
    const xmlText = await fetch(baseURL).then(req => req.text());
    const xmlObject = parse(xmlText)

    return xmlObject.rss.channel.item.map((item: any) => ({
        id: item.link ?? '',
        url: item.link ?? '',
        ...(options?.excludeTitle ? {} : {title: item.title ?? ''}),
        content_text: buildContentText(item.description ?? ''),
        date_published: new Date(item.pubDate ?? '').toISOString(),
    }))
}

function buildContentText(description: string) {
    return description.
        replace(/&lt;/g, "<").
        replace(/&gt;/g, ">").
        replace(/<[^>]*>/g, "\n").
        replace(/LISTENで開く/,"").
        replace(/\&nbsp;/, "")
}
