import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import en from '@angular/common/locales/es';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

//modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

//ng zorro modules
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

//components
import { AppComponent } from './app.component';
import * as index from './layout';

//interceptors
import { AddTokenInterceptor } from './core/interceptors/add-token.interceptor';

registerLocaleData(en);

@NgModule({
    declarations: [AppComponent, ...index.LAYOUT],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        NzLayoutModule,
        NzMenuModule,
        NzBreadCrumbModule,
        NzNotificationModule,
        SharedModule,
    ],
    providers: [
        { provide: NZ_I18N, useValue: en_US },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AddTokenInterceptor,
            multi: true,
        },
        CurrencyPipe,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
