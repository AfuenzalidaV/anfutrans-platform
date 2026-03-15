import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoCertificadoService } from '../tipo-certificado.service';
import { TipoCertificado } from '../../../shared/models/tipo-certificado.model';

/**
 * Componente de creación para TipoCertificado
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-tipo-certificado-create',
  standalone: false,
  templateUrl: './tipo-certificado-create.component.html',
  styleUrl: './tipo-certificado-create.component.scss',
})
export class TipoCertificadoCreate implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: TipoCertificadoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      requiereVigencia: [false, [Validators.required]],
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
          this.router.navigate(['/tipo_certificados']);
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
    this.router.navigate(['/tipo_certificados']);
  }
}
