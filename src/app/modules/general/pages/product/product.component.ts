import {
    AfterContentChecked,
    ChangeDetectorRef,
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    inject,
} from '@angular/core';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import { ProductModel } from 'src/app/data/models/Product.model';
import { ViewProductModel } from 'src/app/data/models/ViewProduct.model';

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { CustomPagination } from 'src/app/data/api/CustomResponse';

import { CustomHeader } from 'src/app/core/utils/components.util';
import { NumberUtils } from 'src/app/core/utils/number.utils';

import {
    ModalActionsType,
    ShowComponent,
    UserActions,
} from 'src/app/data/constants/constants';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterContentChecked {
    api$ = inject(AdminApiService);

    //templates
    @ViewChild('templateInformation') templateInformation!: TemplateRef<any>;

    isLoading = this.loader$.loading$;
    products: ProductModel[] = [];
    pagination?: CustomPagination;
    search: string = '';
    currentPage: number = 0;

    //modal
    open: boolean = false;
    typeModal: ModalActionsType = 'confirm';
    textModal: string = '';
    userAction: UserActions = 'save';
    showingComponent: ShowComponent = 'Table';
    pivote?: ProductModel;

    customHeader: CustomHeader<ProductModel>[] = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            render: (data) => NumberUtils.formatMoney(data.price) ?? 'n/a',
        },
        {
            title: 'Release date',
            render: (data) =>
                format(parseISO(data.releaseDate.toString()), 'yyyy/MM/dd') ??
                'n/a',
        },
        {
            title: 'Type classification',
            render: (data) => data.typeClassification.name ?? 'n/a',
        },
        {
            title: 'Brand',
            render: (data) => data.brand.name ?? 'n/a',
        },
        {
            title: 'More information',
            element: 'button',
            icon: 'eye',
            onClickElement: (data) => {
                this.pivote = data;
                this.onCustomModal();
            },
        },
        {
            title: 'Actions',
            element: 'actions',
            onClickElement: (data, _) =>
                this.onAddProduct(data, false, 'update'),
            onSecondClickElement: (data, _) => this.onDelete(data),
        },
    ];

    constructor(
        private loader$: LoaderService,
        private modal$: ModalService,
        private notification$: NotificationService,
        private cdRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.getProducts();
    }

    ngAfterContentChecked(): void {
        this.cdRef.detectChanges();
    }

    async getProducts(search = '', page = '0', size = '10') {
        this.loader$.show();
        this.api$
            .request<ProductModel[]>({
                method: 'GET',
                path: 'product/paged',
                params: {
                    search,
                    page,
                    size,
                },
            })
            .subscribe({
                next: (c) => {
                    this.products = c.data || [];
                    this.pagination = c.page;
                },
                error: (e) => {
                    this.loader$.hide();
                    this.products = [];
                },
                complete: () => this.loader$.hide(),
            });
    }

    onUpdateStatus(data: ViewProductModel, value: boolean) {
        this.loader$.show();

        data = {
            ...data,
            status: value ? 1 : 0,
        };

        this.api$
            .request({
                method: 'PUT',
                path: `product/view/${data.id}`,
                data,
            })
            .subscribe({
                next: (c) => {
                    this.getProducts(this.search, this.currentPage.toString());
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
                        'View Product status update'
                    );
                    this.loader$.hide();
                },
            });
    }

    onChangeValueInput(value: string) {
        this.search = value;
        this.getProducts(value);
    }

    onChangePagination(page: number) {
        this.currentPage = page;
        this.getProducts(this.search, page.toString());
    }

    onAddProduct(
        record?: ProductModel,
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
            } the product ${record?.name}?`;
            this.typeModal = 'confirm';
            this.open = true;
        }
    }

    onDelete(data: ProductModel) {
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
            const path = `product${
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

                        this.getProducts();
                        this.showingComponent = 'Table';
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = `Error occurred when ${
                            this.userAction === 'save' ? 'saving' : 'updating'
                        } the product ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }

        if (this.userAction === 'delete') {
            this.api$
                .request({
                    method: 'DELETE',
                    path: `product/${this.pivote?.id}`,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = 'Data has been removed successfully';
                        this.typeModal = 'success';
                        this.pivote = undefined;

                        this.getProducts();
                    },
                    error: (e) => {
                        this.loader$.hide();
                        this.textModal = `Error occurred when removing the product ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }
    }

    onCustomModal(option: 'open' | 'close' = 'open') {
        if (option === 'open') {
            this.modal$.open(
                this.templateInformation,
                {
                    title: 'Information about the product',
                },
                { nzWidth: 800 }
            );
        } else {
            this.pivote = undefined;
            this.modal$.close();
        }
    }
}
