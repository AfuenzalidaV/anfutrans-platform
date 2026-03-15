import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudHistorialService } from '../solicitud-historial.service';
import { SolicitudHistorial } from '../../../shared/models/solicitud-historial.model';

/**
 * Componente de edición para SolicitudHistorial
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-solicitud-historial-edit',
  standalone: false,
  templateUrl: './solicitud-historial-edit.component.html',
  styleUrl: './solicitud-historial-edit.component.scss',
})
export class SolicitudHistorialEdit implements OnInit {

  form: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private service: SolicitudHistorialService,
    private router: Router,
    private route: ActivatedRoute
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
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadData(params['id']);
      }
    });

  }

  loadData(id: string) {
    this.service.getById(id).subscribe({
      next: (data: SolicitudHistorial) => {
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
          this.router.navigate(['/solicitud_historiales']);
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
    this.router.navigate(['/solicitud_historiales']);
  }
}
