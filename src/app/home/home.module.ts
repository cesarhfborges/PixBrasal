import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {GerarPagamentoPage} from '../gerar-pagamento/gerar-pagamento.page';
import {StepperComponent} from '../gerar-pagamento/stepper/stepper.component';
import {CurrencyMaskInputMode, NgxCurrencyModule} from 'ngx-currency';

export const customCurrencyMaskConfig = {
    align: 'right',
    allowNegative: true,
    allowZero: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    nullable: false,
    min: 0.10,
    max: 100000,
    // inputMode: CurrencyMaskInputMode.FINANCIAL
};


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
      NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
    declarations: [
        HomePage,
        GerarPagamentoPage,
        StepperComponent,
    ]
})
export class HomePageModule {
}
