import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import en from '@angular/common/locales/es';

import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './pages/auth/auth.module';
import { CategoryModule } from './pages/category/category.module';
import { BrandModule } from './pages/brand/brand.module';
import { AddTokenInterceptor } from './interceptors/add-token.interceptor';

registerLocaleData(en);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        ComponentsModule,
        AuthModule,
        CategoryModule,
        BrandModule,
    ],
    providers: [
        { provide: NZ_I18N, useValue: es_ES },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AddTokenInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
