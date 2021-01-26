import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Colaborador} from '../models/colaborador';

@Injectable({
  providedIn: 'root'
})
export class AtendentesService {

  constructor(
      private http: HttpClient,
  ) { }

  getAtendentes(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${environment.apiUrl}/attendants/to-combobox`);
  }
}
