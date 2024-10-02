import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { fetchFeedsWithCache } from "./feeds.recent-posts";
import { buildRSSResponse } from "../utils/buildRSSResponse";

export async function loader({context}: LoaderFunctionArgs) {
  return buildRSSResponse({
    title: "Recent Posts of yammer.jp",
    link: "https://yammer.jp/feeds/recent-posts",
    description: "Keisuke Nakayama's recent posts",
    items: await fetchFeedsWithCache(context),
  });
}
