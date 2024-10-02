import { JsonFeedItem } from "../types/JsonFeedItem";
import { description } from "../components/FeedItemCard";

type RSSChannel = {
  title: string;
  link: string;
  description: string;
  items: JsonFeedItem[];
}

function feed2xml(channel: RSSChannel) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Recent Posts of yammer.jp</title>
      <link>https://yammer.jp/feeds/recent-posts</link>
      <description>Keisuke Nakayama's recent posts</description>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <docs>https://blogs.law.harvard.edu/tech/rss</docs>
      <generator>https://github.com/yammerjp/yammer.jp</generator>
      ${channel.items.map((item: JsonFeedItem) => `
        <item>
          <title>${item.title}</title>
          <link>${item.url}</link>
          <description>${description((item.content_text ?? item.content_html ?? '')?.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"))}</description>
          <guid isPermalink="true">${item.id}</guid>
          <pubDate>${item.date_published}</pubDate>
        </item>
      `).join("\n")}
    </channel> 
  </rss>`;
}

export function buildRSSResponse(channel: RSSChannel) {
  return new Response(feed2xml(channel), {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    }
  });
}
