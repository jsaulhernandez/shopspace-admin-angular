import { Component, OnInit, inject } from '@angular/core';
import { format, parseISO } from 'date-fns';

import { CouponModel } from 'src/app/data/models/Coupon.model';

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { CustomPagination } from 'src/app/data/api/CustomResponse';

import { CustomHeader } from 'src/app/core/utils/components.util';

import {
    ModalActionsType,
    ShowComponent,
    UserActions,
} from 'src/app/data/constants/constants';

@Component({
    selector: 'app-coupon',
    templateUrl: './coupon.component.html',
    styleUrls: ['./coupon.component.scss'],
})
export class CouponComponent implements OnInit {
    api$ = inject(AdminApiService);

    isLoading = this.loader$.loading$;
    coupons: CouponModel[] = [];
    pagination?: CustomPagination;
    search: string = '';
    currentPage: number = 0;

    //modal
    open: boolean = false;
    typeModal: ModalActionsType = 'confirm';
    textModal: string = '';
    userAction: UserActions = 'save';
    showingComponent: ShowComponent = 'Table';
    auxCoupon?: CouponModel;

    customHeader: CustomHeader<CouponModel>[] = [
        {
            title: 'Code',
            dataIndex: 'code',
        },
        {
            title: 'Off',
            render: (data) => data.off + '%' ?? 'n/a',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            element: 'switch',
            onClickElement: (data, value) => this.onUpdateStatus(data, value),
        },
        {
            title: 'Created at',
            render: (data) =>
                format(parseISO(data.createdAt.toString()), 'yyyy/MM/dd') ??
                'n/a',
        },
        {
            title: 'Expire at',
            render: (data) =>
                format(parseISO(data.expireAt.toString()), 'yyyy/MM/dd') ??
                'n/a',
        },
        {
            title: 'Actions',
            element: 'actions',
            onClickElement: (data, _) =>
                this.onAddCoupon(data, false, 'update'),
            onSecondClickElement: (data, _) => this.onDelete(data),
        },
    ];

    constructor(
        private loader$: LoaderService,
        private notification$: NotificationService
    ) {}

    ngOnInit(): void {
        this.getCoupons();
    }

    async getCoupons(search = '', page = '0', size = '10') {
        this.loader$.show();
        this.api$
            .request<CouponModel[]>({
                method: 'GET',
                path: 'coupon/paged',
                params: {
                    search,
                    page,
                    size,
                },
            })
            .subscribe({
                next: (c) => {
                    this.coupons = c.data || [];
                    this.pagination = c.page;
                },
                error: (e) => {
                    this.loader$.hide();
                    this.coupons = [];
                },
                complete: () => this.loader$.hide(),
            });
    }

    onChangeValueInput(value: string) {
        this.search = value;
        this.getCoupons(value);
    }

    onChangePagination(page: number) {
        this.currentPage = page;
        this.getCoupons(this.search, page.toString());
    }

    onUpdateStatus(data: CouponModel, value: boolean) {
        this.loader$.show();

        data = {
            ...data,
            status: value ? 1 : 0,
        };

        this.api$
            .request({
                method: 'PUT',
                path: `coupon/${data.id}`,
                data,
            })
            .subscribe({
                next: (c) => {
                    this.getCoupons(this.search, this.currentPage.toString());
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
                        'Coupon status update'
                    );
                    this.loader$.hide();
                },
            });
    }

    onAddCoupon(
        record?: CouponModel,
        isSaved = false,
        userAction: UserActions = 'save'
    ) {
        if (!isSaved) {
            this.auxCoupon = record;
            this.showingComponent = 'Form';
            this.userAction = userAction;
        } else {
            if (record) this.auxCoupon = { ...record };

            this.textModal = `¿Do you want to ${
                this.userAction === 'save' ? 'save' : 'update'
            } the coupon ${record?.code}?`;
            this.typeModal = 'confirm';
            this.open = true;
        }
    }

    onDelete(data: CouponModel) {
        this.auxCoupon = data;
        this.textModal = '¿Are you sure to delete the data?';
        this.typeModal = 'confirm';
        this.userAction = 'delete';
        this.open = true;
    }

    onClose(action: 'modal' | 'form') {
        if (action === 'modal') {
            this.open = false;
        } else {
            this.auxCoupon = undefined;
            this.showingComponent = 'Table';
        }
    }

    onConfirm() {
        this.loader$.show();

        if (this.userAction === 'save' || this.userAction === 'update') {
            const path = `coupon${
                this.userAction === 'update' ? '/' + this.auxCoupon?.id : ''
            }`;

            this.api$
                .request({
                    method: this.userAction === 'save' ? 'POST' : 'PUT',
                    path: path,
                    data: this.auxCoupon,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = `Data has been ${
                            this.userAction === 'save' ? 'saved' : 'updated'
                        } successfully`;
                        this.typeModal = 'success';
                        this.auxCoupon = undefined;

                        this.getCoupons();
                        this.showingComponent = 'Table';
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = `Error occurred when ${
                            this.userAction === 'save' ? 'saving' : 'updating'
                        } the coupon ${this.auxCoupon?.code}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }

        if (this.userAction === 'delete') {
            this.api$
                .request({
                    method: 'DELETE',
                    path: `coupon/${this.auxCoupon?.id}`,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = 'Data has been removed successfully';
                        this.typeModal = 'success';
                        this.auxCoupon = undefined;

                        this.getCoupons();
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = `Error occurred when removing the coupon ${this.auxCoupon?.code}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }
    }
}
