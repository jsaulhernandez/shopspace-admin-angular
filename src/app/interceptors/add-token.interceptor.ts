import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpProgressEvent,
    HttpHeaderResponse,
    HttpSentEvent,
    HttpErrorResponse,
    HttpUserEvent,
} from '@angular/common/http';
import { Router } from '@angular/router';
import {
    BehaviorSubject,
    Observable,
    catchError,
    filter,
    finalize,
    switchMap,
    take,
    throwError,
} from 'rxjs';

import { AdminApiService } from '../services/core/admin-api.service';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../data/models/AuthResponse.model';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
        string | null
    >(null);

    constructor(
        private _core: AdminApiService,
        private _auth: AuthService,
        private router: Router
    ) {}

    setTokenHeaders(
        request: HttpRequest<unknown>,
        token?: string | null
    ): HttpRequest<unknown> {
        const headers = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        };

        if (token) {
            request = request.clone({
                setHeaders: { ...headers, Authorization: `Bearer ${token}` },
            });
        } else {
            request = request.clone({
                setHeaders: headers,
            });
        }

        return request;
    }

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<
        | HttpSentEvent
        | HttpHeaderResponse
        | HttpProgressEvent
        | HttpResponse<any>
        | HttpUserEvent<any>
        | HttpEvent<unknown>
    > {
        const token = sessionStorage.getItem('jwt');

        return next.handle(this.setTokenHeaders(request, token)).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 400:
                            return this.handle400Error(error);
                        case 401:
                            return this.handle401Error(request, next);
                        default:
                            return throwError(() => error);
                    }
                } else {
                    return throwError(() => error);
                }
            })
        );
    }

    private handle401Error(request: HttpRequest<unknown>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.tokenSubject.next(null);

            return this._core
                .request<AuthResponse>({
                    method: 'GET',
                    path: 'auth/refresh-token',
                })
                .pipe(
                    switchMap((auth) => {
                        this.isRefreshing = false;
                        if (auth.data) {
                            this._auth.saveDataInSessionStorage(auth.data);
                            return next.handle(
                                this.setTokenHeaders(request, auth.data.token)
                            );
                        }

                        return next.handle(request);
                    }),
                    catchError((error) => {
                        return this.logoutUser();
                    }),
                    finalize(() => {
                        this.isRefreshing = false;
                    })
                );
        } else {
            return this.tokenSubject.pipe(
                filter((token) => token != null),
                take(1),
                switchMap((token) => {
                    return next.handle(this.setTokenHeaders(request, token));
                })
            );
        }
    }

    handle400Error(error: HttpErrorResponse) {
        if (
            error &&
            error.status === 400 &&
            error.error &&
            error.error.error === 'invalid_grant'
        ) {
            return this.logoutUser();
        }

        return throwError(() => error);
    }

    logoutUser() {
        this._auth.logout();
        this._auth.clearDataInSessionStorage();
        this.router.navigate(['/login']);
        return throwError(() => 'error');
    }
}
