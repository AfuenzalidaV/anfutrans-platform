import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TramitesService } from '../tramites.service';

@Component({
  selector: 'app-tramite-create',
  standalone: false,
  templateUrl: './tramite-create.html',
  styleUrl: './tramite-create.scss',
})
export class TramiteCreate implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: TramitesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      socioId: ['', [Validators.required]],
      tipoSolicitudId: [1, [Validators.required]],
      observaciones: [''],
      estadoSolicitudId: [1, [Validators.required]]
    });
  }

  ngOnInit() {}

  guardar() {
    if (this.form.valid) {
      this.service.createTramite(this.form.value).subscribe({
        next: () => {
          alert('Trámite creado exitosamente');
          this.router.navigate(['/tramites']);
        },
        error: (error) => {
          console.error('Error al crear trámite:', error);
          alert('Error al crear trámite');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/tramites']);
  }

}
