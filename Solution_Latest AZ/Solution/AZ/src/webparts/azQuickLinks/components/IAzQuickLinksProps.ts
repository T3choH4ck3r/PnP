import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';

export interface IAzQuickLinksProps {
  context: any;
  linksListURL: string;
  listName: string;
}
