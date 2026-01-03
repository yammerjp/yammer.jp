import type { MetaFunction } from "react-router";
import { Outlet } from "react-router";

import { Avater } from "../components/Avater";
import { Links } from "../components/Links";

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

export default function Index() {
  return (
    <>
      <Avater />
      <Links />
      <Outlet />
    </>
  );
}
