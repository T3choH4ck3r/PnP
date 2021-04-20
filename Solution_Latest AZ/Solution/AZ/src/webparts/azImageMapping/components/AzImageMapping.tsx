import * as React from 'react';
import styles from './AzImageMapping.module.scss';
import { IAzImageMappingProps } from './IAzImageMappingProps';
import { constant, escape } from '@microsoft/sp-lodash-subset';
import ImageMapper from 'react-image-mapper';
import { IAzImageMappingWebPartProps } from '../AzImageMappingWebPart';
import {IAzImageMappingState} from './IAzImageMappingStates';

export default class AzImageMapping extends React.Component<IAzImageMappingProps, IAzImageMappingState> {
  
  constructor(props: IAzImageMappingProps, state: IAzImageMappingState) {
    super(props);
    this.state = {
      imageURL : "",
      chordValues:""
    };
  }



  public render(): React.ReactElement<IAzImageMappingProps> {
   // let URL = "https://azcollaborationtst.sharepoint.com/:i:/r/sites/BDPPortal/Images1/Development%20Milestones%20Image%20Map.PNG";
    // let MAP = {
    //   name: "my-map",
    //   areas: [
    //     { name: "Pre-Cycle 1", title: "Pre-Cycle 1", shape: "poly", coords: [160,154,154,167,168,166,160,182], href: "https://azcollaboration.sharepoint.com/sites/TSM266/SitePages/AccordionDM.aspx?level=0", target: "_self" },
    //     { name: "Pre-Cycle 1", title: "Pre-Cycle 1", shape: "poly", coords: [216,217,210,230,216,242,225,227], href: "https://azcollaboration.sharepoint.com/sites/TSM266/SitePages/AccordionDM.aspx?level=1", target: "_self" },
    //     { name: "Pre-Cycle 1", title: "Pre-Cycle 1", shape: "poly", coords: [278,151,285,167,277,181,268,169], href: "https://azcollaboration.sharepoint.com/sites/TSM266/SitePages/AccordionDM.aspx?level=2", target: "_self" },
    //     { name: "Pre-Cycle 1", title: "Pre-Cycle 1", shape: "poly", coords: [395,156,402,169,393,181,387,171], href: "https://azcollaboration.sharepoint.com/sites/TSM266/SitePages/AccordionDM.aspx?level=3", target: "_self" },
    //     { name: "Pre-Cycle 1", title: "Pre-Cycle 1", shape: "poly", coords: [493,152,500,167,492,183,486,168], href: "https://azcollaboration.sharepoint.com/sites/TSM266/SitePages/AccordionDM.aspx?level=4", target: "_self" },
    //     { name: "Pre-Cycle 1", title: "Pre-Cycle 1", shape: "poly", coords: [594,157,584,168,602,170,594,183], href: "https://azcollaboration.sharepoint.com/sites/TSM266/SitePages/AccordionDM.aspx?level=5", target: "_self" },
    //   ]
    // }
    let MAP = {
      name: "my-map",
      areas: JSON.parse(this.props.chordValues)
    }

    return (
      <div>
        <ImageMapper src={this.props.imageURL} map={MAP}></ImageMapper>
      </div>
    );
  }

  
  public componentDidMount(): void {
    if (this.props.imageURL)
      this.GetImage();
  }

  private GetImage(){
    let imageUrl:string = this.props.imageURL;
    let chordsValue = this.props.chordValues;

    this.setState({imageURL: this.props.imageURL, chordValues : this.props.chordValues});
  }

}