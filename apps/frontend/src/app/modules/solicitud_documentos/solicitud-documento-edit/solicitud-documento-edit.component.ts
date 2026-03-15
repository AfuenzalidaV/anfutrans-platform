import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudDocumentoService } from '../solicitud-documento.service';
import { SolicitudDocumento } from '../../../shared/models/solicitud-documento.model';

/**
 * Componente de edición para SolicitudDocumento
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-solicitud-documento-edit',
  standalone: false,
  templateUrl: './solicitud-documento-edit.component.html',
  styleUrl: './solicitud-documento-edit.component.scss',
})
export class SolicitudDocumentoEdit implements OnInit {

  form: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private service: SolicitudDocumentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      solicitudId: ['', [Validators.required]],
      documentoId: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadData(params['id']);
      }
    });

  }

  loadData(id: string) {
    this.service.getById(id).subscribe({
      next: (data: SolicitudDocumento) => {
        this.form.patchValue(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar:', error);
        this.loading = false;
      }
    });
  }

  save() {
    if (this.form.valid) {
      this.loading = true;
      const id = this.route.snapshot.params['id'];
      this.service.update(id, this.form.value).subscribe({
        next: () => {
          alert('Registro actualizado exitosamente');
          this.router.navigate(['/solicitud_documentos']);
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          alert('Error al actualizar el registro');
          this.loading = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/solicitud_documentos']);
  }
}
