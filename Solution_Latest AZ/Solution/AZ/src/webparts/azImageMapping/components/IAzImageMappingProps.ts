import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';

export interface IAzImageMappingProps {
  context: any;
  imageURL: string;
  chordValues: string;
}
