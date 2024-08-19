import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { FeedItemCards } from "../components/FeedItemCards";
import { TabSelector } from "../components/TabSelector";
import { transformFeeds } from "../utils/FeedTransformer";
import type { JsonFeedItem } from "../types/JsonFeedItem";

export async function loader({context}: LoaderFunctionArgs) {
  return json(
    await loadArticles(context.cloudflare.env.YAMMER_JP_CACHE)
  );
}

async function loadArticles(kv: KVNamespace): Promise<{message: string, items: JsonFeedItem[]}> {
  const cachedStr = await kv.get('caches/feeds/murmurs');
  if (cachedStr) {
    return {message: "", items: JSON.parse(cachedStr)};
  }
  const baseUrl = "https://usememos.yammer.jp/api/v1/memos?filter=creator=='users/1'";
  let url = baseUrl;
  const feeds: JsonFeedItem[] = [];
  while(1) {
    const responseJson = (await fetch(url).then(res =>res.json())) as any;
    if (!Array.isArray(responseJson?.memos)) {
      break;
    }
    const feedFlagments = responseJson.memos.map((item: any) => (
      {
        id: item.uid,
        url: `https://usememos.yammer.jp/m/${item.uid}`,
        title: "",
        content_text: item.content,
        date_published: new Date(item.createTime).toISOString(),
      }
    )).filter((item: any) => item.content_text.trim().length > 0)
    feeds.push(...feedFlagments);
    if (!responseJson.nextPageToken) {
      break
    }
    url = baseUrl + `&pageToken=${responseJson.nextPageToken}`;
  }
  const items = transformFeeds(feeds);
  await kv.put('caches/feeds/murmurs', JSON.stringify(items), {expirationTtl: 60 * 60});
  return {message: "", items};
}

export const meta: MetaFunction = () => {
  return [
    { title: "近況 - yammer.jp" },
  ];
};

export default function Index() {
  const {message, items} = useLoaderData<typeof loader>();
  return (
    <div>
      <TabSelector selected="近況" />
      <FeedItemCards items={items} message={message} />
    </div>
  );
}
