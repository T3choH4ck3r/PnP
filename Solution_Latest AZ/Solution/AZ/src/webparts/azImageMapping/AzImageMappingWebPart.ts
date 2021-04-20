import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { sp } from "@pnp/sp/presets/all";
import * as strings from 'AzImageMappingWebPartStrings';
import AzImageMapping from './components/AzImageMapping';
import { IAzImageMappingProps } from './components/IAzImageMappingProps';

export interface IAzImageMappingWebPartProps {
  context: any;
  imageURL: string;
  chordValues: string;
}

export default class AzImageMappingWebPart extends BaseClientSideWebPart<IAzImageMappingWebPartProps> {

  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IAzImageMappingProps> = React.createElement(
      AzImageMapping,
      {
        context : this.context,
        imageURL: this.properties.imageURL?this.properties.imageURL:"",
        chordValues: this.properties.chordValues?this.properties.chordValues:'[{"name": "Pre-Cycle 1", "title": "Pre-Cycle 1", "shape": "poly", "coords": [160,154,154,167,168,166,160,182], "href": "https://azcollaboration.sharepoint.com/sites/TSM266/SitePages/AccordionDM.aspx?level=0", "target": "_self" }]'
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
                PropertyPaneTextField('imageURL', {
                  label: strings.imageURLFieldLabel
                }),
                PropertyPaneTextField('chordValues', {
                  label: strings.chordValues
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
