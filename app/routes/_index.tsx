import type { MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

// load css module
import avaterStyle from "../styles/avater.module.css";
import linksStyle from "../styles/links.module.css";
import tabSelectorStyle from "../styles/tabSelector.module.css";
import tabContentStyle from "../styles/tabContent.module.css";

import { FeedItemCard } from "../components/FeedItemCard";
import { fetchAndTransformFeeds } from "../utils/FeedTransformer";
import type { JsonFeedItem } from "../types/JsonFeedItem";

export async function loader() {
  return json(
    await loadArticles()
  );
}

async function loadArticles(): Promise<{message: string, items: JsonFeedItem[]}> {
  const feeds = await fetchAndTransformFeeds('https://rsss.yammer.jp/v0/json_feed');
  if (feeds.length > 0) {
    return {message: "", items: feeds};
  } else {
    return {message: "No posts found", items: []};
  }

}

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

export default function Index() {
  const {message, items} = useLoaderData<typeof loader>();
  return (
    <div>
      {/* Avater.svelte */}
      <div className={avaterStyle.avater}>
        <div className={avaterStyle.avaterContainer}>
          <div className={avaterStyle.avaterContainerStart}>
            <img
              src="/assets/gather_fishes_200x200.jpg"
              srcSet="/assets/gather_fishes_200x200.jpg 1x, /assets/gather_fishes_400x400.jpg 2x"
              className={avaterStyle.avaterIcon}
              alt="yammerjp avater icon"
              width="200px"
              height="200px"
            />
          </div>
          <div className={avaterStyle.avaterContainerEnd}>
            <div className={avaterStyle.avaterDescription}>
              <div className={avaterStyle.fullname}>Keisuke Nakayama</div>
              <div className={avaterStyle.nickname}>yammer</div>
              <div className={avaterStyle.description}>
                <span className={avaterStyle.descriptionMass}>Web Application Developper /</span>
                <span className={avaterStyle.descriptionMass}>SCUBA Diver</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={avaterStyle.avaterSvgWrapper}>
        <svg name="bezier-curve-circle">
          <clipPath id="bezier-curve-circle" clipPathUnits="objectBoundingBox">
            <path d="M 0 0.5 C 0 0.166, 0.166 0, 0.5 0 S 1 0.166, 1 0.5 S 0.833 1, 0.5 1 S 0, 0.833, 0, 0.5 Z" />
          </clipPath>
        </svg>
      </div>

      { /* Links.svelte */ }
      <div className={linksStyle.links}>
        <a href="https://twitter.com/yammerjp">
          <img
            className={linksStyle.linksIcon}
            src="/assets/twitter.png"
            alt="Twitter icon"
          />
          <div className={linksStyle.titleWrapper}>
            <span className={linksStyle.title}>Twitter</span>
          </div>
        </a>

        <a href="https://github.com/yammerjp">
          <img
            className={linksStyle.linksIcon}
            src="/assets/github.png"
            alt="GitHub icon"
          />
          <div className={linksStyle.titleWrapper}>
            <span className={linksStyle.title}>GitHub</span>
          </div>
        </a>

        <a href="https://qiita.com/yammerjp">
          <img
            className={linksStyle.linksIcon}
            src="/assets/qiita.png"
            alt="GitHub icon"
          />
          <div className={linksStyle.titleWrapper}>
            <span className={linksStyle.title}>Qiita</span>
          </div>
        </a>

        <a href="https://basd4g.hatenablog.com">
          <img
            className={linksStyle.linksIcon}
            src="/assets/hatenablog.png"
            alt="hatenablog icon"
          />
          <div className={linksStyle.titleWrapper}>
            <span className={linksStyle.title}>はてなブログ</span>
          </div>
        </a>

        <a href="https://memo.yammer.jp">
          <img
            className={linksStyle.linksIcon}
            src="/assets/memo-yammer-jp.png"
            alt="memo-yammer-jp icon"
          />
          <div className={linksStyle.titleWrapper}>
            <span className={linksStyle.title}>memo<wbr />.<wbr />yammer<wbr />.<wbr />jp</span>
          </div>
        </a>
      </div>

      {/* TabSelector.svelte */}
      <div className={tabSelectorStyle.tabsContainer}>
        <nav className={tabSelectorStyle.tabSelectorWrapper}>
          <a 
            className={tabSelectorStyle.tabSelector + ' ' + tabSelectorStyle.selected}
            href="/feeds/recent-posts"
          >投稿</a>
          <a 
            className={tabSelectorStyle.tabSelector}
            href="/feeds/slides"
          >発表</a>
          <a 
            className={tabSelectorStyle.tabSelector}
            href="/feeds/contributions"
          >寄稿</a>
          <a 
            className={tabSelectorStyle.tabSelector}
            href="/feeds/related-posts"
          >関連</a>
          <a 
            className={tabSelectorStyle.tabSelector}
            href="/feeds/murmurs"
          >近況</a>
        </nav>
      </div>

      { /* TabContent.svelte */ }
      <div className={tabContentStyle.tabsContainer}>
        <div className={tabContentStyle.feedsWrapper}>
          {message.length > 0 ? message : items.map((item, i) => (
            <FeedItemCard item={item} isFirst={i===0}/>
          ))}
       </div>
      </div>
    </div>
  );
}
