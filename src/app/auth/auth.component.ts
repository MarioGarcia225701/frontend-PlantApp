import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { stringify } from 'querystring';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  

  constructor(private authService: AuthService) {}

  registerUsername: string = '';
  registerPassword: string = '';
  loginUsername: string = '';
  loginPassword: string = '';
  message: string = '';
  
 
  }
  
  

