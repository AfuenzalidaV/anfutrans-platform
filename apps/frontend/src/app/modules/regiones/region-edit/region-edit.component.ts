import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionService } from '../region.service';
import { Region } from '../../../shared/models/region.model';

/**
 * Componente de edición para Region
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-region-edit',
  standalone: false,
  templateUrl: './region-edit.component.html',
  styleUrl: './region-edit.component.scss',
})
export class RegionEdit implements OnInit {

  form: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private service: RegionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
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
      next: (data: Region) => {
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
          this.router.navigate(['/regiones']);
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
    this.router.navigate(['/regiones']);
  }
}
