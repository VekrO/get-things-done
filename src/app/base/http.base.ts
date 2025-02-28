import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export class HttpBase<T> {
  private http: HttpClient = inject(HttpClient);

  get(): Observable<T> {
    return this.http.get<T>('');
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>('');
  }

  post(data: T): Observable<T> {
    return this.http.post<T>('', data);
  }

  put(data: T): Observable<T> {
    return this.http.post<T>('', data);
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>('' + id);
  }
}
