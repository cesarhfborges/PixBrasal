import { Injectable } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {GerarPagamentoPage} from '../../gerar-pagamento/gerar-pagamento.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
      private modalController: ModalController,
  ) { }

  async showModalPagamento() {
    const modal = await this.modalController.create({
      component: GerarPagamentoPage,
      cssClass: 'gerar-pagamento.page'
    });
    await modal.present();
    return await modal.onDidDismiss();
  }
}
