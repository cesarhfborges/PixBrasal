import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
      private alertController: AlertController
  ) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertPrompt(): Promise<any> {
    return await new Promise<any>((resolve, reject) => {
      this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Senha Administrativa',
        inputs: [
          {
            name: 'passwd',
            type: 'password',
            placeholder: 'Senha'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              reject();
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              resolve(data.passwd);
            }
          }
        ]
      }).then(alert => {
        alert.present();
      });
    });
  }
}
