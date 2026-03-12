import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private readonly api = "http://localhost:3000";

  constructor(private readonly http: HttpClient) {}

  get(path: string) {
    return this.http.get(`${this.api}/${path}`);
  }

  post(path: string, body: unknown) {
    return this.http.post(`${this.api}/${path}`, body);
  }
}
