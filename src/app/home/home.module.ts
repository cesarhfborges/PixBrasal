import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {GerarPagamentoPage} from '../gerar-pagamento/gerar-pagamento.page';
import {StepperComponent} from '../gerar-pagamento/stepper/stepper.component';
import {ConfigPage} from '../config/config.page';
import {BrMaskerModule} from 'br-mask';
import {InputNumericDirective} from '../shared/directives/input-numeric.directive';
import {NgxCurrencyModule} from 'ngx-currency';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        ReactiveFormsModule,
        BrMaskerModule,
        NgxCurrencyModule,
    ],
    declarations: [
        HomePage,
        GerarPagamentoPage,
        ConfigPage,
        StepperComponent,
        InputNumericDirective,
    ],
})
export class HomePageModule {
}
