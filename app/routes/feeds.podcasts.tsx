import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import type { AppLoadContext } from "@remix-run/cloudflare";
import { parse } from 'fast-xml-parser';

import { FeedItemCards } from "../components/FeedItemCards";
import { TabSelector } from "../components/TabSelector";
import { transformFeeds } from "../utils/FeedTransformer";
import type { JsonFeedItem } from "../types/JsonFeedItem";
import { withCache } from "../utils/withCache";


export async function loader({context}: LoaderFunctionArgs) {
  return json({
    message: "", items: await fetchFeedsWithCache(context)
  });
}

export async function fetchFeedsWithCache(context: AppLoadContext): Promise<JsonFeedItem[]> {
  return await withCache<JsonFeedItem[]>(async () => {
    const baseURL = "https://listen.style/p/yammer/rss"

    let url = baseURL
    const items: JsonFeedItem[] = []
    while(url) {
      const xmlText = await fetch(baseURL).then(req => req.text());
      const xmlObject = parse(xmlText)

      items.push(...xmlObject.rss.channel.item.map(item => ({
          id: item.link ?? '',
          url: item.link ?? '',
          title: item.title ?? '',
        content_text: item.description.replace(/<[^>]*>/g, "\n").replace(/LISTENで開く/,"").replace(/\&nbsp;/, "") ?? '',
          date_published: new Date(item.pubDate ?? '').toISOString(),
      })))
      url = ""
    }

    items.push({
      id: "https://listen.style/p/h173club/rbu2xvan",
      url: "https://listen.style/p/h173club/rbu2xvan",
      title: "007: 商業誌への寄稿特集特別号 - h173.club",
      content_text: "今年はじめて商業誌に寄稿した@takapi86と@yammerjpに、執筆の経緯や体験談を話していただきました。Software Design 2022年5月号 Software Design 2022年6月号",
      date_published: "2022-06-03T00:00:00+09:00",
    })

    return transformFeeds(items)
  }, {context, key: 'caches/feeds/podcasts'})
}

export const meta: MetaFunction = () => {
  return [
    { title: "音声 - yammer.jp" },
  ];
};

export default function Index() {
  const {message, items} = useLoaderData<typeof loader>();
  return (
    <>
      <TabSelector selected="音声" />
      <FeedItemCards items={items} message={message} />
    </>
  );
}
