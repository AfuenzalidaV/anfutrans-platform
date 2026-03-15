import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ParametroSistemaService } from '../parametro-sistema.service';
import { ParametroSistema } from '../../../shared/models/parametro-sistema.model';

/**
 * Componente de edición para ParametroSistema
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-parametro-sistema-edit',
  standalone: false,
  templateUrl: './parametro-sistema-edit.component.html',
  styleUrl: './parametro-sistema-edit.component.scss',
})
export class ParametroSistemaEdit implements OnInit {

  form: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private service: ParametroSistemaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      clave: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadData(params['id']);
      }
    });

  }

  loadData(id: string) {
    this.service.getById(id).subscribe({
      next: (data: ParametroSistema) => {
        this.form.patchValue(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar:', error);
        this.loading = false;
      }
    });
  }

  save() {
    if (this.form.valid) {
      this.loading = true;
      const id = this.route.snapshot.params['id'];
      this.service.update(id, this.form.value).subscribe({
        next: () => {
          alert('Registro actualizado exitosamente');
          this.router.navigate(['/parametro_sistemas']);
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          alert('Error al actualizar el registro');
          this.loading = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/parametro_sistemas']);
  }
}
