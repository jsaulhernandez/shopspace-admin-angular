import { Component, OnInit, inject } from '@angular/core';

import { PaymentMethodModel } from 'src/app/data/models/PaymentMethod.model';

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { CustomPagination } from 'src/app/data/api/CustomResponse';

import {
    ModalActionsType,
    ShowComponent,
    UserActions,
} from 'src/app/data/constants/constants';
import { CustomHeader } from 'src/app/core/utils/components.util';

@Component({
    selector: 'app-payment-method',
    templateUrl: './payment-method.component.html',
    styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit {
    api$ = inject(AdminApiService);

    isLoading = this.loader$.loading$;
    paymentMethods: PaymentMethodModel[] = [];
    pagination?: CustomPagination;
    search: string = '';
    currentPage: number = 0;

    //modal
    open: boolean = false;
    typeModal: ModalActionsType = 'confirm';
    textModal: string = '';
    userAction: UserActions = 'save';
    showingComponent: ShowComponent = 'Table';
    pivote?: PaymentMethodModel;

    customHeader: CustomHeader<PaymentMethodModel>[] = [
        {
            title: 'Method',
            dataIndex: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            element: 'switch',
            onClickElement: (data, value) => this.onUpdateStatus(data, value),
        },
        {
            title: 'Credit or Debit card',
            render: (data) => (data.isCreditDebitCard ? 'Yes' : 'No'),
        },
        {
            title: 'Actions',
            element: 'actions',
            onClickElement: (data, _) =>
                this.onAddPaymentMethod(data, false, 'update'),
            onSecondClickElement: (data, _) => this.onDelete(data),
        },
    ];

    constructor(
        private loader$: LoaderService,
        private notification$: NotificationService
    ) {}

    ngOnInit(): void {
        this.getCategories();
    }

    async getCategories(search = '', page = '0', size = '10') {
        this.loader$.show();
        this.api$
            .request<PaymentMethodModel[]>({
                method: 'GET',
                path: 'payment-method/paged',
                params: {
                    search,
                    page,
                    size,
                },
            })
            .subscribe({
                next: (c) => {
                    this.paymentMethods = c.data || [];
                    this.pagination = c.page;
                },
                error: (e) => {
                    this.loader$.hide();
                    this.paymentMethods = [];
                },
                complete: () => this.loader$.hide(),
            });
    }

    onChangeValueInput(value: string) {
        this.search = value;
        this.getCategories(value);
    }

    onChangePagination(page: number) {
        this.currentPage = page;
        this.getCategories(this.search, page.toString());
    }

    onUpdateStatus(data: PaymentMethodModel, value: boolean) {
        this.loader$.show();

        data = {
            ...data,
            status: value ? 1 : 0,
        };

        this.api$
            .request({
                method: 'PUT',
                path: `payment-method/${data.id}`,
                data,
            })
            .subscribe({
                next: (c) => {
                    this.getCategories(
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
                        'Payment method status update'
                    );
                    this.loader$.hide();
                },
            });
    }

    onAddPaymentMethod(
        record?: PaymentMethodModel,
        isSaved = false,
        userAction: UserActions = 'save'
    ) {
        if (!isSaved) {
            this.pivote = record;
            this.showingComponent = 'Form';
            this.userAction = userAction;
        } else {
            if (record) this.pivote = { ...record };

            this.textModal = `¿Do you want to ${
                this.userAction === 'save' ? 'save' : 'update'
            } the payment method ${record?.name}?`;
            this.typeModal = 'confirm';
            this.open = true;
        }
    }

    onDelete(data: PaymentMethodModel) {
        this.pivote = data;
        this.textModal = '¿Are you sure to delete the data?';
        this.typeModal = 'confirm';
        this.userAction = 'delete';
        this.open = true;
    }

    onClose(action: 'modal' | 'form') {
        if (action === 'modal') {
            this.open = false;
        } else {
            this.pivote = undefined;
            this.showingComponent = 'Table';
        }
    }

    onConfirm() {
        this.loader$.show();

        if (this.userAction === 'save' || this.userAction === 'update') {
            const path = `payment-method${
                this.userAction === 'update' ? '/' + this.pivote?.id : ''
            }`;

            this.api$
                .request({
                    method: this.userAction === 'save' ? 'POST' : 'PUT',
                    path: path,
                    data: this.pivote,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = `Data has been ${
                            this.userAction === 'save' ? 'saved' : 'updated'
                        } successfully`;
                        this.typeModal = 'success';
                        this.pivote = undefined;

                        this.getCategories();
                        this.showingComponent = 'Table';
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = `Error occurred when ${
                            this.userAction === 'save' ? 'saving' : 'updating'
                        } the payment method ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }

        if (this.userAction === 'delete') {
            this.api$
                .request({
                    method: 'DELETE',
                    path: `payment-method/${this.pivote?.id}`,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = 'Data has been removed successfully';
                        this.typeModal = 'success';
                        this.pivote = undefined;

                        this.getCategories();
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = `Error occurred when removing the payment method ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }
    }
}
