import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';

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
  }

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  onLogin() {
    // Por ahora simulamos login exitoso
    // TODO: Implementar llamada real al backend
    localStorage.setItem('token', 'demo-token-123')
    this.router.navigate(['/dashboard'])

    // Descomentar cuando el backend esté listo:
    // this.api.post('auth/login', this.credentials).subscribe({
    //   next: (response: any) => {
    //     localStorage.setItem('token', response.token)
    //     this.router.navigate(['/dashboard'])
    //   },
    //   error: (error) => {
    //     console.error('Error en login:', error)
    //     alert('Credenciales inválidas')
    //   }
    // })
  }

}
