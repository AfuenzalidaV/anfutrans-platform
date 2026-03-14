import { PrismaModel } from '../parse-prisma';

/**
 * Genera el servicio Angular para un modelo
 */
export function generateServiceTemplate(model: PrismaModel): string {
  return `import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { ${model.pascalName} } from '../../shared/models/${model.kebabName}.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de ${model.pascalName}
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class ${model.pascalName}Service {

  private readonly endpoint = '${model.pluralName}';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de ${model.pascalName}
   */
  getAll(): Observable<${model.pascalName}[]> {
    return this.api.get(this.endpoint) as Observable<${model.pascalName}[]>;
  }

  /**
   * Obtiene un ${model.pascalName} por ID
   */
  getById(id: string | number): Observable<${model.pascalName}> {
    return this.api.get(\`\${this.endpoint}/\${id}\`) as Observable<${model.pascalName}>;
  }

  /**
   * Crea un nuevo ${model.pascalName}
   */
  create(data: Partial<${model.pascalName}>): Observable<${model.pascalName}> {
    return this.api.post(this.endpoint, data) as Observable<${model.pascalName}>;
  }

  /**
   * Actualiza un ${model.pascalName} existente
   */
  update(id: string | number, data: Partial<${model.pascalName}>): Observable<${model.pascalName}> {
    return this.api.put(\`\${this.endpoint}/\${id}\`, data) as Observable<${model.pascalName}>;
  }

  /**
   * Elimina un ${model.pascalName}
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(\`\${this.endpoint}/\${id}\`) as Observable<void>;
  }
}
`;
}
