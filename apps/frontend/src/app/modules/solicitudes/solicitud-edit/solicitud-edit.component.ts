import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudService } from '../solicitud.service';
import { Solicitud } from '../../../shared/models/solicitud.model';

/**
 * Componente de edición para Solicitud
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-solicitud-edit',
  standalone: false,
  templateUrl: './solicitud-edit.component.html',
  styleUrl: './solicitud-edit.component.scss',
})
export class SolicitudEdit implements OnInit {

  form: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private service: SolicitudService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      socioId: ['', [Validators.required]],
      tipoSolicitudId: [0, [Validators.required]],
      estadoSolicitudId: [0, [Validators.required]],
      fechaSolicitud: ['', [Validators.required]],
      observaciones: ['', [Validators.required]]
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
      next: (data: Solicitud) => {
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
          this.router.navigate(['/solicitudes']);
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
    this.router.navigate(['/solicitudes']);
  }
}
