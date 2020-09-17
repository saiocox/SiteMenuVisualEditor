import {ISiteMenu} from "./isite-menu";

export class SiteMenu implements ISiteMenu {
    id: number;
    title: string;
    placement_name: string;
    parent_id: number;
    about: string;
    is_submenu: boolean;
    created_at: string;
    updated_at: string;
}
