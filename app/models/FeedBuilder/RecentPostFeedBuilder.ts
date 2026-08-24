import { JsonFeedItem } from "../../types/JsonFeedItem";
import FeedBuilder from "../../types/FeedBuilder";

import { siteName, buildContentText } from "../../models/RSSFetcher";

type JsonFeedResponse = {
    items: {
        id: string;
        url: string;
        title?: string;
        content_text?: string;
        date_published: string;
    }[];
};

export class RecentPostFeedBuilder implements FeedBuilder {
    async build(): Promise<JsonFeedItem[]> {
        const response = await fetch("https://yammerjp.github.io/feeds/posts/all.json");
        if (!response.ok) {
            throw new Error(`Failed to fetch posts/all.json: ${response.status} ${response.statusText}`);
        }
        const data: JsonFeedResponse = await response.json();
        return data.items
            .map((item) => ({
                id: item.id,
                url: item.url,
                title: item.title ?? "",
                content_text: item.content_text ? buildContentText(item.content_text) : undefined,
                date_published: item.date_published,
                _site_name: siteName(item.url),
            }))
            .sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime());
    }
}
