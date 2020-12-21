import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PrintService} from '../shared/services/print.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit, AfterViewInit {

  details: {
    innerPrinter: any;
    hasPrinter: any;
    serviceVersion: any;
    firmwareStatus: any;
    printerSerialNo: any;
    printerVersion: any;
    printerModal: any;
  } = {
    innerPrinter: null,
    hasPrinter: null,
    serviceVersion: null,
    firmwareStatus: null,
    printerSerialNo: null,
    printerVersion: null,
    printerModal: null,
  };

  constructor(
      private modalController: ModalController,
      private printService: PrintService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.details.innerPrinter = this.printService.getInnerPrinter();
      this.details.hasPrinter = this.printService.hasPrinter();
      this.details.serviceVersion = this.printService.getServiceVersion();
      this.details.firmwareStatus = this.printService.getFirmwareStatus();
      this.details.printerSerialNo = this.printService.getPrinterSerialNo();
      this.details.printerVersion = this.printService.getPrinterVersion();
      this.printService.printerInit();
      // this.details.printerModal = this.printService.getPrinterModal();
    }, 4000);
  }

  close() {
    this.modalController.dismiss(false);
  }

  finish() {
    this.modalController.dismiss(true);
  }

  imprimirTeste() {
    this.printService.printString('Hello World!\/n');
  }
}
