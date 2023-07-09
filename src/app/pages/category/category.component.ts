import { Component, OnInit, Type, inject } from '@angular/core';

import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/data/models/Category.interface';
import { SButtonComponent } from 'src/app/components/s-button/s-button.component';

interface CustomHeader<T extends Object> {
    title: string;
    dataIndex?: string;
    render?: Type<any>;
}

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
    _categoryService = inject(CategoryService);

    isLoading: boolean = false;
    categories: CategoryModel[] = [];

    customHeader: CustomHeader<CategoryModel>[] = [
        {
            title: 'Nombre',
            dataIndex: 'name',
        },
        {
            title: 'Estado',
            dataIndex: 'status',
        },
        {
            title: 'Acciones',
            render: SButtonComponent,
        },
    ];

    ngOnInit(): void {
        this.getCategories();
    }

    async getCategories() {
        this.isLoading = true;
        this._categoryService
            .getAllCategories<CategoryModel[]>({
                path: 'category/paged',
            })
            .subscribe({
                next: (c) => (this.categories = c.data || []),
                error: (e) => {
                    this.isLoading = false;
                    this.categories = [];
                },
                complete: () => (this.isLoading = false),
            });
    }

    getValueByKey(data: CategoryModel, key: string): any {
        return data[key as keyof typeof data];
    }
}
