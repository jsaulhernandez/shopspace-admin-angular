import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { SButtonComponent } from 'src/app/components/s-button/s-button.component';
import { SInputComponent } from 'src/app/components/s-input/s-input.component';
import { STextComponent } from 'src/app/components/s-text/s-text.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignInComponent,
        STextComponent,
        SButtonComponent,
        SInputComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzTypographyModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
    ],
})
export class AuthModule {}
