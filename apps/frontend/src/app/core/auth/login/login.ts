import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { NotificationService } from '../../services/notification.service';

/**
 * Login Component - FASE 8
 * Actualizado para usar backend real con interceptores HTTP
 */
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  credentials = {
    email: '',
    password: ''
  };

  loading = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onLogin() {
    // Validación básica
    if (!this.credentials.email || !this.credentials.password) {
      this.notificationService.warning('Por favor complete todos los campos.');
      return;
    }

    this.loading = true;

    // Llamada real al backend
    this.api.post('auth/login', this.credentials).subscribe({
      next: (response: any) => {
        // Guardar token en localStorage
        localStorage.setItem('token', response.access_token);

        // Notificar éxito
        this.notificationService.success('Inicio de sesión exitoso');

        // Redirigir al dashboard
        this.router.navigate(['/dashboard']);

        this.loading = false;
      },
      error: (error) => {
        console.error('Error en login:', error);

        // El errorInterceptor ya muestra la notificación
        // Solo manejamos el estado de loading
        this.loading = false;

        // Limpiar password por seguridad
        this.credentials.password = '';
      }
    });
  }

}
