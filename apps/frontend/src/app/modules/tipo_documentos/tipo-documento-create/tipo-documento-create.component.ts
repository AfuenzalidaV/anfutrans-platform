import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoDocumentoService } from '../tipo-documento.service';
import { TipoDocumento } from '../../../shared/models/tipo-documento.model';

/**
 * Componente de creación para TipoDocumento
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-tipo-documento-create',
  standalone: false,
  templateUrl: './tipo-documento-create.component.html',
  styleUrl: './tipo-documento-create.component.scss',
})
export class TipoDocumentoCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: TipoDocumentoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      ambito: ['', [Validators.required]],
      activo: [false, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  save() {
    if (this.form.valid) {
      this.loading = true;
      this.service.create(this.form.value).subscribe({
        next: () => {
          alert('Registro creado exitosamente');
          this.router.navigate(['/tipo_documentos']);
        },
        error: (error) => {
          console.error('Error al crear:', error);
          alert('Error al crear el registro');
          this.loading = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/tipo_documentos']);
  }
}
