import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudHistorialService } from '../solicitud-historial.service';
import { SolicitudHistorial } from '../../../shared/models/solicitud-historial.model';

/**
 * Componente de creación para SolicitudHistorial
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-solicitud-historial-create',
  standalone: false,
  templateUrl: './solicitud-historial-create.component.html',
  styleUrl: './solicitud-historial-create.component.scss',
})
export class SolicitudHistorialCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: SolicitudHistorialService,
    private router: Router
  ) {
    this.form = this.fb.group({
      solicitudId: ['', [Validators.required]],
      estadoSolicitudId: [0, [Validators.required]],
      usuarioId: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      comentario: ['', [Validators.required]]
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
          this.router.navigate(['/solicitud_historiales']);
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
    this.router.navigate(['/solicitud_historiales']);
  }
}
