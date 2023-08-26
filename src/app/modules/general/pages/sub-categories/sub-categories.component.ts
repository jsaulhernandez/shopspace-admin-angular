import {
    AfterContentChecked,
    ChangeDetectorRef,
    Component,
    OnInit,
    inject,
} from '@angular/core';

import { SubCategoryModel } from 'src/app/data/models/SubCategory.model';
import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
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
    selector: 'app-sub-categories',
    templateUrl: './sub-categories.component.html',
    styleUrls: ['./sub-categories.component.scss'],
})
export class SubCategoriesComponent implements OnInit, AfterContentChecked {
    _subCategoryService = inject(AdminApiService);

    isLoading = this.loader$.loading$;
    subCategories: SubCategoryModel[] = [];
    pagination?: CustomPagination;
    search: string = '';
    currentPage: number = 0;

    //modal
    open: boolean = false;
    typeModal: ModalActionsType = 'confirm';
    textModal: string = '';
    userAction: UserActions = 'save';
    showingComponent: ShowComponent = 'Table';
    pivote?: SubCategoryModel;

    customHeader: CustomHeader<SubCategoryModel>[] = [
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
            title: 'Category',
            render: (data) => data.category.name ?? 'n/a',
        },
        {
            title: 'Actions',
            element: 'actions',
            onClickElement: (data, _) =>
                this.onAddSubCategory(data, false, 'update'),
            onSecondClickElement: (data, _) => this.onDelete(data),
        },
    ];

    constructor(
        private loader$: LoaderService,
        private notification$: NotificationService,
        private cdRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.getCategories();
    }

    ngAfterContentChecked(): void {
        this.cdRef.detectChanges();
    }

    async getCategories(search = '', page = '0', size = '10') {
        this.loader$.show();
        this._subCategoryService
            .request<SubCategoryModel[]>({
                method: 'GET',
                path: 'categories/paged',
                params: {
                    search,
                    page,
                    size,
                },
            })
            .subscribe({
                next: (c) => {
                    this.subCategories = c.data || [];
                    this.pagination = c.page;
                },
                error: (e) => {
                    this.loader$.hide();
                    this.subCategories = [];
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

    onUpdateStatus(data: SubCategoryModel, value: boolean) {
        this.loader$.show();

        data = {
            ...data,
            status: value ? 1 : 0,
        };

        this._subCategoryService
            .request({
                method: 'PUT',
                path: `categories/${data.id}`,
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
                        'Subcategory status update'
                    );
                    this.loader$.hide();
                },
            });
    }

    onAddSubCategory(
        record?: SubCategoryModel,
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
            } the subcategory ${record?.name}?`;
            this.typeModal = 'confirm';
            this.open = true;
        }
    }

    onDelete(data: SubCategoryModel) {
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
            const path = `categories${
                this.userAction === 'update' ? '/' + this.pivote?.id : ''
            }`;

            this._subCategoryService
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
                        } the subcategory ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }

        if (this.userAction === 'delete') {
            this._subCategoryService
                .request({
                    method: 'DELETE',
                    path: `categories/${this.pivote?.id}`,
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
                        this.textModal = `Error occurred when removing the subcategory ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => this.loader$.hide(),
                });
        }
    }
}
