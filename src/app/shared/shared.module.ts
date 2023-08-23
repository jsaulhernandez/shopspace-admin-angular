import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';

import * as shared from './components';

@NgModule({
    declarations: [...shared.SHARED_COMPONENTS],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NzTypographyModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        NzTableModule,
        NzSwitchModule,
        NzPaginationModule,
        NzModalModule,
    ],
    exports: [
        ...shared.SHARED_COMPONENTS,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzIconModule,
    ],
})
export class SharedModule {}
