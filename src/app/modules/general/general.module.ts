import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';

import * as general from './index';
import { QuillModule } from 'ngx-quill';

@NgModule({
    declarations: [...general.GENERAL_MODULE],
    imports: [
        CommonModule,
        GeneralRoutingModule,
        SharedModule,
        NzRadioModule,
        NzSelectModule,
        QuillModule.forRoot(),
    ],
})
export class GeneralModule {}
