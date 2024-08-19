import type { MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { FeedItemCards } from "../components/FeedItemCards";
import { TabSelector } from "../components/TabSelector";
import { transformFeeds } from "../utils/FeedTransformer";
import type { JsonFeedItem } from "../types/JsonFeedItem";
import relatedPosts from "../data/related-posts.json";

export async function loader() {
  return json(
    await loadArticles()
  );
}

async function loadArticles(): Promise<{message: string, items: JsonFeedItem[]}> {
  const feeds = await transformFeeds(relatedPosts);
  if (feeds.length > 0) {
    return {message: "", items: feeds};
  } else {
    return {message: "No posts found", items: []};
  }

}

export const meta: MetaFunction = () => {
  return [
    { title: "関連 - yammer.jp" },
  ];
};

export default function Index() {
  const {message, items} = useLoaderData<typeof loader>();
  return (
    <div>
      <TabSelector selected="関連" />
      <FeedItemCards items={items} message={message} />
    </div>
  );
}