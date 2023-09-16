import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmonRoutingModule } from './admon-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import * as admon from './index';

@NgModule({
    declarations: [...admon.ADMON_MODULES],
    imports: [CommonModule, AdmonRoutingModule, SharedModule],
})
export class AdmonModule {}
