import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegionService } from '../region.service';
import { Region } from '../../../shared/models/region.model';

/**
 * Componente de creación para Region
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-region-create',
  standalone: false,
  templateUrl: './region-create.component.html',
  styleUrl: './region-create.component.scss',
})
export class RegionCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: RegionService,
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
          this.router.navigate(['/regiones']);
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
    this.router.navigate(['/regiones']);
  }
}
