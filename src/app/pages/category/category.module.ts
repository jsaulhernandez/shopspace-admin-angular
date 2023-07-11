import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { CategoryRoutingModule } from './category-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { CategoryComponent } from './category.component';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
    declarations: [CategoryComponent, CategoryFormComponent],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        ComponentsModule,
        NzTableModule,
        NzSwitchModule,
        SharedModule,
        NzFormModule,
        ReactiveFormsModule,
        FormsModule,
        NzRadioModule,
    ],
})
export class CategoryModule {}
