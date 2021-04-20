import { IDropdownOption } from "office-ui-fabric-react";

export interface IAZQuickLinksListState {
    LinksDetails: LinksDetails[],
    IsLoading: boolean,
    ListName: string
}

export class LinksDetails {
    public Title?: string;
    public LinkURL?: string;
    public IconName?: string;
}
