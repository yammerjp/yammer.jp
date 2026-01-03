import { JsonFeedItem } from "../types/JsonFeedItem";
import styles from "./FeedItemCards.module.css";
import { FeedItemCard } from "./FeedItemCard";

export function FeedItemCards(props: {
    items: JsonFeedItem[];
    message: string;
    showReadMoreLinks?: boolean;
}) {
    return (
      <div className={styles.tabsContainer}>
        <div className={styles.feedsWrapper}>
          {props.message.length > 0 ? (
            props.message
          ) : (
            <>
              {props.items.map((item, i) => (
                <FeedItemCard key={item.id} item={item} isFirst={i === 0} />
              ))}
              {props.showReadMoreLinks && (
                <div className={styles.readMoreLinks}>
                  <p>さらに読む:</p>
                  <ul>
                    <li><a href="https://bsky.app/profile/yammer.jp" target="_blank" rel="noopener noreferrer">Bluesky</a></li>
                    <li><a href="https://usememos.yammer.jp/u/yammer" target="_blank" rel="noopener noreferrer">usememos</a></li>
                    <li><a href="https://x.com/yaboratory" target="_blank" rel="noopener noreferrer">X(Twitter)</a></li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
}
