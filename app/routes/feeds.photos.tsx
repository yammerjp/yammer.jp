import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import type { AppLoadContext } from "@remix-run/cloudflare";

import { FeedItemCards } from "../components/FeedItemCards";
import { TabSelector } from "../components/TabSelector";
import type { JsonFeedItem } from "../types/JsonFeedItem";
import { PhotoFeedBuilder } from "../models/FeedBuilder/PhotoFeedBuilder";
import { withCache } from "../utils/withCache";


export async function loader({context}: LoaderFunctionArgs) {
  return json({
    message: "", items: await fetchFeedsWithCache(context)
  });
}

export async function fetchFeedsWithCache(context: AppLoadContext): Promise<JsonFeedItem[]> {
  return await withCache<JsonFeedItem[]>(
    () => (new PhotoFeedBuilder()).build(),
    {context, key: 'caches/feeds/photos'}
  )
}

export const meta: MetaFunction = () => {
  return [
    { title: "写真 - yammer.jp" },
  ];
};

export default function Index() {
  const {message, items} = useLoaderData<typeof loader>();
  return (
    <>
      <TabSelector selected="写真" />
      <FeedItemCards items={items} message={message} />
    </>
  );
}
