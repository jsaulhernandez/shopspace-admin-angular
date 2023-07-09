import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        ComponentsModule,
    ],
})
export class AuthModule {}
