import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  get<T = any>(path: string): Observable<T> {
    return this.http.get<T>(`${this.api}/${path}`);
  }

  post<T = any>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.api}/${path}`, body);
  }

  put<T = any>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.api}/${path}`, body);
  }

  delete(path: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${path}`);
  }
}
