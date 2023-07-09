import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SButtonComponent } from './s-button/s-button.component';
import { SInputComponent } from './s-input/s-input.component';
import { STextComponent } from './s-text/s-text.component';

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
    declarations: [SButtonComponent, SInputComponent, STextComponent],
    imports: [
        CommonModule,
        NzTypographyModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
    ],
    exports: [SButtonComponent, SInputComponent, STextComponent],
})
export class ComponentsModule {}
