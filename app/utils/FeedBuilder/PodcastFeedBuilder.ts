import { JsonFeedItem } from "../../types/JsonFeedItem";
import FeedBuilder from "../../types/FeedBuilder";

import { fetchRSS } from "../RSSFetcher";
import podcasts from "../../data/podcasts.json";

export class PodcastFeedBuilder implements FeedBuilder {
    async build(): Promise<JsonFeedItem[]> {
        const baseURL = "https://listen.style/p/yammer/rss"

        return [
            ...await fetchRSS(baseURL),
            ...podcasts
        ]
    }
}
