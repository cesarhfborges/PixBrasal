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

  constructor(
      private modalController: ModalController,
      private platform: Platform,
  ) {
    this.form = new FormGroup({
      valor: new FormControl('0,00', [Validators.required]),
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
