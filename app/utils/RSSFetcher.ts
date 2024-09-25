import { parse } from 'fast-xml-parser'
import type { JsonFeedItem } from '../types/JsonFeedItem'

type Options = {
    excludeTitle?: boolean
}

export async function fetchRSS(baseURL: string, options?: Options): Promise<JsonFeedItem[]> {
    const xmlText = await fetch(baseURL).then(req => req.text());
    const xmlObject = parse(xmlText,{
        ignoreAttributes: false,
          attributeNamePrefix : "@_"
    })

    if (xmlObject.rss?.channel?.item) {
        const articles = xmlObject.rss?.channel?.item;
        return articles.map((item: any) => ({
            id: item.link ?? '',
            url: item.link ?? '',
            ...(options?.excludeTitle ? {} : {title: item.title ?? ''}),
            content_text: buildContentText(item.description ?? ''),
            date_published: new Date(item.pubDate ?? item.published ?? '').toISOString(),
        }))
    } else {
        const articles = xmlObject.feed?.entry;
        return articles.map((item: any) => {
            let url = '';
            if (Array.isArray(item.link)) {
                url = item.link.filter((linkItem: any) => !linkItem["@_rel"])[0]["@_href"]
            } else if (typeof item.link["@_href"] === 'string') {
                url = item.link["@_href"]
            } else {
                url = item.link
            }
            let contentText = '';
            if (typeof item.content === 'string') {
                contentText = item.content;
            } else if (typeof item.summary === 'string') {
            } else if (typeof item.summary === 'object' &&  typeof item.summary['#text'] === 'string') {
                contentText = item.summary['#text'];
            } else if (typeof item.content === 'object' &&  typeof item.content['#text'] === 'string') {
                contentText = item.content['#text'];
            } else if (typeof item.description === 'string') {
                contentText = item.description;
            }

            const retItem = {
                id: item.id ?? item.link ?? '',
                url: url,
                ...(options?.excludeTitle ? {} : {title: item.title ?? ''}),
                content_text: buildContentText(contentText),
                date_published: new Date(item.pubDate ?? item.published ?? '').toISOString(),
            };
            return retItem;
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
