import * as React from 'react';
import styles from './AzQuickLinks.module.scss';
import { IAzQuickLinksProps } from './IAzQuickLinksProps';
import { IAZQuickLinksListState, LinksDetails } from './IAZQuickLinksStates';
import { escape } from '@microsoft/sp-lodash-subset';
import { ListNames } from '../Constants/ListNames';
import { sp } from '@pnp/sp';
import { PermissionKind } from "@pnp/sp/security";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/security";
import { Button } from 'office-ui-fabric-react/lib/components/Button/Button';
import { Checkbox, Dialog, DialogContent, DialogFooter, DialogType, Dropdown, IDropdown, IDropdownOption, Label, PrimaryButton } from 'office-ui-fabric-react';
import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';
import { IWeb, Web } from '@pnp/sp/webs';
import { Site } from '@pnp/sp/sites';
import { Icon } from 'office-ui-fabric-react/lib/Icon';


export default class AzQuickLinks extends React.Component<IAzQuickLinksProps, IAZQuickLinksListState> {

  constructor(props: IAzQuickLinksProps, state: IAZQuickLinksListState) {
    super(props);
    this.state = {
      LinksDetails: [],
      IsLoading: true,
      ListName : ""
    };
  }

  public render(): React.ReactElement<IAzQuickLinksProps> {
    return (
      <div className={styles.azQuickLinks}>
        <div className={styles.container}>
          {
            !this.state.IsLoading && <div>
              <div className={styles.webpartTitle}>{this.state.ListName}</div>
              {this.state.LinksDetails && this.state.LinksDetails.map(itm => {
                return <div className={styles.spacing}><Icon className={styles.iconSize} iconName={itm.IconName!=null?itm.IconName:'PreviewLink'} /><a href={itm.LinkURL} className={styles.links +" "+ styles.quickLink}>{itm.Title}</a></div>;
              })}
            </div>
          }
        </div>
      </div>
    );
  }

  public componentDidMount(): void {
    if (this.props.linksListURL)
      this.GetLinks();
  }

  private GetLinks() {
    let oLinksListWeb: IWeb = Web(this.props.linksListURL);
    let listName :string = this.props.listName;
    //let oLinksListsite: string = this.props.linksListURL.toString(this.props.linksListURL);
    oLinksListWeb.lists.getByTitle(listName).items.filter("Status eq 'Active'").get().then(linksResult => {
      if (linksResult && linksResult.length > 0) {
        let arrLinks: LinksDetails[] = [];
        for (let i: number = 0; i < linksResult.length; i++) {
          arrLinks.push({
            Title: linksResult[i].Title,
            LinkURL: linksResult[i].URL.Url,
            IconName: linksResult[i].IconName
          })
        }
        this.setState({ IsLoading: false, LinksDetails: arrLinks, ListName: this.props.listName });
      }
    }).catch(console.log);
  }
}