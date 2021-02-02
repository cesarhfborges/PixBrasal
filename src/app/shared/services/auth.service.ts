import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import Usuario from '../models/usuario';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
    ) {
    }

    login(credentials: { email: string, password: string }): Observable<boolean> {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, credentials).pipe(map(response => {
            if (response.access_token !== undefined) {
                localStorage.setItem('credentials', JSON.stringify(response));
                return true;
            }
            return false;
        }));
    }

    tokenRefresh(): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/auth/refresh`, {});
    }

    getToken(): string {
        return this.isAuthenticated() ? JSON.parse(localStorage.getItem('credentials')).access_token : undefined;
    }

    getUsuario(): Usuario {
        return this.isAuthenticated() ? JSON.parse(localStorage.getItem('credentials')).user as Usuario : undefined;
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('credentials');
    }

    logout(): void {
        localStorage.clear();
    }
}
