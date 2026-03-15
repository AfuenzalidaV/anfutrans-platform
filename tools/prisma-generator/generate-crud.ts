#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { PrismaParser, PrismaModel } from './parse-prisma';
import { generateModelTemplate } from './templates/model.template';
import { generateServiceTemplate } from './templates/service.template';
import {
  generateTableComponentTemplate,
  generateTableHtmlTemplate,
  generateTableScssTemplate
} from './templates/table.template';
import {
  generateFormComponentTemplate,
  generateFormHtmlTemplate,
  generateFormScssTemplate
} from './templates/form.template';

/**
 * 🚀 GENERADOR AUTOMÁTICO DE CRUD DESDE PRISMA SCHEMA
 *
 * Lee el schema.prisma del backend y genera automáticamente:
 * - Models (TypeScript interfaces)
 * - Services (Angular services con operaciones CRUD)
 * - Components (Table, Create, Edit)
 * - Templates HTML
 * - Estilos SCSS
 * - Routing y módulos
 *
 * Uso: npm run generate:crud
 */

const SCHEMA_PATH = path.join(__dirname, '../../apps/backend/prisma/schema.prisma');
const FRONTEND_PATH = path.join(__dirname, '../../apps/frontend/src/app');
const MODELS_PATH = path.join(FRONTEND_PATH, 'shared/models');
const MODULES_PATH = path.join(FRONTEND_PATH, 'modules');

class CRUDGenerator {
  private parser: PrismaParser;
  private models: PrismaModel[] = [];

  constructor() {
    this.parser = new PrismaParser(SCHEMA_PATH);
  }

  /**
   * Ejecuta el proceso completo de generación
   */
  async generate() {
    console.log('🚀 Iniciando generación automática de CRUD...\n');

    // 1. Parsear schema.prisma
    console.log('📖 Leyendo schema.prisma...');
    this.models = this.parser.parseModels();
    console.log(`✅ ${this.models.length} modelos encontrados\n`);

    // 2. Generar modelos TypeScript
    console.log('🔧 Generando modelos TypeScript...');
    this.generateModels();
    console.log(`✅ ${this.models.length} modelos generados\n`);

    // 3. Generar servicios
    console.log('🔧 Generando servicios Angular...');
    this.generateServices();
    console.log(`✅ ${this.models.length} servicios generados\n`);

    // 4. Generar componentes CRUD
    console.log('🔧 Generando componentes CRUD...');
    this.generateComponents();
    console.log(`✅ ${this.models.length * 3} componentes generados (tabla + create + edit)\n`);

    // 5. Generar módulos y routing
    console.log('🔧 Generando módulos y routing...');
    this.generateModules();
    console.log(`✅ ${this.models.length} módulos generados\n`);

    console.log('✨ ¡Generación completada exitosamente!');
    console.log(`\n📊 Resumen:
   - ${this.models.length} modelos TypeScript
   - ${this.models.length} servicios Angular
   - ${this.models.length * 3} componentes (tabla, create, edit)
   - ${this.models.length} módulos con routing
    `);
  }

  /**
   * Genera los archivos de modelos TypeScript
   */
  private generateModels() {
    this.ensureDirectoryExists(MODELS_PATH);

    this.models.forEach(model => {
      const modelContent = generateModelTemplate(model);
      const modelPath = path.join(MODELS_PATH, `${model.kebabName}.model.ts`);
      fs.writeFileSync(modelPath, modelContent, 'utf-8');
      console.log(`  ✓ ${model.kebabName}.model.ts`);
    });
  }

  /**
   * Genera los servicios Angular
   */
  private generateServices() {
    this.models.forEach(model => {
      const modulePath = path.join(MODULES_PATH, model.pluralName);
      this.ensureDirectoryExists(modulePath);

      const serviceContent = generateServiceTemplate(model);
      const servicePath = path.join(modulePath, `${model.kebabName}.service.ts`);
      fs.writeFileSync(servicePath, serviceContent, 'utf-8');
      console.log(`  ✓ ${model.pluralName}/${model.kebabName}.service.ts`);
    });
  }

  /**
   * Genera los componentes CRUD (tabla, create, edit)
   */
  private generateComponents() {
    this.models.forEach(model => {
      const modulePath = path.join(MODULES_PATH, model.pluralName);

      // 1. Componente de tabla (listado)
      this.generateTableComponent(model, modulePath);

      // 2. Componente de creación
      this.generateFormComponent(model, modulePath, 'create');

      // 3. Componente de edición
      this.generateFormComponent(model, modulePath, 'edit');
    });
  }

