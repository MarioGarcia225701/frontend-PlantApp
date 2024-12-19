import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerProfile(fullname: string, email: string, username: string, password: string): Observable<any> {
    const body = { fullname, email, username, password }; // Datos en formato JSON
    return this.http.post(`${this.apiUrl}/registerProfile`, body);
  }

  registerUser( username: string, password: string): Observable<any> {
    const body = { username, password }; // Datos en formato JSON
    return this.http.post(`${this.apiUrl}/registerUser`, body);
  }

  loginUser(username: string, password: string): Observable<any> {
    const body = { username, password }; // Datos en formato JSON
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}
