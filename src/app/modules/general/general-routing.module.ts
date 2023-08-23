import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandComponent } from './pages/brand/brand.component';
import { CategoryComponent } from './pages/category/category.component';

const routes: Routes = [
    { title: 'Brands', path: 'brand', component: BrandComponent },
    { title: 'Categories', path: 'category', component: CategoryComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GeneralRoutingModule {}
