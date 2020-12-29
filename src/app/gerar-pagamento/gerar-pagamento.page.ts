import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import {Step} from '../shared/models/step';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../shared/services/toast.service';

@Component({
  selector: 'app-gerar-pagamento',
  templateUrl: './gerar-pagamento.page.html',
  styleUrls: ['./gerar-pagamento.page.scss'],
})
export class GerarPagamentoPage implements OnInit {

  inputValorOptions = {
    align: 'center',
    allowNegative: false,
    allowZero: false,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    nullable: false,
    min: 0,
    max: 9999,
    // inputMode: CurrencyMaskInputMode.FINANCIAL
  };

  inputPhoneOptions = {
    align: 'center',
    allowNegative: false,
    allowZero: false,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    nullable: false,
    min: 0,
    max: 9999,
    // inputMode: CurrencyMaskInputMode.FINANCIAL
  };

  dateNow: Date = new Date();

  constructor(
      private modalController: ModalController,
      private platform: Platform,
      private toastService: ToastService,
  ) {
    this.form = new FormGroup({
      valor: new FormControl(0, [Validators.required, Validators.min(.01)]),
    });
    setInterval(_ => {
      this.dateNow = new Date();
    }, 1000);
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

  numberOnly(event): boolean {
    console.log(event);
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  close() {
    this.modalController.dismiss(false);
  }

  finish() {
    this.modalController.dismiss(true);
  }

  atualStepAdd() {
    if (this.atualStep < this.steps.length) {
      if (this.atualStep !== 1) {
        this.atualStep++;
      } else {
        if (this.form.valid) {
          this.atualStep++;
        } else {
          this.toastService.showToast('Verifique o valor digitado.');
        }
      }
    }
  }

  atualStepSub() {
    if (this.atualStep > 1) {
      this.atualStep--;
    }
  }

  focus() {
    document.execCommand('selectall', false, null);
    // element.setSelectionRange(0, element.value.length);
  }

  changes($event: any) {
    console.log($event);
    return ['0', '1'].includes($event.detail.data) || $event.detail.inputType === 'deleteContentBackward';
  }
}
