import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { FeedItemCards } from "../components/FeedItemCards";
import { TabSelector } from "../components/TabSelector";
import { transformFeeds } from "../utils/FeedTransformer";
import type { JsonFeedItem } from "../types/JsonFeedItem";
import { withCache } from "../utils/withCache";

import type { AppLoadContext } from "@remix-run/cloudflare";

import { RecentPostFeedBuilder } from "../utils/FeedBuilder/RecentPostFeedBuilder";

export async function loader({context}: LoaderFunctionArgs) {
  return json(
    {
      message: "",
      items: await fetchFeedsWithCache(context)
    }
  );
}

export async function fetchFeedsWithCache(context: AppLoadContext): Promise<JsonFeedItem[]> {
  return await withCache<JsonFeedItem[]>(async () => {
    const feeds = await new RecentPostFeedBuilder().build();
    return transformFeeds(feeds);
  }, {context, key: 'caches/feeds/recent-posts'})
}

export const meta: MetaFunction = () => {
  return [
    { title: "投稿 - yammer.jp" },
  ];
};

export default function Index() {
  const {message, items} = useLoaderData<typeof loader>();
  return (
    <>
      <TabSelector selected="投稿" />
      <FeedItemCards items={items} message={message} />
    </>
  );
}
