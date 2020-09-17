import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, AppConfig} from '../app-config.module';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {SiteMenu} from "../Models/site-menu";
import {ISiteMenu} from "../Models/isite-menu";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SiteMenuService {
    private API_URL: string;
    private baseEndpoint: string;

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: AppConfig) {

      this.API_URL = this.config.apiEndpoint;
      this.baseEndpoint = this.config.apiEndpoint+"admin/sitemenus";
  }

    getSiteMenus (AdditionalParams: object): Observable<SiteMenusResponse> {
        console.log ('Calling: ' + this.baseEndpoint + ' with: ');
        console.log (AdditionalParams);
        let params = new HttpParams();
        for (var key in AdditionalParams) {
            params = params.append(key, AdditionalParams[key]);
        }
        const options = { params: params };
        return this.http.get<any>(this.baseEndpoint, options)
            .pipe(
                tap(sitemenus => console.log('fetched site menus', sitemenus), error => console.log(error)),
                catchError(this.handleError('getProperties', []))
            );
    }

    getSiteMenu (menuId: number): Observable<SiteMenuResponse> {
        console.log ('Calling: ' + this.baseEndpoint + menuId);
        const options = { };
        return this.http.get<any>(this.baseEndpoint + '/' + menuId, options)
            .pipe(
                tap(sitemenu => console.log('fetched sitemenu' + sitemenu), error => console.log(error)),
                catchError(this.handleError('getSiteMenu', []))
            );
    }

    postSiteMenu (siteMenu: SiteMenu): Observable<any> {
        return this.http.post<SiteMenu>(this.baseEndpoint, siteMenu, httpOptions).pipe(
            tap((j: SiteMenu) => console.log(`added property w/ id=${j.id}`)),
            catchError(this.handleError<SiteMenu>('addProperty'))
        );
    }

    public deleteSiteMenu (siteMenuId: number): Observable<any> {
        const url = `${this.baseEndpoint}/${siteMenuId}`;
        return this.http.delete<any>(url, httpOptions).pipe(
            tap(_ => console.log(`deleted sitemenu id=${siteMenuId}`)),
            catchError(this.handleError<any>('deleteSiteMenu'))
        );
    }

    public updateSiteMenu (id: number, siteMenu: SiteMenu): Observable<any> {
        let url = this.baseEndpoint+'/'+id;
        return this.http.put(url, siteMenu, httpOptions).pipe(
            tap(_ => console.log(`updated sitemenu`)),
            catchError(this.handleError<any>('updateSiteMenu'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            // this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            // return of(result as T);

            return throwError(error);
        };
    }
}


interface SiteMenusResponse {
    current_page: number;
    data: any[],
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

interface SiteMenuResponse extends ISiteMenu {

}