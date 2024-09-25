import { JsonFeedItem } from "./JsonFeedItem"

export default interface FeedBuilder {
    build(): Promise<JsonFeedItem[]>;
}
