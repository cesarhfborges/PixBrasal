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

  printerSelfChecking(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      sunmiInnerPrinter.printerInit(resolve, reject);
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

  hasPrinter(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      sunmiInnerPrinter.hasPrinter(resolve, reject);
    });
  }

  getPrintedLength(): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.getPrintedLength(resolve, reject);
    });
  }

  lineWrap(count): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.lineWrap(count, resolve, reject);
    });
  }

  sendRAWData(base64Data): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.sendRAWData(base64Data, resolve, reject);
    });
  }

  setAlignment(alignment): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.setAlignment(alignment, resolve, reject);
    });
  }

  setFontName(typeface): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.setFontName(typeface, resolve, reject);
    });
  }

  setFontSize(fontSize): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.setFontSize(fontSize, resolve, reject);
    });
  }

  printTextWithFont(text, typeface, fontSize): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.printTextWithFont(text, typeface, fontSize, resolve, reject);
    });
  }

  printColumnsText(colsTextArr, colsWidthArr, colsAlign): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.printColumnsText(colsTextArr, colsWidthArr, colsAlign, resolve, reject);
    });
  }

  printBitmap(base64Data, width, height): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.printBitmap(base64Data, width, height, resolve, reject);
    });
  }

  printBarCode(barCodeData, symbology, width, height, textPosition): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.printBarCode(barCodeData, symbology, width, height, textPosition, resolve, reject);
    });
  }

  printQRCode(qrCodeData, moduleSize, errorLevel): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.printQRCode(qrCodeData, moduleSize, errorLevel, resolve, reject);
    });
  }

  printOriginalText(text: string): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.printOriginalText(text, resolve, reject);
    });
  }

  printString(text: string): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.printString(text, resolve, reject);
    });
  }

  printerStatusStartListener(): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.printerStatusStartListener(resolve, reject);
    });
  }

  printerStatusStopListener(): Promise<any> {
    return new Promise((resolve, reject) => {
      sunmiInnerPrinter.printerStatusStopListener();
      resolve();
    });
  }

  // Metodos não existem
  // getServiceVersion(): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     sunmiInnerPrinter.getServiceVersion(resolve, reject);
  //   });
  // }
  //
  // getFirmwareStatus(): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     sunmiInnerPrinter.getFirmwareStatus(resolve, reject);
  //   });
  // }
  //
  // getPrinterModal(): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     sunmiInnerPrinter.getPrinterModal(resolve, reject);
  //   });
  // }
}
