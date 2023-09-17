import { Component, OnInit, inject } from '@angular/core';

import { UserAdminModel } from 'src/app/data/models/UserAdmin.model';

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { CustomPagination } from 'src/app/data/api/CustomResponse';

import { CustomHeader } from 'src/app/core/utils/components.util';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    api$ = inject(AdminApiService);

    isLoading = this.loader$.loading$;
    users: UserAdminModel[] = [];
    pagination?: CustomPagination;
    search: string = '';
    currentPage: number = 0;

    customHeader: CustomHeader<UserAdminModel>[] = [
        {
            title: 'Code',
            dataIndex: 'code',
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            element: 'switch',
            onClickElement: (data, value) => this.onUpdateStatus(data, value),
        },
    ];

    constructor(
        private loader$: LoaderService,
        private notification$: NotificationService
    ) {}

    ngOnInit(): void {
        this.getUsersAdmins();
    }

    async getUsersAdmins(search = '', page = '0', size = '10') {
        this.loader$.show();
        this.api$
            .request<UserAdminModel[]>({
                method: 'GET',
                path: 'user-admin/paged',
                params: {
                    search,
                    page,
                    size,
                },
            })
            .subscribe({
                next: (c) => {
                    this.users = c.data || [];
                    this.pagination = c.page;
                },
                error: (e) => {
                    this.loader$.hide();
                    this.users = [];
                },
                complete: () => this.loader$.hide(),
            });
    }

    onChangeValueInput(value: string) {
        this.search = value;
        this.getUsersAdmins(value);
    }

    onChangePagination(page: number) {
        this.currentPage = page;
        this.getUsersAdmins(this.search, page.toString());
    }

    onUpdateStatus(data: UserAdminModel, value: boolean) {
        this.loader$.show();

        data = {
            ...data,
            status: value ? 1 : 0,
            password: 'default',
        };

        this.api$
            .request({
                method: 'PUT',
                path: `user-admin/${data.id}`,
                data,
            })
            .subscribe({
                next: (c) => {
                    this.getUsersAdmins(
                        this.search,
                        this.currentPage.toString()
                    );
                },
                error: (e) => {
                    this.notification$.onNotification(
                        'error',
                        'Error occurred when updating status'
                    );
                    this.loader$.hide();
                },
                complete: () => {
                    this.notification$.onNotification(
                        'success',
                        'User status update'
                    );
                    this.loader$.hide();
                },
            });
    }
}
