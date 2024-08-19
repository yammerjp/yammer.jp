import type { MetaFunction } from "@remix-run/cloudflare";
export { loader } from "./feeds.recent-posts";
import Index from "./feeds.recent-posts";
export default Index;

export const meta: MetaFunction = () => {
  return [
    { title: "yammer.jp" },
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
