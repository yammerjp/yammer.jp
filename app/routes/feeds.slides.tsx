import type { MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { FeedItemCards } from "../components/FeedItemCards";
import { TabSelector } from "../components/TabSelector";
import type { JsonFeedItem } from "../types/JsonFeedItem";
import slides from "../data/slides.json";

import { siteName } from "../models/RSSFetcher";

export async function loader() {
  return json(
    await loadArticles()
  );
}

async function loadArticles(): Promise<{message: string, items: JsonFeedItem[]}> {
  const feeds = slides.map(e => ({...e, _site_name: siteName(e.url)}))

  if (feeds.length > 0) {
    return {message: "", items: feeds};
  } else {
    return {message: "No posts found", items: []};
  }

}

export const meta: MetaFunction = () => {
  return [
    { title: "発表 - yammer.jp" },
  ];
};

export default function Index() {
  const {message, items} = useLoaderData<typeof loader>();
  return (
    <>
      <TabSelector selected="発表" />
      <FeedItemCards items={items} message={message} />
    </>
  );
}
