import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AzQuickLinksWebPartStrings';
import AzQuickLinks from './components/AzQuickLinks';
import { IAzQuickLinksProps } from './components/IAzQuickLinksProps';

import { sp } from "@pnp/sp/presets/all";
import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';

export interface IAzQuickLinksWebPartProps {
  context: any;
  linksListURL: string;
  listName: string;
}

export default class AzQuickLinksWebPart extends BaseClientSideWebPart<IAzQuickLinksWebPartProps> {

  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {    
    const element: React.ReactElement<IAzQuickLinksProps> = React.createElement(
      AzQuickLinks,
      {
        context: this.context,
        linksListURL: this.properties.linksListURL,
        listName : this.properties.listName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('linksListURL', {
                  label: strings.LinksListFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.LinksListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
