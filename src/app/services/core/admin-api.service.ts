import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CustomResponse } from 'src/app/data/api/CustomResponse';

import { OptionRequest } from 'src/app/data/api/OptionRequest';
import { ResponseAdmin } from 'src/app/data/api/ResponseAdmin';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AdminApiService {
    URL: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    get<T extends Object>(
        req: OptionRequest<T>
    ): Observable<CustomResponse<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            }),
            observe: 'response' as 'body',
            params: new HttpParams({ fromObject: req.params }),
        };

        return this.httpClient.get(`${this.URL}/${req.path}`, httpOptions).pipe(
            map((response: any) => this.ResponseData<T>(response)),
            catchError(this.handleError)
        );
    }

    post<T extends Object>(
        req: OptionRequest<T>
    ): Observable<CustomResponse<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            observe: 'response' as 'body',
        };

        return this.httpClient
            .post(`${this.URL}/${req.path}`, req.data, httpOptions)
            .pipe(
                map((response: any) => this.ResponseData<T>(response)),
                catchError(this.handleError)
            );
    }

    put<T extends Object>(
        req: OptionRequest<T>
    ): Observable<CustomResponse<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            observe: 'response' as 'body',
        };

        return this.httpClient
            .put(`${this.URL}/${req.path}`, req.data, httpOptions)
            .pipe(
                map((response: any) => this.ResponseData<T>(response)),
                catchError(this.handleError)
            );
    }

    delete<T extends Object>(
        req: OptionRequest<T>
    ): Observable<CustomResponse<T>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            observe: 'response' as 'body',
        };

        return this.httpClient
            .delete(`${this.URL}/${req.path}`, httpOptions)
            .pipe(
                map((response: any) => this.ResponseData<T>(response)),
                catchError(this.handleError)
            );
    }

    private ResponseData<M extends Object>(response: any): CustomResponse<M> {
        const data: ResponseAdmin<M> = response.body as ResponseAdmin<M>;

        if (['200', '201'].includes(data.statusCode)) {
            return {
                isError: false,
                isSuccess: true,
                message: data.statusMessage,
                data: data.response.content,
                page: {
                    number: data.response.number + 1,
                    numberOfElements: data.response.numberOfElements,
                    size: data.response.size,
                    totalElements: data.response.totalElements,
                    totalPages: data.response.totalPages,
                },
            };
        } else {
            return {
                isError: true,
                isSuccess: false,
                message: data.statusMessage,
            };
        }
    }

    private handleError(error: HttpErrorResponse) {
        console.log('[Error] ', error);
        return throwError(() => error.error.response || 'Ocurrio un error');
    }
}
