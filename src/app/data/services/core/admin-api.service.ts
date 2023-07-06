import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ResponseAdmin } from '../../interface/ResponseAdmin';

@Injectable({
    providedIn: 'root',
})
export class AdminApiService {
    URL: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    get<T extends Object>(
        path: string,
        params?: Object
    ): Observable<ResponseAdmin<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
            }),
            observe: 'response' as 'body',
            params: new HttpParams(params),
        };

        return this.httpClient.get(`${this.URL}/${path}`, httpOptions).pipe(
            map((response: any) => this.ResponseData(response)),
            catchError(this.handleError)
        );
    }

    post<T extends Object>(
        path: string,
        model: T
    ): Observable<ResponseAdmin<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            observe: 'response' as 'body',
        };

        return this.httpClient
            .post(`${this.URL}/${path}`, model, httpOptions)
            .pipe(
                map((response: any) => this.ResponseData(response)),
                catchError(this.handleError)
            );
    }

    put<T extends Object>(
        path: string,
        model: T
    ): Observable<ResponseAdmin<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            observe: 'response' as 'body',
        };

        return this.httpClient
            .put(`${this.URL}/${path}`, model, httpOptions)
            .pipe(
                map((response: any) => this.ResponseData(response)),
                catchError(this.handleError)
            );
    }

    delete<T extends Object>(path: string): Observable<ResponseAdmin<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            observe: 'response' as 'body',
        };

        return this.httpClient.delete(`${this.URL}/${path}`, httpOptions).pipe(
            map((response: any) => this.ResponseData(response)),
            catchError(this.handleError)
        );
    }

    private ResponseData(response: any) {
        console.log('response', response);
        return response;
    }

    private handleError(error: any) {
        console.log('[Error] ', error);
        return throwError(() => new Error(error));
    }
}
