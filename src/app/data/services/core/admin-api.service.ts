import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { ResponseAdmin } from '../../interface/ResponseAdmin';

@Injectable({
    providedIn: 'root',
})
export class AdminApiService {
    constructor(private httpClient: HttpClient) {}

    get<T extends Object>(
        url: string,
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

        return this.httpClient.get(url, httpOptions).pipe(
            map((response: any) => this.ResponseData(response)),
            catchError(this.handleError)
        );
    }

    post<T extends Object>(
        url: string,
        model: T
    ): Observable<ResponseAdmin<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            observe: 'response' as 'body',
        };

        return this.httpClient.post(url, model, httpOptions).pipe(
            map((response: any) => this.ResponseData(response)),
            catchError(this.handleError)
        );
    }

    put<T extends Object>(url: string, model: T): Observable<ResponseAdmin<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            observe: 'response' as 'body',
        };

        return this.httpClient.put(url, model, httpOptions).pipe(
            map((response: any) => this.ResponseData(response)),
            catchError(this.handleError)
        );
    }

    delete<T extends Object>(url: string): Observable<ResponseAdmin<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            observe: 'response' as 'body',
        };

        return this.httpClient.delete(url, httpOptions).pipe(
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
