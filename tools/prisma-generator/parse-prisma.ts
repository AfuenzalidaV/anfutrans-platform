import * as fs from 'fs';
import * as path from 'path';

/**
 * Tipos de campos Prisma a TypeScript
 */
const PRISMA_TO_TS_TYPES: Record<string, string> = {
  String: 'string',
  Int: 'number',
  BigInt: 'number',
  Float: 'number',
  Decimal: 'number',
  Boolean: 'boolean',
  DateTime: 'Date | string',
  Json: 'any',
  Bytes: 'Buffer',
  Uuid: 'string'
};

/**
 * Interfaz para representar un campo del modelo
 */
export interface PrismaField {
  name: string;
  type: string;
  tsType: string;
  isOptional: boolean;
  isArray: boolean;
  isRelation: boolean;
  relationModel?: string;
}

/**
 * Interfaz para representar un modelo completo
 */
export interface PrismaModel {
  name: string;
  pascalName: string;
  camelName: string;
  kebabName: string;
  pluralName: string;
  pascalPluralName: string;
  fields: PrismaField[];
  scalarFields: PrismaField[];
  relationFields: PrismaField[];
}

/**
 * Parser de Prisma Schema
 */
export class PrismaParser {
  private schemaContent: string;

  constructor(schemaPath: string) {
    this.schemaContent = fs.readFileSync(schemaPath, 'utf-8');
  }

  /**
   * Extrae todos los modelos del schema
   */
  public parseModels(): PrismaModel[] {
    const modelRegex = /model\s+(\w+)\s*{([^}]+)}/g;
    const models: PrismaModel[] = [];
    let match;

    while ((match = modelRegex.exec(this.schemaContent)) !== null) {
      const modelName = match[1];
      const modelContent = match[2];

      const model = this.parseModel(modelName, modelContent);
      models.push(model);
    }

    return models;
  }

  /**
   * Parsea un modelo individual
   */
  private parseModel(name: string, content: string): PrismaModel {
    const fields = this.parseFields(content);

    const pluralName = this.pluralize(name);

    return {
      name,
      pascalName: this.toPascalCase(name),
      camelName: this.toCamelCase(name),
      kebabName: this.toKebabCase(name),
      pluralName,
      pascalPluralName: this.toPascalCase(pluralName),
      fields,
      scalarFields: fields.filter(f => !f.isRelation),
      relationFields: fields.filter(f => f.isRelation)
    };
  }

  /**
   * Parsea los campos de un modelo
   */
  private parseFields(content: string): PrismaField[] {
    const lines = content.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('@@') && !l.startsWith('//'));
    const fields: PrismaField[] = [];

    for (const line of lines) {
      // Parsear línea de campo: nombre tipo modificadores
      const fieldMatch = line.match(/^(\w+)\s+(\w+)(\[\])?(\\?)?/);

      if (!fieldMatch) continue;

      const [, name, type, arrayModifier, optionalModifier] = fieldMatch;
      const isArray = !!arrayModifier;
      const isOptional = !!optionalModifier;

      // Detectar relaciones (tipos que no están en el mapeo de tipos primitivos)
      const isRelation = !(type in PRISMA_TO_TS_TYPES);

      let tsType: string;
      if (isRelation) {
        tsType = isArray ? `${type}[]` : type;
      } else {
        tsType = PRISMA_TO_TS_TYPES[type] || 'any';
        if (isArray) tsType += '[]';
      }

      fields.push({
        name,
        type,
        tsType,
        isOptional,
        isArray,
        isRelation,
        relationModel: isRelation ? type : undefined
      });
    }

    return fields;
  }

  /**
   * Convierte snake_case a PascalCase
   */
  private toPascalCase(str: string): string {
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  /**
   * Convierte snake_case a camelCase
   */
  private toCamelCase(str: string): string {
    const pascal = this.toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  /**
   * Convierte snake_case a kebab-case
   */
  private toKebabCase(str: string): string {
    return str.replace(/_/g, '-').toLowerCase();
  }

  /**
   * Pluraliza un nombre (reglas básicas español)
   */
  private pluralize(str: string): string {
    // Si ya termina en 's', retornar igual
    if (str.endsWith('s')) return str;

    // Si termina en vocal, agregar 's'
    if (/[aeiou]$/i.test(str)) return str + 's';

    // Otros casos, agregar 'es'
    return str + 'es';
  }
}

/**
 * Función helper para leer schema.prisma
 */
export function parsePrismaSchema(schemaPath: string): PrismaModel[] {
  const parser = new PrismaParser(schemaPath);
  return parser.parseModels();
}
