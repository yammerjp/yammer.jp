import { JsonFeedItem } from "../../types/JsonFeedItem";
import FeedBuilder from "../../types/FeedBuilder";

type JsonFeedResponse = {
  items: {
    id: string;
    url: string;
    title?: string;
    content_text?: string;
    date_published: string;
  }[];
};

export class PhotoFeedBuilder implements FeedBuilder {
    async build(): Promise<JsonFeedItem[]> {
        const response = await fetch("https://yammerjp.github.io/feeds/photos/feed.json");
        const data: JsonFeedResponse = await response.json();
        return data.items.map((item) => ({
            id: item.id,
            url: item.url,
            content_html: `<img src="${item.url}" alt="${item.title ?? ''}" style="max-width: 100%; height: auto; display: block; border-radius: 4px; margin-bottom: 12px;" />`,
            content_text: item.title,
            date_published: item.date_published,
            _site_name: 'toycamera.yammer.jp'
        }));
    }
}
