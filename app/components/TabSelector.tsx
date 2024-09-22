import tabSelectorStyle from "./TabSelector.module.css";
import { Link } from "@remix-run/react";
export function TabSelector(
    props: {
        selected: string;
    }
) {
  const tabs = [
    {
      label: '投稿',
      to: '/feeds/recent-posts',
    },
    {
      label: '発表',
      to: '/feeds/slides',
    },
    {
      label: '寄稿',
      to: '/feeds/contributions',
    },
    {
      label: '関連',
      to: '/feeds/related-posts',
    },
    {
      label: '音声',
      to: '/feeds/podcasts',
    },
    {
      label: '近況',
      to: '/feeds/murmurs',
    },
  ]
    return (
      <div className={tabSelectorStyle.tabsContainer}>
        <nav className={tabSelectorStyle.tabSelectorWrapper}>
          {tabs.map((tab) => (
          <Link
            key={tab.label}
            className={tabSelectorStyle.tabSelector + ' ' + (props.selected === tab.label ? tabSelectorStyle.selected : '')}
            to={tab.to}
          >{tab.label}</Link>
          ))}
        </nav>
      </div>
    );
}

