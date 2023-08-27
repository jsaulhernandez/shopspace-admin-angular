import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandComponent } from './pages/brand/brand.component';
import { CategoryComponent } from './pages/category/category.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { ClassificationSubcategoriesComponent } from './pages/classification-subcategories/classification-subcategories.component';
import { TypeClassificationComponent } from './pages/type-classification/type-classification.component';

const routes: Routes = [
    { title: 'Brands', path: 'brands', component: BrandComponent },
    { title: 'Categories', path: 'categories', component: CategoryComponent },
    {
        title: 'Sub categories',
        path: 'subcategories',
        component: SubCategoriesComponent,
    },
    {
        title: 'Clasificación',
        path: 'classification',
        component: ClassificationSubcategoriesComponent,
    },
    {
        title: 'Types of Clasificación',
        path: 'types',
        component: TypeClassificationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GeneralRoutingModule {}
