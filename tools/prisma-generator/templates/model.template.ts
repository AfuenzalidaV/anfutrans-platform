import { PrismaModel } from '../parse-prisma';

/**
 * Genera la interfaz TypeScript para un modelo
 */
export function generateModelTemplate(model: PrismaModel): string {
  const fields = model.scalarFields.map(field => {
    const optional = field.isOptional ? '?' : '';
    return `  ${field.name}${optional}: ${field.tsType};`;
  }).join('\n');

  return `/**
 * Modelo ${model.pascalName}
 * Generado automáticamente desde Prisma Schema
 */
export interface ${model.pascalName} {
${fields}
}
`;
}
