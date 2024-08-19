import { JsonFeedItem } from "../types/JsonFeedItem";
import styles from "./FeedItemCards.module.css";
import { FeedItemCard } from "./FeedItemCard";

export function FeedItemCards(props: {
    items: JsonFeedItem[];
    message: string;
}) {
    return (
      <div className={styles.tabsContainer}>
        <div className={styles.feedsWrapper}>
          {props.message.length > 0 ? (
            props.message
          ) : (
            props.items.map((item, i) => (
              <FeedItemCard key={item.id} item={item} isFirst={i === 0} />
            ))
          )}
        </div>
      </div>
    );
}
