import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
      private alertController: AlertController
  ) { }

  async showAlertMessage(options: {header: string, subHeader: string, message: string}) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: options.header,
      subHeader: options.subHeader,
      message: options.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showAlertPassword(): Promise<any> {
    return await new Promise<any>((resolve, reject) => {
      this.alertController.create({
        cssClass: 'passwordAlert',
        header: 'Senha Administrativa',
        inputs: [
          {
            name: 'passwd',
            type: 'tel',
            cssClass: 'inputPass',
            placeholder: 'Senha',
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
              if (data.passwd !== '1234') {
                return false;
              }
              resolve(data.passwd);
            }
          }
        ]
      }).then(alert => {
        alert.present().then(() => {
          const firstInput: any = document.querySelector('ion-alert.passwordAlert input');
          firstInput.focus();
          return;
        });
      });
    });
  }

  async alertYesNo(options: {header: string, cssClass?: string}): Promise<any> {
    return await new Promise<any>((resolve, reject) => {
      this.alertController.create({
        cssClass: options.cssClass ?? '',
        header: options.header,
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              reject(false);
            }
          }, {
            text: 'Sim',
            handler: () => {
              resolve(true);
            }
          }
        ]
      }).then(alert => {
        alert.present();
      });
    });
  }
}
