import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoBeneficioService } from '../tipo-beneficio.service';
import { TipoBeneficio } from '../../../shared/models/tipo-beneficio.model';

/**
 * Componente de creación para TipoBeneficio
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-tipo-beneficio-create',
  standalone: false,
  templateUrl: './tipo-beneficio-create.component.html',
  styleUrl: './tipo-beneficio-create.component.scss',
})
export class TipoBeneficioCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: TipoBeneficioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
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
          this.router.navigate(['/tipo_beneficios']);
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
    this.router.navigate(['/tipo_beneficios']);
  }
}
