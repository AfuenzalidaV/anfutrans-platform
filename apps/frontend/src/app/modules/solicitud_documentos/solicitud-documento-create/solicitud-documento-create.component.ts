import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudDocumentoService } from '../solicitud-documento.service';
import { SolicitudDocumento } from '../../../shared/models/solicitud-documento.model';

/**
 * Componente de creación para SolicitudDocumento
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-solicitud-documento-create',
  standalone: false,
  templateUrl: './solicitud-documento-create.component.html',
  styleUrl: './solicitud-documento-create.component.scss',
})
export class SolicitudDocumentoCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: SolicitudDocumentoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      solicitudId: ['', [Validators.required]],
      documentoId: ['', [Validators.required]]
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
          this.router.navigate(['/solicitud_documentos']);
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
    this.router.navigate(['/solicitud_documentos']);
  }
}
