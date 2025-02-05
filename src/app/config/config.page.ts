import {Component, OnInit} from '@angular/core';
import {PrintService} from '../shared/services/print.service';
import {ModalController, Platform} from '@ionic/angular';
import {QrcodeService} from '../shared/services/qrcode.service';
import {environment} from '../../environments/environment';
import {AuthService} from '../shared/services/auth.service';
import {AlertService} from '../shared/services/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../shared/services/toast.service';
import Usuario from '../shared/models/usuario';

@Component({
    selector: 'app-config',
    templateUrl: './config.page.html',
    styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

    usuario: Usuario;

    details: {
        init: any;
        hasPrinter: boolean;
        printerSerialNo: string;
        printerVersion: string;
        qrCode: any;
        printerStatusStartListener: any;
    } = {
        init: null,
        hasPrinter: false,
        printerSerialNo: '0',
        printerVersion: '0',
        qrCode: null,
        printerStatusStartListener: null,
    };

    config: {
        uuid: any;
        size: number;
        printerSize: number;
        errorLevel: number;
        display: {
            width: number;
            height: number;
        },
        appVersion: string;
    } = {
        uuid: localStorage.getItem('uniqueDeviceID'),
        size: 14,
        printerSize: 14,
        errorLevel: 3,
        display: {
            width: screen.width,
            height: screen.height,
        },
        appVersion: '1.0.0'
    };

    constructor(
        private platform: Platform,
        private modalController: ModalController,
        private printService: PrintService,
        private qrcodeService: QrcodeService,
        private authService: AuthService,
        private alertService: AlertService,
        private toastService: ToastService,
    ) {
    }

    ngOnInit(): void {
        this.usuario = this.authService.getUsuario();
    }

    ionViewDidEnter(): void {
        if (this.platform.is('cordova')) {
            this.printService.printerInit().then(response => {
                this.details.init = response;

                // this.printService.printString('Teste de Impressao');
                this.printService.hasPrinter().then(printer => {
                    this.details.hasPrinter = printer;
                });
                this.printService.getPrinterSerialNo().then(serialNo => {
                    this.details.printerSerialNo = serialNo;
                });
                this.printService.getPrinterVersion().then(printerVersion => {
                    this.details.printerVersion = printerVersion;
                });
                this.printService.getPrintedLength().then(statusStartListener => {
                    this.details.printerStatusStartListener = statusStartListener;
                });
            });
        }
    }

    close(): void {
        this.modalController.dismiss(false);
    }

    finish(): void {
        this.modalController.dismiss(true);
    }

    imprimirTeste(): void {

        this.printService.setAlignment(1);
        this.printService.printBitmap(environment.brasalLogo.replace('data:image/bmp;base64,', ''), 380, 164);
        this.printService.lineWrap(1);

        this.printService.setFontSize(20);
        this.printService.setAlignment(1);
        this.printService.printString(`Cnpj: 00.000.000/0001-55`);
        this.printService.lineWrap(1);

        this.printService.setFontSize(20);
        this.printService.setAlignment(1);
        this.printService.printString(`www.brasal.com.br`);
        this.printService.lineWrap(2);

        this.printService.setAlignment(1);
        this.printService.printQRCode('Brasal.com.br', this.config.printerSize, this.config.errorLevel);
        this.printService.lineWrap(3);

        this.printService.printerSelfChecking();

        this.printService.setFontSize(24);
        this.printService.setAlignment(1);
        this.printService.printString(``);
        this.printService.lineWrap(1);
        this.printService.printString(``);

    }

    logout(): void {
        this.alertService.alertYesNo({header: 'Deseja relamente sair do sistema ?'}).then(
            () => {
                this.authService.logout();
                window.location.reload();
            }
        );
    }

    copyToClipBoard(val) {
        navigator.clipboard.writeText(val).then(() => {
            this.toastService.showToast('Copiado para a área de transferência.');
        }).catch(e => console.error(e));
        // inputElement.select();
        // document.execCommand('copy');
        // inputElement.setSelectionRange(0, 0);
    }
}
