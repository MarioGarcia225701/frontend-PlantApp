import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  login() {
    this.authService.loginUser(this.username, this.password).subscribe(
      (response) => {
        Swal.fire('¡Bienvenido!', 'Inicio de sesión exitoso.', 'success');
        localStorage.setItem('loggedInUser', this.username);
        // Registrar el login en el backend
        this.http.post('http://localhost:3000/log-login', { username: this.username }).subscribe({
          next: () => {
            console.log('Login registrado correctamente.');
          },
          error: (err) => {
            console.error('Error al registrar el login:', err);
          }
        });
        
        this.router.navigate(['/home']); // Navegar a la página principal
      },
      (error) => {
        Swal.fire('Error', 'Credenciales inválidas.', 'error');
      }
    );
  }

}
