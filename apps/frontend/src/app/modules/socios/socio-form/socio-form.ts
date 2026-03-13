import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SociosService } from '../socios.service';

@Component({
  selector: 'app-socio-form',
  standalone: false,
  templateUrl: './socio-form.html',
  styleUrl: './socio-form.scss',
})
export class SocioForm implements OnInit {

  form: FormGroup;
  loading = false;

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
      this.loading = true;

      this.sociosService.createSocio(this.form.value).subscribe({
        next: (response) => {
          alert('Socio creado exitosamente');
          this.router.navigate(['/socios']);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al crear socio:', error);
          alert('Error al crear socio. Por favor intente nuevamente.');
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.form);
      alert('Por favor complete todos los campos requeridos correctamente');
    }
  }

  cancelar() {
    this.router.navigate(['/socios']);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

}
