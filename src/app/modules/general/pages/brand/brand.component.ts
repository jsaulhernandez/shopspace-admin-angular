import { Component, OnInit, inject } from '@angular/core';

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { BrandModel } from 'src/app/data/models/Brand.model';
import { CustomPagination } from 'src/app/data/api/CustomResponse';

import {
    ModalActionsType,
    ShowComponent,
    UserActions,
} from 'src/app/data/constants/constants';
import { CustomHeader } from 'src/app/core/utils/components.util';

import { LoaderService } from 'src/app/shared/services/loader.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
    _brandService = inject(AdminApiService);

    isLoading = this.loader$.loading$;
    brands: BrandModel[] = [];
    pagination?: CustomPagination;
    search: string = '';
    currentPage: number = 0;

    //modal
    open: boolean = false;
    typeModal: ModalActionsType = 'confirm';
    textModal: string = '';
    userAction: UserActions = 'save';
    showingComponent: ShowComponent = 'Table';
    pivote?: BrandModel;

    customHeader: CustomHeader<BrandModel>[] = [
        {
            title: 'Image',
            dataIndex: 'image',
            element: 'image',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            element: 'switch',
            onClickElement: (data, value) => this.onUpdateStatus(data, value),
        },
        {
            title: 'Actions',
            element: 'actions',
            onClickElement: (data, _) => this.onAddBrand(data, false, 'update'),
            onSecondClickElement: (data, _) => this.onDelete(data),
        },
    ];

    constructor(
        private loader$: LoaderService,
        private notification$: NotificationService
    ) {}

    ngOnInit(): void {
        this.getBrands();
    }

    async getBrands(search = '', page = '0', size = '10') {
        this.loader$.show();
        this._brandService
            .request<BrandModel[]>({
                method: 'GET',
                path: 'brand/paged',
                params: {
                    search,
                    page,
                    size,
                },
            })
            .subscribe({
                next: (c) => {
                    this.brands = c.data || [];
                    this.pagination = c.page;
                },
                error: (e) => {
                    this.loader$.hide();
                    this.brands = [];
                },
                complete: () => this.loader$.hide(),
            });
    }

    onChangeValueInput(value: string) {
        this.search = value;
        this.getBrands(value);
    }

    onChangePagination(page: number) {
        this.currentPage = page;
        this.getBrands(this.search, page.toString());
    }

    onUpdateStatus(data: BrandModel, value: boolean) {
        this.loader$.show();

        data = {
            ...data,
            status: value ? 1 : 0,
        };

        this._brandService
            .request({
                method: 'PUT',
                path: `brand/${data.id}`,
                data,
            })
            .subscribe({
                next: (c) => {
                    this.getBrands(this.search, this.currentPage.toString());
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
                        'Brand status update'
                    );
                    this.loader$.hide();
                },
            });
    }

    onAddBrand(
        record?: BrandModel,
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
            } the brand ${record?.name}?`;
            this.typeModal = 'confirm';
            this.open = true;
        }
    }

    onDelete(data: BrandModel) {
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
            const path = `brand${
                this.userAction === 'update' ? '/' + this.pivote?.id : ''
            }`;

            this._brandService
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

                        this.getBrands();
                        this.showingComponent = 'Table';
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = `Error occurred when ${
                            this.userAction === 'save' ? 'saving' : 'updating'
                        } the brand ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }

        if (this.userAction === 'delete') {
            this._brandService
                .request({
                    method: 'DELETE',
                    path: `brand/${this.pivote?.id}`,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = 'Data has been removed successfully';
                        this.typeModal = 'success';
                        this.pivote = undefined;

                        this.getBrands();
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = `Error occurred when removing the brand ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }
    }
}
