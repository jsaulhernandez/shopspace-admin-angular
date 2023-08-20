import { Component, OnInit, inject } from '@angular/core';

import { CategoryModel } from 'src/app/data/models/Category.interface';
import { AdminApiService } from 'src/app/services/core/admin-api.service';
import { CustomPagination } from 'src/app/data/api/CustomResponse';

import {
    ModalActionsType,
    ShowComponent,
    UserActions,
} from 'src/app/constants/constants';
import { CustomHeader } from 'src/app/utils/components.util';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
    _categoryService = inject(AdminApiService);

    isLoading: boolean = false;
    categories: CategoryModel[] = [];
    pagination?: CustomPagination;
    search: string = '';
    currentPage: number = 0;

    //modal
    open: boolean = false;
    typeModal: ModalActionsType = 'confirm';
    textModal: string = '';
    userAction: UserActions = 'save';
    showingComponent: ShowComponent = 'Table';
    pivote?: CategoryModel;

    customHeader: CustomHeader[] = [
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
            onClickElement: (data, _) =>
                this.onAddCategory(data, false, 'update'),
            onSecondClickElement: (data, _) => this.onDelete(data),
        },
    ];

    ngOnInit(): void {
        this.getCategories();
    }

    async getCategories(search = '', page = '0', size = '10') {
        this.isLoading = true;
        this._categoryService
            .request<CategoryModel[]>({
                method: 'GET',
                path: 'category/paged',
                params: {
                    search,
                    page,
                    size,
                },
            })
            .subscribe({
                next: (c) => {
                    this.categories = c.data || [];
                    this.pagination = c.page;
                },
                error: (e) => {
                    this.isLoading = false;
                    this.categories = [];
                },
                complete: () => (this.isLoading = false),
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

    onUpdateStatus(data: CategoryModel, value: boolean) {
        this.isLoading = true;

        data = {
            ...data,
            status: value ? 1 : 0,
        };

        this._categoryService
            .request({
                method: 'PUT',
                path: `category/${data.id}`,
                data,
            })
            .subscribe({
                next: (c) => {
                    console.log('category status update');
                    this.getCategories(
                        this.search,
                        this.currentPage.toString()
                    );
                },
                error: (e) => {
                    this.isLoading = false;
                },
                complete: () => (this.isLoading = false),
            });
    }

    onAddCategory(
        record?: CategoryModel,
        isSaved = false,
        userAction: UserActions = 'save'
    ) {
        if (!isSaved) {
            this.pivote = record;
            this.showingComponent = 'Form';
            this.userAction = userAction;
        } else {
            if (record) this.pivote = { ...record };

            this.textModal = `¿En realidad desea ${
                this.userAction === 'save' ? 'guardar' : 'actualizar'
            } la categoría ${record?.name}?`;
            this.typeModal = 'confirm';
            this.open = true;
        }
    }

    onDelete(data: CategoryModel) {
        this.pivote = data;
        this.textModal = '¿Estás seguro de eliminar el registro?';
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
        this.isLoading = true;

        if (this.userAction === 'save' || this.userAction === 'update') {
            const path = `category${
                this.userAction === 'update' ? '/' + this.pivote?.id : ''
            }`;

            this._categoryService
                .request({
                    method: this.userAction === 'save' ? 'POST' : 'PUT',
                    path: path,
                    data: this.pivote,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = `Registro ${
                            this.userAction === 'save'
                                ? 'guardado'
                                : 'actualizado'
                        } correctamente`;
                        this.typeModal = 'success';
                        this.pivote = undefined;

                        this.getCategories();
                        this.showingComponent = 'Table';
                    },
                    error: (e) => {
                        this.isLoading = false;
                        this.textModal = `Ocurrio un error al ${
                            this.userAction === 'save'
                                ? 'guardar'
                                : 'actualizar'
                        } la categoría ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => (this.isLoading = false),
                });
        }

        if (this.userAction === 'delete') {
            this._categoryService
                .request({
                    method: 'DELETE',
                    path: `category/${this.pivote?.id}`,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = 'Registro eliminado correctamente';
                        this.typeModal = 'success';
                        this.pivote = undefined;

                        this.getCategories();
                    },
                    error: (e) => {
                        this.isLoading = false;
                        this.textModal = `Ocurrio un error al eliminar la categoría ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => (this.isLoading = false),
                });
        }
    }
}
