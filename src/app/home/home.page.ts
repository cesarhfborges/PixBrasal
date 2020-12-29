import { Component } from '@angular/core';
import {ModalService} from '../shared/services/modal.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {AlertService} from '../shared/services/alert.service';
import {ToastService} from '../shared/services/toast.service';

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
      private toastService: ToastService,
      private alertService: AlertService,
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
      this.toastService.showToast('Nenhum funcionário selecionado.');
    }
  }

  openConfig() {
    this.alertService.showAlertPassword().then(response => {
      console.log('success: ', response);
      if (response === '1234') {
        this.modalService.showModalConfig().then(res => {
          console.log(res);
        });
      } else {
        this.toastService.showToast('A senha informada é inválida.');
      }
    }).catch(error => {
      console.log('error: ', error);
    });
  }
}
