import type { MetaFunction, LinksFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { loader } from "./feeds.recent-posts";
export { loader };

import { Avater } from "../components/Avater";
import { Links } from "../components/Links";
import { TabSelector } from "../components/TabSelector";
import { FeedItemCards } from "../components/FeedItemCards";

export default function Index() {
  const {message, items} = useLoaderData<typeof loader>();
  return <>
    <Avater />
    <Links />
    <TabSelector selected="投稿" />
    <FeedItemCards items={items} message={message} />
  </>
}

export const links: LinksFunction = () => {
  return [
    {
      rel: "alternate",
      href: "/feeds/recent-posts.xml",
      title: "RSS2.0",
    }
  ]
}

export const meta: MetaFunction = () => {
  return [
    {
      name: "description",
      content: "yammer is a Web Developper and a Scuba Diver",
    },
    {
      property: "og:title",
      content: "yammer.jp",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:description",
      content: "yammer is a Web Developper and a Scuba Diver",
    },
    {
      property: "og:url",
      content: "https://yammer.jp",
    },
    {
      property: "og:image",
      content: "https://yammer.jp/assets/ogp-20201204.png",
    },
  ];
};
