import { Injectable } from "@angular/core";
import { ApiService } from "../../core/api/api.service";

@Injectable({
  providedIn: "root",
})
export class SociosService {
  constructor(private readonly api: ApiService) {}

  getSocios() {
    return this.api.get("socios");
  }

  createSocio(data: unknown) {
    return this.api.post("socios", data);
  }
}
