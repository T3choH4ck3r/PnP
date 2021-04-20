import { IList } from "office-ui-fabric-react";

export interface IAZQuickLinksListOperationalState{
    addText: string;
    updateText: IListItem[]; 
}
export interface IListItem {
    id: number;
    title: string;
  }