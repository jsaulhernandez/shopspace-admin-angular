import { Component, OnInit, inject } from '@angular/core';
import { format, parseISO } from 'date-fns';

import { UserCustomerModel } from 'src/app/data/models/UserCustomer.model';

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

import { CustomPagination } from 'src/app/data/api/CustomResponse';

import { CustomHeader, ParentHeader } from 'src/app/core/utils/components.util';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
    api$ = inject(AdminApiService);

    isLoading = this.loader$.loading$;
    customers: UserCustomerModel[] = [];
    pagination?: CustomPagination;
    search: string = '';
    currentPage: number = 0;

    parentHeader: ParentHeader[] = [
        { description: 'Customer data', colspan: 7 },
        { description: 'User data', colspan: 5 },
        { description: 'Actions', colspan: 1 },
    ];

    customHeader: CustomHeader<UserCustomerModel>[] = [
        {
            title: 'Name',
            render: (data) =>
                `${data.customer.firstName} ${data.customer.lastName}`,
        },
        {
            title: 'Email',
            render: (data) => data.customer.email ?? 'n/a',
        },
        {
            title: 'Address',
            render: (data) => data.customer.address ?? 'n/a',
        },
        {
            title: 'City',
            render: (data) => data.customer.city ?? 'n/a',
        },
        {
            title: 'ZipCode',
            render: (data) => data.customer.zipCode ?? 'n/a',
        },
        {
            title: 'Mobile',
            render: (data) => data.customer.mobile ?? 'n/a',
        },
        {
            title: 'Accepted terms',
            render: (data) => (data.customer.terms === 1 ? 'Yes' : 'No'),
        },
        {
            title: 'User name',
            dataIndex: 'userName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            element: 'switch',
            onClickElement: (data, value) => {},
        },
        {
            title: 'Created at',
            render: (data) =>
                format(parseISO(data.createdAt.toString()), 'yyyy/MM/dd') ??
                'n/a',
        },
        {
            title: 'Updated at',
            render: (data) =>
                format(parseISO(data.updatedAt.toString()), 'yyyy/MM/dd') ??
                'n/a',
        },
        {
            title: 'Verified email',
            render: (data) => (data.verifiedEmail === 1 ? 'Yes' : 'No'),
        },
        {
            title: 'Show sells',
            element: 'button',
            icon: 'eye',
            onClickElement: (data) => {},
        },
    ];

    constructor(private loader$: LoaderService) {}

    ngOnInit(): void {
        this.getCustomers();
    }

    async getCustomers(search = '', page = '0', size = '10') {
        this.loader$.show();
        this.api$
            .request<UserCustomerModel[]>({
                method: 'GET',
                path: 'customer/paged',
                params: {
                    search,
                    page,
                    size,
                },
            })
            .subscribe({
                next: (c) => {
                    this.customers = c.data || [];
                    this.pagination = c.page;
                },
                error: (e) => {
                    this.loader$.hide();
                    this.customers = [];
                },
                complete: () => this.loader$.hide(),
            });
    }

    onChangeValueInput(value: string) {
        this.search = value;
        this.getCustomers(value);
    }

    onChangePagination(page: number) {
        this.currentPage = page;
        this.getCustomers(this.search, page.toString());
    }
}
