import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private http: HttpClient,
  ) { }

  login(credentials: {email: string, password: string}): Observable<boolean> {
    return this.http.post<any>(`https://reqres.in/api/login`, credentials).pipe(map(response => {
      if (response.token !== undefined) {
        localStorage.setItem('credentials', response.token);
        return true;
      }
      return false;
    }));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('credentials');
  }

  logout(): void {
    localStorage.clear();
  }
}
