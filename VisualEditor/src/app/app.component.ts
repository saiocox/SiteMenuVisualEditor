import {Component, Inject, OnInit} from '@angular/core';
import {APP_CONFIG, AppConfig} from "./app-config.module";
import {SiteMenuService} from "./_services/site-menu.service";
import {catchError, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ISiteMenu} from "./Models/isite-menu";
import {SiteMenu} from "./Models/site-menu";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'VisualEditor';
    AllSiteMenus: AllSiteMenus;
    windowState: string; // newMenu, editMenu
    newSiteMenu: ISiteMenu;
    newSiteMenuCreated: boolean;
    newSiteMenuCreateMsg: string;
    selectedSiteMenu: ISiteMenu;
    constructor(@Inject(APP_CONFIG) private config: AppConfig, private siteMenuService: SiteMenuService) {
        this.AllSiteMenus = new AllSiteMenus();
        this.newSiteMenu = new SiteMenu();
    }

    ngOnInit() {
        this.loadSiteMenus();
    }

    public addNewMenu(): void {
        if (this.windowState == 'newMenu') {
            this.windowState = '';
        }else {
            this.windowState = 'newMenu';
            if (this.newSiteMenu==null) {
                //this.newSiteMenu = new SiteMenu();
            }
        }
    }

    public saveNewMenu(): void {
        console.log ("newSiteMenu: ", this.newSiteMenu);
        this.siteMenuService.postSiteMenu(this.newSiteMenu).subscribe(response => {
                console.log ("Create: ", response);
                this.newSiteMenuCreated = true;
                this.newSiteMenuCreateMsg = response.message;
            },
            error => {
                console.log (error);
                this.newSiteMenuCreated = false;
                // this.newSiteMenuCreateMsg = error.message;
            })
    }

    public loadSiteMenus(): void {
        if (this.AllSiteMenus.Loading === false || this.AllSiteMenus.Loading == null) {
            this.AllSiteMenus.Loading = true;
            this.AllSiteMenus.HasRequestError = false;
            const AdditionalParams = [];
            AdditionalParams['pageNumber'] = this.AllSiteMenus.CurrentPage;
            AdditionalParams['pageSize'] = 10;
            if (this.AllSiteMenus.Search != null && this.AllSiteMenus.Search !== '') {
                AdditionalParams['search'] = this.AllSiteMenus.Search;
            }
            this.siteMenuService.getSiteMenus(AdditionalParams)
                .pipe(
                    tap(response =>{}, error => console.log(error)),
                    catchError((error:any) => {
                        this.AllSiteMenus.Loaded = false;
                        this.AllSiteMenus.Loading = false;
                        return Observable.throw(error);
                    })
                )
                .subscribe(results => {
                        this.AllSiteMenus.Data = results;
                        console.log("Sitemenus ready! ", results);
                        if (results.data!=undefined){
                            this.AllSiteMenus.SiteMenus = results.data;
                            this.AllSiteMenus.Loaded = true;
                        }
                        this.AllSiteMenus.Loading = false;
                    },
                    error => {
                        this.AllSiteMenus.SiteMenus = [];
                        this.AllSiteMenus.Loaded = false;
                        this.AllSiteMenus.Loading = false;
                    });
        }
    }

    loadSiteMenu(siteMenu: ISiteMenu) {
        this.selectedSiteMenu = siteMenu;
        this.windowState = 'editMenu';
    }
}

class AllSiteMenus {
    Data?: any
    SiteMenus?: ISiteMenu[]
    Loaded: boolean;
    Loading = false;
    CurrentPage = 1;
    HasRequestError = false;
    RequestError: any;
    RequestStatus: number;
    Search: string;
}
