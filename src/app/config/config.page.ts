import {Component, OnInit} from '@angular/core';
import {PrintService} from '../shared/services/print.service';
import {ModalController, Platform} from '@ionic/angular';
import {QrcodeService} from '../shared/services/qrcode.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-config',
    templateUrl: './config.page.html',
    styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

    details: {
        init: any;
        hasPrinter: boolean;
        printerSerialNo: string;
        printerVersion: string;
        qrCode: any;
    } = {
        init: null,
        hasPrinter: false,
        printerSerialNo: '0',
        printerVersion: '0',
        qrCode: null,
    };

    config: {
        size: number;
        printerSize: number;
        errorLevel: number;
    } = {
        size: 128,
        printerSize: 1,
        errorLevel: 1,
    };

    constructor(
        private platform: Platform,
        private modalController: ModalController,
        private printService: PrintService,
        private qrcodeService: QrcodeService,
    ) {
    }

    ngOnInit() {
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

            });
        }
    }

    close() {
        this.modalController.dismiss(false);
    }

    finish() {
        this.modalController.dismiss(true);
    }

    imprimirTeste() {

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

        this.printService.setFontSize(24);
        this.printService.setAlignment(1);
        this.printService.printQRCode('Brasal.com.br', 14, 3);
        this.printService.lineWrap(3);
    }
}
