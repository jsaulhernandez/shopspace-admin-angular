import { Component, OnInit, inject } from '@angular/core';
import { CategoryModel } from 'src/app/data/models/Category.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
    _categoryService = inject(CategoryService);

    ngOnInit(): void {
        this._categoryService
            .getAllCategories<CategoryModel>({
                path: 'category/paged',
            })
            .subscribe((res) => console.log('res', res));
    }
}
