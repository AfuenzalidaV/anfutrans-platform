import { PrismaModel } from '../parse-prisma';

/**
 * Genera el componente TypeScript de tabla
 */
export function generateTableComponentTemplate(model: PrismaModel): string {
  // Tomar los primeros 5 campos escalares para mostrar en la tabla
  const displayFields = model.scalarFields.slice(0, 5).map(f => `'${f.name}'`).join(', ');

  return `import { Component, OnInit } from '@angular/core';
import { ${model.pascalName}Service } from '../${model.kebabName}.service';
import { ${model.pascalName} } from '../../../shared/models/${model.kebabName}.model';

/**
 * Componente de tabla para ${model.pascalName}
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-${model.kebabName}-table',
  standalone: false,
  templateUrl: './${model.kebabName}-table.html',
  styleUrl: './${model.kebabName}-table.scss',
})
export class ${model.pascalName}Table implements OnInit {

  data: ${model.pascalName}[] = [];
  columns = [${displayFields}];
  loading = false;

  constructor(private service: ${model.pascalName}Service) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (response: any) => {
        this.data = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar ${model.pluralName}:', error);
        this.loading = false;
        // Datos demo para testing
        this.data = [];
      }
    });
  }

  onDelete(id: string | number) {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.loadData();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar el registro');
        }
      });
    }
  }
}
`;
}

/**
 * Genera el template HTML de tabla
 */
export function generateTableHtmlTemplate(model: PrismaModel): string {
  return `<mat-card>
  <mat-card-header>
    <mat-card-title>${model.pascalName}</mat-card-title>
  </mat-card-header>

  <mat-card-content>
    <div *ngIf="loading" class="loading-spinner">
      <mat-spinner></mat-spinner>
    </div>

    <app-data-table
      *ngIf="!loading"
      [data]="data"
      [columns]="columns">
    </app-data-table>
  </mat-card-content>

  <mat-card-actions align="end">
    <button mat-raised-button color="primary" routerLink="/${model.pluralName}/nuevo">
      <mat-icon>add</mat-icon>
      Nuevo
    </button>
  </mat-card-actions>
</mat-card>
`;
}

/**
 * Genera el SCSS de tabla
 */
export function generateTableScssTemplate(): string {
  return `.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

mat-card {
  margin: 20px;
}
`;
}
