import { JsonFeedItem } from "../../types/JsonFeedItem";
import FeedBuilder from "../../types/FeedBuilder";

import { fetchRSS } from "../RSSFetcher";

export class RecentPostFeedBuilder implements FeedBuilder {
    async build(): Promise<JsonFeedItem[]> {
        const [memo, qiita, hatenablog, awkblog] = await Promise.all([
            fetchRSS("https://memo.yammer.jp/posts/index.xml"),
            fetchRSS("https://qiita.com/yammerjp/feed.atom"),
            fetchRSS("https://basd4g.hatenablog.com/feed"),
            fetchRSS("https://awkblog.net/@yammerjp/rss.xml"),
        ]);
        return [...memo, ...qiita, ...hatenablog, ...awkblog].sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime());
    }
}
