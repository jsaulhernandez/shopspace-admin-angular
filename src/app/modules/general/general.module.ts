import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import * as general from './index';

@NgModule({
    declarations: [...general.GENERAL_MODULE],
    imports: [CommonModule, GeneralRoutingModule, SharedModule],
})
export class GeneralModule {}
