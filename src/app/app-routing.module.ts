import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        component: LayoutComponent,
        children: [
            {
                path: 'category',
                loadChildren: () =>
                    import('./pages/category/category.module').then(
                        (c) => c.CategoryModule
                    ),
            },
            {
                path: 'brand',
                loadChildren: () =>
                    import('./pages/brand/brand.module').then(
                        (b) => b.BrandModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
