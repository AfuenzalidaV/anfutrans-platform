import { PrismaModel } from '../parse-prisma';

/**
 * Genera el componente TypeScript de formulario
 */
export function generateFormComponentTemplate(model: PrismaModel, isEdit: boolean = false): string {
  const componentName = isEdit ? `${model.pascalName}Edit` : `${model.pascalName}Create`;
  const selectorSuffix = isEdit ? 'edit' : 'create';

  // Generar FormGroup con campos editables (excluyendo id, timestamps automáticos, etc.)
  const formFields = model.scalarFields
    .filter(f => !['id', 'createdAt', 'updatedAt'].includes(f.name))
    .map(field => {
      const validators = field.isOptional ? '[]' : '[Validators.required]';
      const defaultValue = getDefaultValue(field.tsType);
      return `      ${field.name}: [${defaultValue}, ${validators}]`;
    })
    .join(',\n');

  const loadDataMethod = isEdit ? `
  loadData(id: string) {
    this.service.getById(id).subscribe({
      next: (data: ${model.pascalName}) => {
        this.form.patchValue(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar:', error);
        this.loading = false;
      }
    });
  }
` : '';

  const ngOnInitContent = isEdit ? `
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadData(params['id']);
      }
    });
` : '';

  const saveMethod = isEdit ? `
  save() {
    if (this.form.valid) {
      this.loading = true;
      const id = this.route.snapshot.params['id'];
      this.service.update(id, this.form.value).subscribe({
        next: () => {
          alert('Registro actualizado exitosamente');
          this.router.navigate(['/${model.pluralName}']);
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          alert('Error al actualizar el registro');
          this.loading = false;
        }
      });
    }
  }
` : `
  save() {
    if (this.form.valid) {
      this.loading = true;
      this.service.create(this.form.value).subscribe({
        next: () => {
          alert('Registro creado exitosamente');
          this.router.navigate(['/${model.pluralName}']);
        },
        error: (error) => {
          console.error('Error al crear:', error);
          alert('Error al crear el registro');
          this.loading = false;
        }
      });
    }
  }
`;

  const imports = isEdit
    ? `import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';`
    : `import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';`;

  const constructorParams = isEdit
    ? `private fb: FormBuilder,
    private service: ${model.pascalName}Service,
    private router: Router,
    private route: ActivatedRoute`
    : `private fb: FormBuilder,
    private service: ${model.pascalName}Service,
    private router: Router`;

  return `${imports}
import { ${model.pascalName}Service } from '../${model.kebabName}.service';
import { ${model.pascalName} } from '../../../shared/models/${model.kebabName}.model';

/**
 * Componente de ${isEdit ? 'edición' : 'creación'} para ${model.pascalName}
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-${model.kebabName}-${selectorSuffix}',
  standalone: false,
  templateUrl: './${model.kebabName}-${selectorSuffix}.html',
  styleUrl: './${model.kebabName }-${selectorSuffix}.scss',
})
export class ${componentName} implements OnInit {

  form: FormGroup;
  loading = ${isEdit ? 'true' : 'false'};

  constructor(
    ${constructorParams}
  ) {
    this.form = this.fb.group({
${formFields}
    });
  }

  ngOnInit() {${ngOnInitContent}
  }
${loadDataMethod}${saveMethod}
  cancel() {
    this.router.navigate(['/${model.pluralName}']);
  }
}
`;
}

/**
 * Genera el template HTML de formulario
 */
export function generateFormHtmlTemplate(model: PrismaModel, isEdit: boolean = false): string {
  const title = isEdit ? `Editar ${model.pascalName}` : `Crear ${model.pascalName}`;

  const formFields = model.scalarFields
    .filter(f => !['id', 'createdAt', 'updatedAt'].includes(f.name))
    .map(field => {
      const inputType = getInputType(field.tsType);
      const required = field.isOptional ? '' : 'required';

      return `      <mat-form-field appearance="fill" class="full-width">
        <mat-label>${capitalizeFirst(field.name)}</mat-label>
        <input matInput type="${inputType}" formControlName="${field.name}" ${required}>
      </mat-form-field>`;
    })
    .join('\n\n');

  return `<mat-card>
  <mat-card-header>
    <mat-card-title>${title}</mat-card-title>
  </mat-card-header>

  <mat-card-content>
    <form [formGroup]="form">
${formFields}
    </form>
  </mat-card-content>

  <mat-card-actions align="end">
    <button mat-button (click)="cancel()" [disabled]="loading">
      Cancelar
    </button>
    <button mat-raised-button color="primary" (click)="save()" [disabled]="loading || !form.valid">
      {{ loading ? 'Guardando...' : 'Guardar' }}
    </button>
  </mat-card-actions>
</mat-card>
`;
}

/**
 * Genera el SCSS de formulario
 */
export function generateFormScssTemplate(): string {
  return `mat-card {
  max-width: 800px;
  margin: 20px auto;
}

.full-width {
  width: 100%;
  margin-bottom: 16px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 0;
}
`;
}

/**
 * Helpers
 */
function getDefaultValue(tsType: string): string {
  if (tsType.includes('string')) return "''";
  if (tsType.includes('number')) return '0';
  if (tsType.includes('boolean')) return 'false';
  if (tsType.includes('Date')) return 'null';
  return 'null';
}

function getInputType(tsType: string): string {
  if (tsType.includes('number')) return 'number';
  if (tsType.includes('Date')) return 'date';
  if (tsType.includes('boolean')) return 'checkbox';
  return 'text';
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
