import { Injectable } from '@angular/core';

declare var sunmiInnerPrinter: any;

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() {
  }

  printerInit(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      sunmiInnerPrinter.printerInit(resolve, reject);
    });
  }

  hasPrinter(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      sunmiInnerPrinter.hasPrinter(resolve, reject);
    });
  }

  getServiceVersion(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      sunmiInnerPrinter.getServiceVersion(resolve, reject);
    });
  }

  getFirmwareStatus(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      sunmiInnerPrinter.getFirmwareStatus(resolve, reject);
    });
  }

  getPrinterSerialNo(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      sunmiInnerPrinter.getPrinterSerialNo(resolve, reject);
    });
  }

  getPrinterVersion(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      sunmiInnerPrinter.getPrinterVersion(resolve, reject);
    });
  }

  getPrinterModal(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      sunmiInnerPrinter.getPrinterModal(resolve, reject);
    });
  }

  printString(text: string): any {
    sunmiInnerPrinter.printString(text);
  }

  printQRCode(qrCodeData, moduleSize): any {
    sunmiInnerPrinter.printQRCode(qrCodeData, moduleSize);
  }
}
