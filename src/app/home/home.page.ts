import { Component } from '@angular/core';
import {ModalService} from '../shared/services/modal.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';

declare var sunmiInnerPrinter: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  form: FormGroup;

  customAlertOptions: any = {
    header: 'Selecione seu nome abaixo para iniciar o pagamento PIX:',
    translucent: true
  };

  colaboradores = [
    'BRUNO VINICIUS PEREIRA DE AMORIM',
    'ROGERIO JORGE DA SILVA',
    'LUIZ ALBERTO ANDRADE ARANTES',
    'JOSE FRANCISCO VIEIRA DE MIRANDA',
    'IVANILDE ALVES DOS SANTOS',
    'ALEXANDRE JOSE OLIVEIRA DE OMENA',
    'ALEXANDRE JOSE OLIVEIRA DE OMENA',
    'TIAGO MARTINHO DE CARVALHO PORTO DA SILVA',
    'LARISSA LAIS VIEIRA GOMES',
    'JESUINO DA SILVA PIRES',
  ];

  constructor(
      private modalService: ModalService,
      private toastController: ToastController,
  ) {
    this.form = new FormGroup({
      funcionario: new FormControl(null, [Validators.required])
    });
  }

  showModal() {
    if (this.form.valid) {
      this.modalService.showModalPagamento().then(res => {
        console.log(res);
        this.form.reset();
      });
    } else {
      this.toastController.create({
        message: 'Nenhum funcionario selecionado.',
        duration: 3000,
      }).then(toast => {
        toast.present();
      });
    }
  }

  teste() {

//     try {
//       if (JSON.stringify(sunmiInnerPrinter) !== "{}") {
//         return;
//       }
// // it is safe to use sunmiInnerPrinter here
//     } catch(err) {
//       console.log("error: "+ JSON.stringify(err));
//     }
// (window).plugins.sunmiInnerPrinter.printOriginalText("Hello Printer");
// (window).plugins.sunmiInnerPrinter.printString("Hello String!");
// sunmiInnerPrinter.printOriginalText("Hello Printer");
   sunmiInnerPrinter.printerInit();
   sunmiInnerPrinter.printerSelfChecking();
   sunmiInnerPrinter.printOriginalText('Hello World!\\n');
   sunmiInnerPrinter.printString('Hello World!\\n');
  }
}
