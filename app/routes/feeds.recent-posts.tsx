import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { FeedItemCards } from "../components/FeedItemCards";
import { TabSelector } from "../components/TabSelector";
import { fetchAndTransformFeeds } from "../utils/FeedTransformer";
import type { JsonFeedItem } from "../types/JsonFeedItem";

export async function loader({context}: LoaderFunctionArgs) {
  return json(
    await loadArticles(context.cloudflare.env.YAMMER_JP_CACHE)
  );
}

async function loadArticles(kv: KVNamespace): Promise<{message: string, items: JsonFeedItem[]}> {
  try {
    const cachedStr = await kv.get('caches/feeds/recent-posts');
    if (cachedStr) {
      return {message: "", items: JSON.parse(cachedStr)};
    }
    const feeds = await fetchAndTransformFeeds('https://rsss.yammer.jp/v0/json_feed');
    if (feeds.length > 0) {
      await kv.put('caches/feeds/recent-posts', JSON.stringify(feeds), {expirationTtl: 60 * 60});
      return {message: "", items: feeds};
    } else {
      return {message: "No posts found", items: []};
    }
  } catch (error) {
    console.log(error);
    return {message: "Error fetching posts", items: []};
  }
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
