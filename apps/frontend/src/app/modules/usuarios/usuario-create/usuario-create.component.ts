import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../../../shared/models/usuario.model';

/**
 * Componente de creación para Usuario
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-usuario-create',
  standalone: false,
  templateUrl: './usuario-create.component.html',
  styleUrl: './usuario-create.component.scss',
})
export class UsuarioCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: UsuarioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      passwordHash: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      rolId: [0, [Validators.required]],
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
          this.router.navigate(['/usuarios']);
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
    this.router.navigate(['/usuarios']);
  }
}
