import { JsonFeedItem } from "../types/JsonFeedItem";
import styles from "./FeedItemCard.module.css";
export const FeedItemCard = (props: {
    item: JsonFeedItem,
    isFirst: boolean
}) => {
    return (
        <a href={props.item.url} className={styles.articleWrapperLink + (props.isFirst ? " " + styles.isFirst : "")}>
            <div className={styles.article}>
                {props.item.title && <h3 className={styles.title}>{props.item.title}</h3>}
                <div className={styles.dateAndSite}>
                    {iso8601toStr(props.item.date_published)}
                    {props.item._site_name && (" - " + props.item._site_name)}
                </div>
                <div className={styles.content}>
                    {props.item.content_html && <div dangerouslySetInnerHTML={{ __html: props.item.content_html }} />}
                    {props.item.content_text && <div className={styles.description}>{description(props.item.content_text)}</div>}
                </div>
            </div>
        </a>
)
}

function description(str: string) {
  const maxLength = 400;
  if (str.length && str.length <= maxLength) {
    return str;
  }
  return `${str.slice(0, maxLength - 1)}...`;
}

function iso8601toStr(isoDate: string): string {
  const d = new Date(isoDate);
  const yyyy = `${d.getFullYear()}`;
  const mm = (`00${d.getMonth() + 1}`).slice(-2);
  const dd = (`00${d.getDate()}`).slice(-2);
  return `${yyyy}/${mm}/${dd}`;
}
