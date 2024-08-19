export interface JsonFeedItem {
  id: string;
  url: string;
  title: string;
  content_html?: string;
  content_text?: string;
  date_published: string;
  _site_name?: string;
}
