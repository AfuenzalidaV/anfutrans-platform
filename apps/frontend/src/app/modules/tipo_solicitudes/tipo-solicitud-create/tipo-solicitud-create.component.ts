import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoSolicitudService } from '../tipo-solicitud.service';
import { TipoSolicitud } from '../../../shared/models/tipo-solicitud.model';

/**
 * Componente de creación para TipoSolicitud
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-tipo-solicitud-create',
  standalone: false,
  templateUrl: './tipo-solicitud-create.component.html',
  styleUrl: './tipo-solicitud-create.component.scss',
})
export class TipoSolicitudCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: TipoSolicitudService,
    private router: Router
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      requiereAprobacion: [false, [Validators.required]],
      permiteBorrador: [false, [Validators.required]],
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
          this.router.navigate(['/tipo_solicitudes']);
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
    this.router.navigate(['/tipo_solicitudes']);
  }
}
