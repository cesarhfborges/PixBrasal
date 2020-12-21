import { Injectable } from '@angular/core';

declare var sunmiInnerPrinter: any;

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() {
  }

  getInnerPrinter() {
    return sunmiInnerPrinter;
  }

  printerInit() {
    sunmiInnerPrinter.printerInit();
  }

  hasPrinter(): any {
    sunmiInnerPrinter.hasPrinter().then(response => {
      console.log(response);
      return response;
    });
  }

  getServiceVersion(): any {
    return sunmiInnerPrinter.getServiceVersion();
  }

  getFirmwareStatus(): any {
    return sunmiInnerPrinter.getFirmwareStatus();
  }

  getPrinterSerialNo(): any {
    return sunmiInnerPrinter.getPrinterSerialNo;
  }

  getPrinterVersion(): any {
    return sunmiInnerPrinter.getPrinterVersion();
  }

  getPrinterModal(): any {
    return sunmiInnerPrinter.getPrinterModal();
  }

  printString(text: string): any {
    sunmiInnerPrinter.printString(text);
  }
}
