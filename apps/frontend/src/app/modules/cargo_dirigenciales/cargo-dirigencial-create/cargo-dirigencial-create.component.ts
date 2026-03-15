import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CargoDirigencialService } from '../cargo-dirigencial.service';
import { CargoDirigencial } from '../../../shared/models/cargo-dirigencial.model';

/**
 * Componente de creación para CargoDirigencial
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-cargo-dirigencial-create',
  standalone: false,
  templateUrl: './cargo-dirigencial-create.component.html',
  styleUrl: './cargo-dirigencial-create.component.scss',
})
export class CargoDirigencialCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: CargoDirigencialService,
    private router: Router
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
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
          this.router.navigate(['/cargo_dirigenciales']);
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
    this.router.navigate(['/cargo_dirigenciales']);
  }
}
