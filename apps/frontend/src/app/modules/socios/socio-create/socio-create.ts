import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SociosService } from '../socios.service';

@Component({
  selector: 'app-socio-create',
  standalone: false,
  templateUrl: './socio-create.html',
  styleUrl: './socio-create.scss',
})
export class SocioCreate implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sociosService: SociosService,
    private router: Router
  ) {
    this.form = this.fb.group({
      rut: ['', [Validators.required, Validators.pattern(/^[0-9]+-[0-9kK]{1}$/)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]],
      telefono: ['', [Validators.pattern(/^\+?[0-9]{8,15}$/)]],
      comunaId: [1, [Validators.required]]
    });
  }

  ngOnInit() {}

  guardar() {
    if (this.form.valid) {
      this.sociosService.createSocio(this.form.value).subscribe({
        next: () => {
          alert('Socio creado exitosamente');
          this.router.navigate(['/socios']);
        },
        error: (error) => {
          console.error('Error al crear socio:', error);
          alert('Error al crear socio');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/socios']);
  }

}
