import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable()
export class AuthService {
  saveToken(token: string) {
    localStorage.setItem('gtd-user-token', token);
  }
  getToken(): string {
    return localStorage.getItem('gtd-user-token') || '';
  }
  isValid(token: string) {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      if (!decoded.exp) {
        throw new Error('Token sem data de expiração!');
      }
      const expirationDate = new Date(decoded.exp * 1000);
      return expirationDate > new Date();
    } catch (err) {
      console.log('ERRO: ', err);
      return false;
    }
  }
}
