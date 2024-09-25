import { JsonFeedItem } from "../../types/JsonFeedItem";
import FeedBuilder from "../../types/FeedBuilder";

import { RSSFetcher } from "../../models/RSSFetcher";

export default class MurmurFeedBuilder implements FeedBuilder {
  async build(): Promise<JsonFeedItem[]> {
    const fetcher = new RSSFetcher({ excludeTitle: true })
    return await fetcher.fetch("https://usememos.yammer.jp/u/yammer/rss.xml")
  }
}
