import type { JsonFeedItem } from '../types/JsonFeedItem'

export interface JsonFeedItemWithSummary extends JsonFeedItem {
  summary?: string;
}

async function* fetchFeedsGenerator(url: string): AsyncGenerator<JsonFeedItemWithSummary[]> {
  while(url) {
    const responseJson = await fetch(url).then(res =>res.json())
    url = responseJson.next_url
    yield responseJson.items
  }
}

export async function fetchFeeds(url: string): Promise<JsonFeedItemWithSummary[]> {
  let p: JsonFeedItem[] = [];
  for await (const f of fetchFeedsGenerator(url)) {
    p.push(...f);
  }
  return p;
}
