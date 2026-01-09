import { JsonFeedItem } from "../../types/JsonFeedItem";
import FeedBuilder from "../../types/FeedBuilder";

type JsonFeedResponse = {
  items: {
    id: string;
    url: string;
    content_text?: string;
    date_published: string;
    source?: string; // deprecated, use tags instead
    tags?: string[];
  }[];
};

const tagToSiteName: Record<string, string> = {
  memos: "usememos",
  bluesky: "Bluesky",
  twitter: "X",
};

function stripHtmlTags(text: string): string {
  return text.replace(/<[^>]*>/g, "").trim();
}

export default class MurmurFeedBuilder implements FeedBuilder {
  async build(): Promise<JsonFeedItem[]> {
    const response = await fetch(
      "https://yammerjp.github.io/feeds/microblog/all.json"
    );
    const data: JsonFeedResponse = await response.json();
    return data.items.map((item) => {
      // tags の最初の要素を使用（フォールバックとして source も対応）
      const tag = item.tags?.[0] ?? item.source;
      return {
        id: item.id,
        url: item.url,
        title: "",
        content_text: item.content_text ? stripHtmlTags(item.content_text) : undefined,
        date_published: item.date_published,
        _site_name: tag ? tagToSiteName[tag] ?? tag : undefined,
      };
    });
  }
}
