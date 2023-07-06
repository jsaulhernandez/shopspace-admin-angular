import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AdminApiService } from './core/admin-api.service';
import { ResponseAdmin } from '../data/api/ResponseAdmin';
import { OptionRequest } from '../data/api/OptionRequest';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private api: AdminApiService) {}

    public getAllCategories<T extends Object>(
        req: OptionRequest<T>
    ): Observable<ResponseAdmin<T>> {
        return this.api.get<T>(req);
    }
}
