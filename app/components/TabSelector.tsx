import tabSelectorStyle from "./TabSelector.module.css";

export function TabSelector(
    props: {
        selected: string;
    }
) {
    return (
      <div className={tabSelectorStyle.tabsContainer}>
        <nav className={tabSelectorStyle.tabSelectorWrapper}>
          <a 
            className={tabSelectorStyle.tabSelector + ' ' + (props.selected === '投稿' ? tabSelectorStyle.selected : '')}
            href="/feeds/recent-posts"
          >投稿</a>
          <a 
            className={tabSelectorStyle.tabSelector + ' ' + (props.selected === '発表' ? tabSelectorStyle.selected : '')}
            href="/feeds/slides"
          >発表</a>
          <a 
            className={tabSelectorStyle.tabSelector + ' ' + (props.selected === '寄稿' ? tabSelectorStyle.selected : '')}
            href="/feeds/contributions"
          >寄稿</a>
          <a 
            className={tabSelectorStyle.tabSelector + ' ' + (props.selected === '関連' ? tabSelectorStyle.selected : '')}
            href="/feeds/related-posts"
          >関連</a>
          <a 
            className={tabSelectorStyle.tabSelector + ' ' + (props.selected === '近況' ? tabSelectorStyle.selected : '')}
            href="/feeds/murmurs"
          >近況</a>
        </nav>
      </div>
    );
}

