import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fullname: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  /*
  register() {
    this.authService.registerUser(this.username, this.password).subscribe(
      (response) => {
        Swal.fire('¡Éxito!', 'Registro exitoso. Ahora inicia sesión.', 'success');
        this.router.navigate(['/login']); // Navegar al inicio de sesión
      },
      (error) => {
        Swal.fire('Error', 'No se pudo completar el registro.', 'error');
      }
    );
  }*/

  register() {
    if (this.password !== this.confirmPassword) {
      
      Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
      return;
    }
    if (!this.isValidEmail(this.email)) {
      Swal.fire('Error', 'El correo no es valido.', 'error');
      return;
    }

    this.authService.registerUser( this.username, this.password).subscribe(
      (response) => {
        
      },
      (error) => {
        
      }
    );

    this.authService.registerProfile(this.fullname, this.email, this.username, this.password).subscribe(
      (response) => {
        Swal.fire('¡Éxito!', 'Registro exitoso. Ahora inicia sesión.', 'success');
        this.router.navigate(['/login']); // Navegar al inicio de sesión
      },
      (error) => {
        Swal.fire('Error', 'No se pudo completar el registro.', 'error');
      }
    );
  }



  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
