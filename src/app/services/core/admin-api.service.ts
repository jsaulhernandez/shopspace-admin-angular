import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { OptionRequest } from 'src/app/data/api/OptionRequest';
import { ResponseAdmin } from 'src/app/data/api/ResponseAdmin';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AdminApiService {
    URL: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    get<T extends Object>(req: OptionRequest<T>): Observable<ResponseAdmin<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
            }),
            observe: 'response' as 'body',
            params: new HttpParams(req.params),
        };

        return this.httpClient.get(`${this.URL}/${req.path}`, httpOptions).pipe(
            map((response: any) => this.ResponseData(response)),
            catchError(this.handleError)
        );
    }

    post<T extends Object>(
        req: OptionRequest<T>
    ): Observable<ResponseAdmin<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            observe: 'response' as 'body',
        };

        return this.httpClient
            .post(`${this.URL}/${req.path}`, req.data, httpOptions)
            .pipe(
                map((response: any) => this.ResponseData(response)),
                catchError(this.handleError)
            );
    }

    put<T extends Object>(req: OptionRequest<T>): Observable<ResponseAdmin<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            observe: 'response' as 'body',
        };

        return this.httpClient
            .put(`${this.URL}/${req.path}`, req.data, httpOptions)
            .pipe(
                map((response: any) => this.ResponseData(response)),
                catchError(this.handleError)
            );
    }

    delete<T extends Object>(
        req: OptionRequest<T>
    ): Observable<ResponseAdmin<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            observe: 'response' as 'body',
        };

        return this.httpClient
            .delete(`${this.URL}/${req.path}`, httpOptions)
            .pipe(
                map((response: any) => this.ResponseData(response)),
                catchError(this.handleError)
            );
    }

    private ResponseData(response: any) {
        console.log('response', response);
        return response;
    }

    private handleError(error: HttpErrorResponse) {
        console.log('[Error] ', error);
        return throwError(() => error.error.response || 'Ocurrio un error');
    }
}
