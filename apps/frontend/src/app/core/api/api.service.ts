import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  get(path: string) {
    return this.http.get(`${this.api}/${path}`);
  }

  post(path: string, body: any) {
    return this.http.post(`${this.api}/${path}`, body);
  }

  put(path: string, body: any) {
    return this.http.put(`${this.api}/${path}`, body);
  }

  delete(path: string) {
    return this.http.delete(`${this.api}/${path}`);
  }
}
