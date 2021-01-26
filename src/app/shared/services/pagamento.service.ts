import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PagamentoService {

    constructor(
        private http: HttpClient,
    ) {
    }

    gerarPagamento(data): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/qrcode`, data);
    }
}
