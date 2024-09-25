import { JsonFeedItem } from "../../types/JsonFeedItem";
import FeedBuilder from "../../types/FeedBuilder";

import { fetchRSS } from "../RSSFetcher";

export class RecentPostFeedBuilder implements FeedBuilder {
    async build(): Promise<JsonFeedItem[]> {
        const results = await Promise.all([
            fetchRSS("https://memo.yammer.jp/posts/index.xml"),
            fetchRSS("https://qiita.com/yammerjp/feed.atom"),
            fetchRSS("https://basd4g.hatenablog.com/feed"),
            fetchRSS("https://awkblog.net/@yammerjp/rss.xml"),
            fetchRSS("https://qiita.com/yammerjp/feed"),
            fetchRSS("https://zenn.dev/basd4g/feed?include_scraps=1"),
        ]);
        return results.flat().sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime());
    }
}
