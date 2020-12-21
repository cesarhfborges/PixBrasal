import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PrintService} from '../shared/services/print.service';
import {ModalController, Platform} from '@ionic/angular';

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
  } = {
    init: null,
    hasPrinter: false,
    printerSerialNo: '0',
    printerVersion: '0',
  };

  constructor(
      private platform: Platform,
      private modalController: ModalController,
      private printService: PrintService,
  ) {}

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
    this.printService.printString('Hello World!\/n');
    this.printService.printQRCode({title: 'teste'}, 40);
  }
}
