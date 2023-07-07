import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconDefinition } from '@ant-design/icons-angular';

import {
    AppstoreOutline,
    LogoutOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [AppstoreOutline, LogoutOutline];

import { LayoutComponent } from './layout/layout.component';
import { SpinComponent } from './spin/spin.component';

@NgModule({
    declarations: [LayoutComponent, SpinComponent],
    imports: [
        CommonModule,
        NzIconModule.forRoot(icons),
        NzLayoutModule,
        NzBreadCrumbModule,
        NzMenuModule,
    ],
    exports: [LayoutComponent, SpinComponent],
})
export class SharedModule {}
