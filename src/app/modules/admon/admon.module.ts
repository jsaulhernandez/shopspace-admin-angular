import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmonRoutingModule } from './admon-routing.module';

import * as admon from './index';

@NgModule({
    declarations: [...admon.ADMON_MODULES],
    imports: [CommonModule, AdmonRoutingModule],
})
export class AdmonModule {}
