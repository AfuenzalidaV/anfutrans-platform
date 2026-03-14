import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComunaService } from '../comuna.service';
import { Comuna } from '../../../shared/models/comuna.model';

/**
 * Componente de creación para Comuna
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-comuna-create',
  standalone: false,
  templateUrl: './comuna-create.component.html',
  styleUrl: './comuna-create.component.scss',
})
export class ComunaCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: ComunaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      regionId: [0, [Validators.required]],
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
          this.router.navigate(['/comunas']);
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
    this.router.navigate(['/comunas']);
  }
}
