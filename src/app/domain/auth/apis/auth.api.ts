import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { GoogleLoginRequest, LoginRequest, LoginResponse } from '../interfaces/login.interface';

@Injectable()
export class AuthApi {
  private http: HttpClient = inject(HttpClient);
  private readonly route: string = environment.api + '/auth';

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.route + '/login', data);
  }

  loginWithGoogle(data: GoogleLoginRequest): Observable<LoginResponse> {
    console.log('DATA: ', data);
    return this.http.post<LoginResponse>(this.route + '/login-google', data);
  }

  register(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.route + '/register', data);
  }
}
