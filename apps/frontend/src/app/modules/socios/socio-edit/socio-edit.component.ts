import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SocioService } from '../socio.service';
import { Socio } from '../../../shared/models/socio.model';

/**
 * Componente de edición para Socio
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-socio-edit',
  standalone: false,
  templateUrl: './socio-edit.component.html',
  styleUrl: './socio-edit.component.scss',
})
export class SocioEdit implements OnInit {

  form: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private service: SocioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      rut: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      comunaId: [0, [Validators.required]],
      fechaIngreso: ['', [Validators.required]],
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
      next: (data: Socio) => {
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
          this.router.navigate(['/socios']);
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
    this.router.navigate(['/socios']);
  }
}
