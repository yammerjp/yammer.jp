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

export function description(str: string) {
  const maxLength = 400;
  if (str.length && str.length <= maxLength) {
    return str;
  }
  return `${str.slice(0, maxLength - 1)}...`;
}

const iso8601toStr = (iso8601: string | undefined) => {
  if (iso8601 === undefined) {
    return ''
  }
  // 実行環境のタイムゾーンに関わらず、日本時間の値を取り出す
  const date = new Date(iso8601)
  const timezoneoffset = -9 // UTC-表示したいタイムゾーン(単位:hour)。JSTなら-9
  const fakeUTC = new Date(date.getTime() - (timezoneoffset * 60 - new Date().getTimezoneOffset()) * 60000)
  const yyyy = '' + fakeUTC.getFullYear()
  const MM = ('00' + (fakeUTC.getMonth() + 1)).slice(-2)
  const dd = ('00' + fakeUTC.getDate()).slice(-2)
  return `${yyyy}/${MM}/${dd}`
}
