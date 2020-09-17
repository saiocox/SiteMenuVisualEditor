import {Component, Inject, OnInit} from '@angular/core';
import {APP_CONFIG, AppConfig} from "./app-config.module";
import {SiteMenuService} from "./_services/site-menu.service";
import {catchError, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ISiteMenu} from "./Models/isite-menu";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'VisualEditor';
    AllSiteMenus: AllSiteMenus;
    selectedSiteMenu: ISiteMenu;
    constructor(@Inject(APP_CONFIG) private config: AppConfig, private siteMenuService: SiteMenuService) {
        this.AllSiteMenus = new AllSiteMenus();
    }

    ngOnInit() {
        this.loadSiteMenus();
    }

    public addNewMenu(): void {

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
