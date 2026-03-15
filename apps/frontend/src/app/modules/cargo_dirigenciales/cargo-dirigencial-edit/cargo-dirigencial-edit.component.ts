import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CargoDirigencialService } from '../cargo-dirigencial.service';
import { CargoDirigencial } from '../../../shared/models/cargo-dirigencial.model';

/**
 * Componente de edición para CargoDirigencial
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-cargo-dirigencial-edit',
  standalone: false,
  templateUrl: './cargo-dirigencial-edit.component.html',
  styleUrl: './cargo-dirigencial-edit.component.scss',
})
export class CargoDirigencialEdit implements OnInit {

  form: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private service: CargoDirigencialService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      activo: [false, [Validators.required]]
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
      next: (data: CargoDirigencial) => {
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
          this.router.navigate(['/cargo_dirigenciales']);
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
    this.router.navigate(['/cargo_dirigenciales']);
  }
}
