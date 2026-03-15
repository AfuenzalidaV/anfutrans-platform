import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParametroSistemaService } from '../parametro-sistema.service';
import { ParametroSistema } from '../../../shared/models/parametro-sistema.model';

/**
 * Componente de creación para ParametroSistema
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-parametro-sistema-create',
  standalone: false,
  templateUrl: './parametro-sistema-create.component.html',
  styleUrl: './parametro-sistema-create.component.scss',
})
export class ParametroSistemaCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: ParametroSistemaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      clave: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
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
          this.router.navigate(['/parametro_sistemas']);
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
    this.router.navigate(['/parametro_sistemas']);
  }
}
