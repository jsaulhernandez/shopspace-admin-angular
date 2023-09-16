import { Component, OnInit, inject } from '@angular/core';
import { CustomHeader } from 'src/app/core/utils/components.util';
import { CustomPagination } from 'src/app/data/api/CustomResponse';
import { CustomerModel } from 'src/app/data/models/Customer.model';
import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
    api$ = inject(AdminApiService);

    isLoading = this.loader$.loading$;
    customers: CustomerModel[] = [];
    pagination?: CustomPagination;
    search: string = '';
    currentPage: number = 0;

    customHeader: CustomHeader<CustomerModel>[] = [
        {
            title: 'Name',
            render: (data) => `${data.firstName} ${data.lastName}`,
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'City',
            dataIndex: 'city',
        },
        {
            title: 'ZipCode',
            dataIndex: 'zipCode',
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
        },
        {
            title: 'Accepted terms',
            render: (data) => (data.terms === 1 ? 'Yes' : 'No'),
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
            .request<CustomerModel[]>({
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
