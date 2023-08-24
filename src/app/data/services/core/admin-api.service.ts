import {
    HttpClient,
    HttpErrorResponse,
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

    request<T = unknown>(req: OptionRequest<T>): Observable<CustomResponse<T>> {
        const httpOptions = {
            body: req.data,
            observe: 'response' as 'body',
            params: new HttpParams({ fromObject: req.params }),
        };

        return this.httpClient
            .request(req.method, `${this.URL}/${req.path}`, httpOptions)
            .pipe(
                map((response: any) => this.ResponseData<T>(response)),
                catchError(this.handleError)
            );
    }

    private ResponseData<R = unknown>(response: any): CustomResponse<R> {
        const data: ResponseAdmin<R> = response.body as ResponseAdmin<R>;

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
