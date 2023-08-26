import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandComponent } from './pages/brand/brand.component';
import { CategoryComponent } from './pages/category/category.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { ClassificationSubcategoriesComponent } from './pages/classification-subcategories/classification-subcategories.component';

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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GeneralRoutingModule {}
