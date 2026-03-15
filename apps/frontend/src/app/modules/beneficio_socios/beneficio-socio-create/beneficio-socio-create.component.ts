import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BeneficioSocioService } from '../beneficio-socio.service';
import { BeneficioSocio } from '../../../shared/models/beneficio-socio.model';

/**
 * Componente de creación para BeneficioSocio
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-beneficio-socio-create',
  standalone: false,
  templateUrl: './beneficio-socio-create.component.html',
  styleUrl: './beneficio-socio-create.component.scss',
})
export class BeneficioSocioCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: BeneficioSocioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      socioId: ['', [Validators.required]],
      beneficioId: ['', [Validators.required]],
      fechaOtorgamiento: ['', [Validators.required]],
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
          this.router.navigate(['/beneficio_socios']);
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
    this.router.navigate(['/beneficio_socios']);
  }
}
