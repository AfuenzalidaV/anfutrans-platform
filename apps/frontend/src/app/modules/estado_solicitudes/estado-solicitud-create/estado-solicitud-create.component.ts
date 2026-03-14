import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoSolicitudService } from '../estado-solicitud.service';
import { EstadoSolicitud } from '../../../shared/models/estado-solicitud.model';

/**
 * Componente de creación para EstadoSolicitud
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-estado-solicitud-create',
  standalone: false,
  templateUrl: './estado-solicitud-create.component.html',
  styleUrl: './estado-solicitud-create.component.scss',
})
export class EstadoSolicitudCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: EstadoSolicitudService,
    private router: Router
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      orden: [0, [Validators.required]],
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
          this.router.navigate(['/estado_solicitudes']);
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
    this.router.navigate(['/estado_solicitudes']);
  }
}