  /**
   * Genera el componente de tabla
   */
  private generateTableComponent(model: PrismaModel, modulePath: string) {
    const tableDir = path.join(modulePath, `${model.kebabName}-table`);
    this.ensureDirectoryExists(tableDir);

    // TypeScript
    const tsContent = generateTableComponentTemplate(model);
    fs.writeFileSync(
      path.join(tableDir, `${model.kebabName}-table.component.ts`),
      tsContent,
      'utf-8'
    );

    // HTML
    const htmlContent = generateTableHtmlTemplate(model);
    fs.writeFileSync(
      path.join(tableDir, `${model.kebabName}-table.component.html`),
      htmlContent,
      'utf-8'
    );

    // SCSS
    const scssContent = generateTableScssTemplate();
    fs.writeFileSync(
      path.join(tableDir, `${model.kebabName}-table.component.scss`),
      scssContent,
      'utf-8'
    );

    console.log(`  ✓ ${model.pluralName}/${model.kebabName}-table/`);
  }

  /**
   * Genera los componentes de formulario (create/edit)
   */
  private generateFormComponent(model: PrismaModel, modulePath: string, type: 'create' | 'edit') {
    const isEdit = type === 'edit';
    const componentDir = path.join(modulePath, `${model.kebabName}-${type}`);
    this.ensureDirectoryExists(componentDir);

    // TypeScript
    const tsContent = generateFormComponentTemplate(model, isEdit);
    fs.writeFileSync(
      path.join(componentDir, `${model.kebabName}-${type}.component.ts`),
      tsContent,
      'utf-8'
    );

    // HTML
    const htmlContent = generateFormHtmlTemplate(model, isEdit);
    fs.writeFileSync(
      path.join(componentDir, `${model.kebabName}-${type}.component.html`),
      htmlContent,
      'utf-8'
    );

    // SCSS
    const scssContent = generateFormScssTemplate();
    fs.writeFileSync(
      path.join(componentDir, `${model.kebabName}-${type}.component.scss`),
      scssContent,
      'utf-8'
    );

    console.log(`  ✓ ${model.pluralName}/${model.kebabName}-${type}/`);
  }

  /**
   * Genera los módulos y routing
   */
  private generateModules() {
    this.models.forEach(model => {
      const modulePath = path.join(MODULES_PATH, model.pluralName);

      // Module
      const moduleContent = this.generateModuleTemplate(model);
      fs.writeFileSync(
        path.join(modulePath, `${model.pluralName}.module.ts`),
        moduleContent,
        'utf-8'
      );

      // Routing
      const routingContent = this.generateRoutingTemplate(model);
      fs.writeFileSync(
        path.join(modulePath, `${model.pluralName}-routing.module.ts`),
        routingContent,
        'utf-8'
      );

      console.log(`  ✓ ${model.pluralName}.module.ts + routing`);
    });
  }

  /**
   * Genera el template del módulo Angular
   */
  private generateModuleTemplate(model: PrismaModel): string {
    return `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { ${model.pascalName}Table } from './${model.kebabName}-table/${model.kebabName}-table.component';
import { ${model.pascalName}Create } from './${model.kebabName}-create/${model.kebabName}-create.component';
import { ${model.pascalName}Edit } from './${model.kebabName}-edit/${model.kebabName}-edit.component';
import { ${model.pascalName}Service } from './${model.kebabName}.service';
import { ${model.pascalPluralName}RoutingModule } from './${model.pluralName}-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de ${model.pascalName}
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    ${model.pascalName}Table,
    ${model.pascalName}Create,
    ${model.pascalName}Edit
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ${model.pascalPluralName}RoutingModule,
    SharedModule
  ],
  providers: [${model.pascalName}Service]
})
export class ${model.pascalPluralName}Module { }
`;
  }

  /**
   * Genera el template del routing
   */
  private generateRoutingTemplate(model: PrismaModel): string {
    return `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ${model.pascalName}Table } from './${model.kebabName}-table/${model.kebabName}-table.component';
import { ${model.pascalName}Create } from './${model.kebabName}-create/${model.kebabName}-create.component';
import { ${model.pascalName}Edit } from './${model.kebabName}-edit/${model.kebabName}-edit.component';

const routes: Routes = [
  { path: '', component: ${model.pascalName}Table },
  { path: 'create' , component: ${model.pascalName}Create },
  { path: 'edit/:id', component: ${model.pascalName}Edit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ${model.pascalPluralName}RoutingModule { }
`;
  }

  /**
   * Asegura que un directorio existe, creándolo si es necesario
   */
  private ensureDirectoryExists(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
}

// Ejecutar generador
const generator = new CRUDGenerator();
generator.generate().catch(error => {
  console.error('❌ Error durante la generación:', error);
  process.exit(1);
});
