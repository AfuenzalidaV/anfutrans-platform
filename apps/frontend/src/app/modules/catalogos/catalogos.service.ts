import { Injectable } from "@angular/core";
import { ApiService } from "../../core/api/api.service";

@Injectable({
  providedIn: "root",
})
export class CatalogosService {
  constructor(private readonly api: ApiService) {}

  getRegiones() {
    return this.api.get("catalogos/regiones");
  }

  getComunas() {
    return this.api.get("catalogos/comunas");
  }
}
