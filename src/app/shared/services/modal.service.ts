import { Injectable } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {GerarPagamentoPage} from '../../gerar-pagamento/gerar-pagamento.page';
import {ConfigPage} from '../../config/config.page';
import {Colaborador} from '../models/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
      private modalController: ModalController,
  ) { }

  async showModalPagamento(data: Colaborador) {
    const modal = await this.modalController.create({
      component: GerarPagamentoPage,
      cssClass: 'gerar-pagamento.page',
      swipeToClose: false,
      backdropDismiss: false,
      keyboardClose: false,
      componentProps: {
        colaborador: data,
      },
    });
    await modal.present();
    return await modal.onDidDismiss();
  }

  async showModalConfig() {
    const modal = await this.modalController.create({
      component: ConfigPage,
      cssClass: 'config.page.page'
    });
    await modal.present();
    return await modal.onDidDismiss();
  }
}
