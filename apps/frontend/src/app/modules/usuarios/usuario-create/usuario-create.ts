import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuario-create',
  standalone: false,
  templateUrl: './usuario-create.html',
  styleUrl: './usuario-create.scss',
})
export class UsuarioCreate implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: UsuariosService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      rolId: [2, [Validators.required]]
    });
  }

  ngOnInit() {}

  guardar() {
    if (this.form.valid) {
      this.service.createUsuario(this.form.value).subscribe({
        next: () => {
          alert('Usuario creado exitosamente');
          this.router.navigate(['/usuarios']);
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          alert('Error al crear usuario');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }

}
