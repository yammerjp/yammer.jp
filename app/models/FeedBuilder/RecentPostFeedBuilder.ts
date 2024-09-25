import { JsonFeedItem } from "../../types/JsonFeedItem";
import FeedBuilder from "../../types/FeedBuilder";

import { RSSFetcher } from "../../models/RSSFetcher";

export class RecentPostFeedBuilder implements FeedBuilder {
    async build(): Promise<JsonFeedItem[]> {
        const fetcher = new RSSFetcher()
        const results = await Promise.all([
            fetcher.fetch("https://memo.yammer.jp/posts/index.xml"),
            fetcher.fetch("https://basd4g.hatenablog.com/feed"),
            fetcher.fetch("https://awkblog.net/@yammerjp/rss.xml"),
            fetcher.fetch("https://qiita.com/yammerjp/feed"),
            fetcher.fetch("https://zenn.dev/basd4g/feed?include_scraps=1"),
        ]);
        return results.flat().sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime());
    }
}
