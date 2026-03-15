import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BeneficioSocioService } from '../beneficio-socio.service';
import { BeneficioSocio } from '../../../shared/models/beneficio-socio.model';

/**
 * Componente de edición para BeneficioSocio
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-beneficio-socio-edit',
  standalone: false,
  templateUrl: './beneficio-socio-edit.component.html',
  styleUrl: './beneficio-socio-edit.component.scss',
})
export class BeneficioSocioEdit implements OnInit {

  form: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private service: BeneficioSocioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      socioId: ['', [Validators.required]],
      beneficioId: ['', [Validators.required]],
      fechaOtorgamiento: ['', [Validators.required]],
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
      next: (data: BeneficioSocio) => {
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
          this.router.navigate(['/beneficio_socios']);
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
    this.router.navigate(['/beneficio_socios']);
  }
}
