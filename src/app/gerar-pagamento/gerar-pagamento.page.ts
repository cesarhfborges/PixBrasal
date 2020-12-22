import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import {Step} from '../shared/models/step';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-gerar-pagamento',
  templateUrl: './gerar-pagamento.page.html',
  styleUrls: ['./gerar-pagamento.page.scss'],
})
export class GerarPagamentoPage implements OnInit {

  dateNow: Date = new Date();

  inputValorOptions = {
    // align: 'left',
    allowNegative: false,
    allowZero: false,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    nullable: false,
    min: 0,
    max: 10000000,
    // inputMode: CurrencyMaskInputMode.FINANCIAL
  };

  constructor(
      private modalController: ModalController,
      private platform: Platform,
  ) {
    this.form = new FormGroup({
      valor: new FormControl(0, [Validators.required, Validators.min(.1)]),
    });
    setInterval(_ => {
      this.dateNow = new Date();
    }, 1000);

    this.platform.keyboardDidShow.subscribe(ev => {
      const { keyboardHeight } = ev;
      console.log(ev);
      // Do something with the keyboard height such as translating an input above the keyboard.
    });
  }

  // @ViewChild('inputValor') inputValor: ElementRef;

  atualStep = 1;

  steps: Step[] = [
    {
      name: 'Valor',
      type: 'icon',
      icon: 'wallet-outline'
    },
    {
      name: 'QR Code',
      type: 'icon',
      icon: 'qr-code-outline'
    },
    {
      name: 'Validação',
      type: 'icon',
      icon: 'thumbs-up-outline'
    },
  ];

  form: FormGroup;

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss(false);
  }

  finish() {
    this.modalController.dismiss(true);
  }

  atualStepAdd() {
    if (this.atualStep < this.steps.length) {
      this.atualStep++;
    }
  }

  atualStepSub() {
    if (this.atualStep > 1) {
      this.atualStep--;
    }
  }

  focus(element) {
    element.setSelectionRange(0, element.value.length);
  }
}
