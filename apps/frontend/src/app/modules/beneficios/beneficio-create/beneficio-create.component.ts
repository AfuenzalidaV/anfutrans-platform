import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BeneficioService } from '../beneficio.service';
import { Beneficio } from '../../../shared/models/beneficio.model';

/**
 * Componente de creación para Beneficio
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-beneficio-create',
  standalone: false,
  templateUrl: './beneficio-create.component.html',
  styleUrl: './beneficio-create.component.scss',
})
export class BeneficioCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: BeneficioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipoBeneficioId: [0, [Validators.required]],
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
          this.router.navigate(['/beneficios']);
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
    this.router.navigate(['/beneficios']);
  }
}
