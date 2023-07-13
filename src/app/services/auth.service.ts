import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AdminApiService } from './core/admin-api.service';

import { OptionRequest } from '../data/api/OptionRequest';
import { CustomResponse } from '../data/api/CustomResponse';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private api: AdminApiService) {}

    public useRequestAuth<T extends Object>(
        req: OptionRequest<T>
    ): Observable<CustomResponse<T>> {
        if (req.method === 'POST') return this.api.post<T>(req);
        if (req.method === 'PUT') return this.api.put<T>(req);
        if (req.method === 'DELETE') return this.api.delete<T>(req);
        return this.api.get<T>(req);
    }

    public isLoggedIn() {
        return sessionStorage.getItem('jwt') != null;
    }

    public logout() {
        return this.api.get<boolean>({
            method: 'GET',
            path: 'auth/logout',
        });
    }
}
