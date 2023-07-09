import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [CategoryComponent],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        ComponentsModule,
        NzTableModule,
        NzSwitchModule,
    ],
})
export class CategoryModule {}
