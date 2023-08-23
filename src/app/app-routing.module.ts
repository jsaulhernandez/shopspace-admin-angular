import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        title: 'Admin',
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'admon',
                title: 'Administration',
                loadChildren: () =>
                    import('./modules/admon/admon.module').then(
                        (a) => a.AdmonModule
                    ),
            },
            {
                path: 'auth',
                title: 'Authentication',
                loadChildren: () =>
                    import('./modules/auth/auth.module').then(
                        (a) => a.AuthModule
                    ),
            },
            {
                path: 'general',
                title: 'General',
                loadChildren: () =>
                    import('./modules/general/general.module').then(
                        (g) => g.GeneralModule
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
