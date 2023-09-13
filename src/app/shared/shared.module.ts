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
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import * as shared from './components';
import * as directives from './directives/index';

@NgModule({
    declarations: [...shared.SHARED_COMPONENTS, ...directives.DIRECTIVES_LIST],
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
        NzDatePickerModule,
        NzTimePickerModule,
        NzSpinModule,
    ],
    exports: [
        ...shared.SHARED_COMPONENTS,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzIconModule,
        NzSwitchModule,
        NzSpinModule,
    ],
})
export class SharedModule {}
