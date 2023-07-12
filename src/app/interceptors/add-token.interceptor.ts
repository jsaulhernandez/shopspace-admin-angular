import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const token = sessionStorage.getItem('jwt');
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

        return next.handle(request);
    }
}
