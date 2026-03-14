import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentoService } from '../documento.service';
import { Documento } from '../../../shared/models/documento.model';

/**
 * Componente de creación para Documento
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-documento-create',
  standalone: false,
  templateUrl: './documento-create.component.html',
  styleUrl: './documento-create.component.scss',
})
export class DocumentoCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: DocumentoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombreArchivo: ['', [Validators.required]],
      ruta: ['', [Validators.required]],
      tipoDocumentoId: [0, [Validators.required]],
      usuarioId: ['', [Validators.required]],
      tamanioBytes: [0, [Validators.required]],
      fechaSubida: ['', [Validators.required]]
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
          this.router.navigate(['/documentos']);
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
    this.router.navigate(['/documentos']);
  }
}
