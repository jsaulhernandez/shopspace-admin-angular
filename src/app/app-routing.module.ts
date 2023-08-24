import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    {
        title: 'Authentication',
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then((a) => a.AuthModule),
    },
    {
        title: 'Admin',
        path: 'backoffice',
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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
