import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import type { AppLoadContext } from "@remix-run/cloudflare";

import { FeedItemCards } from "../components/FeedItemCards";
import { TabSelector } from "../components/TabSelector";
import type { JsonFeedItem } from "../types/JsonFeedItem";
import { withCache } from "../utils/withCache";
import MurmurFeedBuilder from "../models/FeedBuilder/MurmurFeedBuilder";

export async function loader({context}: LoaderFunctionArgs) {
  return json({
    message: "",
    items: await fetchFeedsWithCache(context)
  });
}

export async function fetchFeedsWithCache(context: AppLoadContext): Promise<JsonFeedItem[]> {
  return await withCache<JsonFeedItem[]>(
    async () => new MurmurFeedBuilder().build(),
    {context, key: 'caches/feeds/murmurs'}
  )
}

export const meta: MetaFunction = () => {
  return [
    { title: "近況 - yammer.jp" },
  ];
};

export default function Index() {
  const {message, items} = useLoaderData<typeof loader>();
  return (
    <>
      <TabSelector selected="近況" />
      <FeedItemCards items={items} message={message} />
    </>
  );
}
