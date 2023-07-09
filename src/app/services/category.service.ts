import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AdminApiService } from './core/admin-api.service';
import { OptionRequest } from '../data/api/OptionRequest';
import { CustomResponse } from '../data/api/CustomResponse';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private api: AdminApiService) {}

    public getAllCategories<T extends Object>(
        req: OptionRequest<T>
    ): Observable<CustomResponse<T>> {
        return this.api.get<T>(req);
    }
}
