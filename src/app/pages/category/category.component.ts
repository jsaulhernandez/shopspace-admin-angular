import { Component, OnInit, inject } from '@angular/core';

import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/data/models/Category.interface';

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
    _categoryService = inject(CategoryService);

    isLoading: boolean = false;
    categories: CategoryModel[] = [];
    pagination?: CustomPagination;

    //modal
    open: boolean = false;
    typeModal: ModalActionsType = 'confirm';
    textModal: string = '';
    userAction: UserActions = 'save';
    showingComponent: ShowComponent = 'Table';
    pivote?: CategoryModel;

    customHeader: CustomHeader[] = [
        {
            title: 'Nombre',
            dataIndex: 'name',
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            element: 'switch',
            onClickElement: (data, value) => this.onUpdateStatus(data, value),
        },
        {
            title: 'Acciones',
            element: 'actions',
            onClickElement: (data, _) =>
                this.onAddCategory(data, false, 'update'),
            onSecondClickElement: (data, _) => this.onDelete(data),
        },
    ];

    ngOnInit(): void {
        this.getCategories();
    }

    async getCategories(page = '0', size = '10') {
        this.isLoading = true;
        this._categoryService
            .getAllCategories<CategoryModel[]>({
                path: 'category/paged',
                params: {
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

    onChangePagination(page: number) {
        this.getCategories(page.toString());
    }

    onUpdateStatus(data: CategoryModel, value: boolean) {
        this.isLoading = true;

        data = {
            ...data,
            status: value ? 1 : 0,
        };

        this._categoryService
            .updateCategory({
                path: `category/${data.id}`,
                data,
            })
            .subscribe({
                next: (c) => console.log('category status update'),
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

        if (this.userAction === 'save') {
            this._categoryService
                .saveCategory({
                    path: 'category',
                    data: this.pivote,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = 'Registro guardado correctamente';
                        this.typeModal = 'success';
                        this.pivote = undefined;

                        this.getCategories();
                        this.showingComponent = 'Table';
                    },
                    error: (e) => {
                        this.isLoading = false;
                        this.textModal = `Ocurrio un error al guardar la categoría ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => (this.isLoading = false),
                });
        }

        if (this.userAction === 'update') {
            this._categoryService
                .updateCategory({
                    path: `category${
                        this.userAction === 'update'
                            ? '/' + this.pivote?.id
                            : ''
                    }`,
                    data: this.pivote,
                })
                .subscribe({
                    next: (c) => {
                        this.textModal = 'Registro actualizado correctamente';
                        this.typeModal = 'success';
                        this.pivote = undefined;

                        this.getCategories();
                        this.showingComponent = 'Table';
                    },
                    error: (e) => {
                        this.isLoading = false;
                        this.textModal = `Ocurrio un error al actualizae la categoría ${this.pivote?.name}`;
                        this.typeModal = 'error';
                    },
                    complete: () => (this.isLoading = false),
                });
        }

        if (this.userAction === 'delete') {
            this._categoryService
                .deleteCategory({
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
