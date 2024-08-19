import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { FeedItemCards } from "../components/FeedItemCards";
import { TabSelector } from "../components/TabSelector";
import { transformFeeds } from "../utils/FeedTransformer";
import type { JsonFeedItem } from "../types/JsonFeedItem";

export async function loader({context}: LoaderFunctionArgs) {
  const kv = context.cloudflare.env.YAMMER_JP_CACHE
  const cachedStr = await kv.get('caches/feeds/murmurs');
  if (cachedStr) {
    return json({message: "", items: JSON.parse(cachedStr)});
  }

  const items = await fetchFeeds()
  await kv.put('caches/feeds/murmurs', JSON.stringify(items), {expirationTtl: 60 * 60});
  return json({message: "", items });
}


async function fetchFeeds(): Promise<JsonFeedItem[]> {
  const baseURL = "https://usememos.yammer.jp/api/v1/memos?filter=creator=='users/1'"

  let url = baseURL
  const items: JsonFeedItem[] = []
  while(url) {
    const responseJson = await fetch(url).then(res =>res.json()) as {memos: {uid: string, content: string, createTime: string}[], nextPageToken?: string}
    if (!Array.isArray(responseJson.memos) || !responseJson.nextPageToken) {
      break;
    }
    url = baseURL + `&pageToken=${responseJson.nextPageToken}`
    items.push(...responseJson.memos.map(memo => (
      {
        id: memo.uid,
        url: `https://usememos.yammer.jp/m/${memo.uid}`,
        title: "",
        content_text: memo.content,
        date_published: new Date(memo.createTime).toISOString(),
      }
    )))
  }
  return transformFeeds(items)
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
