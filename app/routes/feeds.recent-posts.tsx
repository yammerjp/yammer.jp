import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { FeedItemCards } from "../components/FeedItemCards";
import { TabSelector } from "../components/TabSelector";
import { transformFeeds } from "../utils/FeedTransformer";
import type { JsonFeedItem } from "../types/JsonFeedItem";

export async function loader({context}: LoaderFunctionArgs) {
  const kv = context.cloudflare.env.YAMMER_JP_CACHE
  const cachedStr = await kv.get('caches/feeds/recent-posts');
  if (cachedStr) {
    return json({message: "", items: JSON.parse(cachedStr)});
  }
  const feeds = await fetchFeeds();
  await kv.put('caches/feeds/recent-posts', JSON.stringify(feeds), {expirationTtl: 60 * 60});
  return json({message: "", items: feeds});
}

const fetchFeeds = async () => {
  const resObj = await fetch('https://rsss.yammer.jp/v0/json_feed').then(res => res.json()) as {items: JsonFeedItem[]};
  return transformFeeds(resObj.items);
}

export const meta: MetaFunction = () => {
  return [
    { title: "投稿 - yammer.jp" },
  ];
};

export default function Index() {
  const {message, items} = useLoaderData<typeof loader>();
  return (
    <div>
      <TabSelector selected="投稿" />
      <FeedItemCards items={items} message={message} />
    </div>
  );
}
