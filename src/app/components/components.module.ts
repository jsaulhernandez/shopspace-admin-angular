import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SButtonComponent } from './s-button/s-button.component';
import { SInputComponent } from './s-input/s-input.component';
import { STextComponent } from './s-text/s-text.component';
import { STableComponent } from './s-table/s-table.component';
import { SActionsComponent } from './s-actions/s-actions.component';

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
    declarations: [
        SButtonComponent,
        SInputComponent,
        STextComponent,
        STableComponent,
        SActionsComponent,
    ],
    imports: [
        CommonModule,
        NzTypographyModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        NzTableModule,
        NzSwitchModule,
        FormsModule,
    ],
    exports: [
        SButtonComponent,
        SInputComponent,
        STextComponent,
        STableComponent,
    ],
})
export class ComponentsModule {}
