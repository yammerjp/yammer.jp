import type { LoaderFunctionArgs, MetaFunction, LinksFunction } from "react-router";
import { useLoaderData } from "react-router";

import { FeedItemCards } from "../components/FeedItemCards";
import { TabSelector } from "../components/TabSelector";
import type { JsonFeedItem } from "../types/JsonFeedItem";
import { withCache } from "../utils/withCache";

import type { AppLoadContext } from "react-router";

import { RecentPostFeedBuilder } from "../models/FeedBuilder/RecentPostFeedBuilder";

export async function loader({context}: LoaderFunctionArgs) {
  return {
    message: "",
    items: await fetchFeedsWithCache(context)
  };
}

export async function fetchFeedsWithCache(context: AppLoadContext): Promise<JsonFeedItem[]> {
  return await withCache<JsonFeedItem[]>(
    () =>new RecentPostFeedBuilder().build(),
    {context, key: 'caches/feeds/recent-posts'}
  )
}

export const meta: MetaFunction = () => {
  return [
    { title: "投稿 - yammer.jp" },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "alternate",
      href: "/feeds/recent-posts.xml",
      title: "RSS2.0",
    }
  ]
}

export default function Index() {
  const {message, items} = useLoaderData<typeof loader>();
  return (
    <>
      <TabSelector selected="投稿" />
      <FeedItemCards items={items} message={message} />
    </>
  );
}
