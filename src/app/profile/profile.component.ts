import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile: any = null;

  constructor(private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit() {
      if (isPlatformBrowser(this.platformId)) {
        const username = localStorage.getItem('loggedInUser');
        if (username) {
          this.http.get(`/api/profile/${username}`).subscribe(
            (data) => (this.profile = data),
            (error) => console.error('Error al cargar el perfil:', error)
          );
        }
      }
    }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('loggedInUser'); // Borra el usuario del localStorage
    }
    Swal.fire('', 'Sesion cerrada correctamente.', 'success');
    this.router.navigate(['/login']); // Redirige al inicio de sesión
  }

}
