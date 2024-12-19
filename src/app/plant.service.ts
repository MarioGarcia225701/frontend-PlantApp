import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private apiUrlP = 'http://localhost:3000/api/posts';

  
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlP);
  }

  identifyPlant(base64Image: string):Observable<any> {

      const payload = {
        images: [base64Image] // Imagen en formato base64  
    };
      return this.http.post('/api/identify', payload)
  }

  postPlantData(plantData: any) {
    return this.http.post('http://localhost:3000/post-plant', plantData);
  }
  
  
}
