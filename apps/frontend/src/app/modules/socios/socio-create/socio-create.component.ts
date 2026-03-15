import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocioService } from '../socio.service';
import { Socio } from '../../../shared/models/socio.model';

/**
 * Componente de creación para Socio
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-socio-create',
  standalone: false,
  templateUrl: './socio-create.component.html',
  styleUrl: './socio-create.component.scss',
})
export class SocioCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: SocioService,
    private router: Router
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
  }

  save() {
    if (this.form.valid) {
      this.loading = true;
      this.service.create(this.form.value).subscribe({
        next: () => {
          alert('Registro creado exitosamente');
          this.router.navigate(['/socios']);
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
    this.router.navigate(['/socios']);
  }
}
