import { Injectable } from '@angular/core';

import { AdminApiService } from './core/admin-api.service';
import { AuthResponse } from '../models/AuthResponse.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private api: AdminApiService) {}

    public saveDataInSessionStorage(data: AuthResponse) {
        sessionStorage.setItem('jwt', data.token);
        sessionStorage.setItem('expiration', data.expirationToken);
    }

    public clearDataInSessionStorage() {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('expiration');
    }

    public isLoggedIn() {
        return sessionStorage.getItem('jwt') != null;
    }

    public logout() {
        return this.api.request<boolean>({
            method: 'GET',
            path: 'auth/logout',
        });
    }
}
