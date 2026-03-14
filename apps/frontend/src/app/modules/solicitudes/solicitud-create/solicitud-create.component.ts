import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudService } from '../solicitud.service';
import { Solicitud } from '../../../shared/models/solicitud.model';

/**
 * Componente de creación para Solicitud
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-solicitud-create',
  standalone: false,
  templateUrl: './solicitud-create.component.html',
  styleUrl: './solicitud-create.component.scss',
})
export class SolicitudCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: SolicitudService,
    private router: Router
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
  }

  save() {
    if (this.form.valid) {
      this.loading = true;
      this.service.create(this.form.value).subscribe({
        next: () => {
          alert('Registro creado exitosamente');
          this.router.navigate(['/solicitudes']);
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
    this.router.navigate(['/solicitudes']);
  }
}
