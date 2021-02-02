import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import localePt from '@angular/common/locales/pt';
import {DatePipe, registerLocaleData} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestInterceptor} from './shared/interceptors/request.interceptor';
import {BrMaskerModule} from 'br-mask';
import {NgxCurrencyModule} from 'ngx-currency';
import {Autostart} from '@ionic-native/autostart/ngx';
import {UniqueDeviceID} from '@ionic-native/unique-device-id/ngx';
import {ErrorsInterceptor} from './shared/interceptors/errors.interceptor';

registerLocaleData(localePt);

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot({scrollAssist: true}),
        AppRoutingModule,
        HttpClientModule,
        BrMaskerModule,
        NgxCurrencyModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Autostart,
        UniqueDeviceID,
        DatePipe,
        {provide: LOCALE_ID, useValue: 'pt-BR'},
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
