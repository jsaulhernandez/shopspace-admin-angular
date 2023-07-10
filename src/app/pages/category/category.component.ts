import { Component, OnInit, inject } from '@angular/core';

import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/data/models/Category.interface';

import { CustomPagination } from 'src/app/data/api/CustomResponse';

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

    customHeader: CustomHeader[] = [
        {
            title: 'Nombre',
            dataIndex: 'name',
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            element: 'switch',
            onClickElement: (data, _) => this.onUpdate(data),
        },
        {
            title: 'Acciones',
            element: 'actions',
            onClickElement: (data, _) => this.onUpdate(data),
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

    onUpdate(data: CategoryModel) {
        console.log('update', data);
    }

    onDelete(data: CategoryModel) {
        console.log('remove', data);
    }

    onChangePagination(page: number) {
        this.getCategories(page.toString());
    }
}
