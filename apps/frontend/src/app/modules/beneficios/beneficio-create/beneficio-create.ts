import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BeneficiosService } from '../beneficios.service';

@Component({
  selector: 'app-beneficio-create',
  standalone: false,
  templateUrl: './beneficio-create.html',
  styleUrl: './beneficio-create.scss',
})
export class BeneficioCreate implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: BeneficiosService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required]],
      tipoBeneficioId: [1, [Validators.required]]
    });
  }

  ngOnInit() {}

  guardar() {
    if (this.form.valid) {
      this.service.createBeneficio(this.form.value).subscribe({
        next: () => {
          alert('Beneficio creado exitosamente');
          this.router.navigate(['/beneficios']);
        },
        error: (error) => {
          console.error('Error al crear beneficio:', error);
          alert('Error al crear beneficio');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/beneficios']);
  }

}
