import { JsonFeedItem } from "../../types/JsonFeedItem";
import FeedBuilder from "../../types/FeedBuilder";

import { fetchRSS } from "../RSSFetcher";

export default class MurmurFeedBuilder implements FeedBuilder {
  async build(): Promise<JsonFeedItem[]> {
    return await fetchRSS("https://usememos.yammer.jp/u/yammer/rss.xml", {excludeTitle: true});
  }
}
