import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
      private toastController: ToastController,
  ) { }

  showToast(mensagem: string) {
    this.toastController.create({
      message: mensagem,
      duration: 3000,
      buttons: [
        {
          text: 'x',
          role: 'cancel'
        }
      ]
    }).then(toast => {
      toast.present();
    });
  }
}
