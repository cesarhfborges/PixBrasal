import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  apiKey = 'c99a2ayxXSSWwmlAvvk4sUEVrDRtb57YWJxkDqGH2p64IWqHrYLQ1MvH';

  headers = {
    'x-server-time': '1608577703',
    'x-ratelimit-remaining': '299',
    'x-credits-free': '7999',
    'x-ratelimit-reset': '1608577763',
    'x-ratelimit-limit': '300',
    'x-credits-premium': '0'
  };

  constructor(
      private http: HttpClient
  ) {}

  generate(text: string, size: number): Observable<any> {
    const url = `https://api.happi.dev/v1/qrcode?data=${text}&width=${size}&width=&dots=000000&bg=FFFFFF&apikey=${this.apiKey}`;
    return this.http.get(url, {headers: this.headers});
  }
}
