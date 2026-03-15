import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoSolicitudService } from '../tipo-solicitud.service';
import { TipoSolicitud } from '../../../shared/models/tipo-solicitud.model';

/**
 * Componente de edición para TipoSolicitud
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-tipo-solicitud-edit',
  standalone: false,
  templateUrl: './tipo-solicitud-edit.component.html',
  styleUrl: './tipo-solicitud-edit.component.scss',
})
export class TipoSolicitudEdit implements OnInit {

  form: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private service: TipoSolicitudService,
    private router: Router,
    private route: ActivatedRoute
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
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadData(params['id']);
      }
    });

  }

  loadData(id: string) {
    this.service.getById(id).subscribe({
      next: (data: TipoSolicitud) => {
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
          this.router.navigate(['/tipo_solicitudes']);
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
    this.router.navigate(['/tipo_solicitudes']);
  }
}
