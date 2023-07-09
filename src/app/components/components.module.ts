import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SButtonComponent } from './s-button/s-button.component';
import { SInputComponent } from './s-input/s-input.component';
import { STextComponent } from './s-text/s-text.component';
import { STableComponent } from './s-table/s-table.component';

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
    declarations: [
        SButtonComponent,
        SInputComponent,
        STextComponent,
        STableComponent,
    ],
    imports: [
        CommonModule,
        NzTypographyModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        NzTableModule,
    ],
    exports: [
        SButtonComponent,
        SInputComponent,
        STextComponent,
        STableComponent,
    ],
})
export class ComponentsModule {}
