import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        title: 'Admin',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'category',
                title: 'Categories',
                loadChildren: () =>
                    import('./pages/category/category.module').then(
                        (c) => c.CategoryModule
                    ),
            },
            {
                path: 'brand',
                title: 'Brands',
                loadChildren: () =>
                    import('./pages/brand/brand.module').then(
                        (b) => b.BrandModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
