import {Injectable} from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(
        private toastController: ToastController,
        private loadingController: LoadingController,
    ) {
    }

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

    showToastError(mensagem: string) {
        this.toastController.create({
            message: mensagem,
            duration: 3000,
            color: 'warning',
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

    async presentLoading() {
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Aguarde...',
            duration: 2000
        });
        await loading.present();
        return await loading.onDidDismiss();
    }
}
