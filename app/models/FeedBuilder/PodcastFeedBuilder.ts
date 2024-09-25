import { JsonFeedItem } from "../../types/JsonFeedItem";
import FeedBuilder from "../../types/FeedBuilder";

import { RSSFetcher } from "../../models/RSSFetcher";

import podcasts from "../../data/podcasts.json";

export class PodcastFeedBuilder implements FeedBuilder {
    async build(): Promise<JsonFeedItem[]> {
        const fetcher = new RSSFetcher()

        return [
            ...await fetcher.fetch("https://listen.style/p/yammer/rss"),
            ...podcasts
        ]
    }
}
