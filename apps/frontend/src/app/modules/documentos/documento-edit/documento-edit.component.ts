import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentoService } from '../documento.service';
import { Documento } from '../../../shared/models/documento.model';

/**
 * Componente de edición para Documento
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-documento-edit',
  standalone: false,
  templateUrl: './documento-edit.component.html',
  styleUrl: './documento-edit.component.scss',
})
export class DocumentoEdit implements OnInit {

  form: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private service: DocumentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombreArchivo: ['', [Validators.required]],
      ruta: ['', [Validators.required]],
      tipoDocumentoId: [0, [Validators.required]],
      usuarioId: ['', [Validators.required]],
      tamanioBytes: [0, [Validators.required]],
      fechaSubida: ['', [Validators.required]]
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
      next: (data: Documento) => {
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
          this.router.navigate(['/documentos']);
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
    this.router.navigate(['/documentos']);
  }
}
