import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from './pages/customer/customer.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
    {
        title: 'Customers',
        path: 'customers',
        component: CustomerComponent,
    },
    {
        title: 'Users',
        path: 'users',
        component: UserComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdmonRoutingModule {}
