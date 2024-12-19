import { Component } from '@angular/core';
import { PlantService } from '../plant.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  plant: {
    imageUrl: string ;
    scientificName: string;
    commonName: string;
    similarImages: { url: string }[];
    description: string;
    referenceUrl: string;
    careInfo: string;
  } | null = null;

  activeTab: string = 'description'; // Pestaña activa por defecto

  selectedImage: File | null = null;
  plantInfo: any = null;
  errorMessage: string = '';

  selectedFile: File | null = null;

  plantData: any = null;
  

  constructor(private plantService: PlantService, private http: HttpClient) {}

  
  
  onFileSelected(event: any) {
    // Obtener el usuario del localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');

    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string);
        this.plantService.identifyPlant(base64).subscribe((response: any) => {
          this.plantInfo = {
            username: loggedInUser,
            imageUrl: response?.input?.images ?? 'Sin imagen disponible',
            scientificName: response?.result?.classification?.suggestions?.[0]?.name ?? 'Desconocido',
            commonName: response?.result?.classification?.suggestions?.[0]?.details?.common_names?.[0] ?? 'Desconocido',
            similarImages: response?.result?.classification?.suggestions?.[0]?.similar_images?.[0]?.url ?? 'Sin imagen similar',
            description: response?.result?.classification?.suggestions?.[0]?.details?.description?.value ?? 'Sin descripción disponible',
            referenceUrl: response?.result?.classification?.suggestions?.[0]?.details?.description?.citation ?? 'Sin referencia',
          };
          

          // Guardar búsqueda en el historial
          this.saveRequestToHistory(this.plantInfo);
        });
      };
      reader.readAsDataURL(file);
    }
  }


  resetPlantInfo() {
    this.plantInfo = null; // Reinicia la información de la planta
    this.activeTab = 'description'; // Reinicia la pestaña activa
  }
  
  
  postPlantInfo() {
    
    if (this.plantInfo) {
      this.plantService.postPlantData(this.plantInfo).subscribe({
        next: () => {
          Swal.fire('¡Bien hecho!', 'La información de la planta se ha publicado.', 'success');
          //alert("La información de la planta se ha guardado correctamente.");
        },
        error: (err) => {
          //console.error("Error al guardar los datos:", err);
          Swal.fire('Error', 'Ocurrio un error al guardar la informacion', 'error');
        }
      });
    } else {
      Swal.fire('', 'No hay información de planta para guardar.', 'warning');
      
    }
  }
  
  saveRequestToHistory(requestData: any) {
    this.http.post('http://localhost:3000/save-request', requestData).subscribe({
      next: () => {
        console.log('El historial de búsqueda se guardó correctamente.');
      },
      error: (err) => {
        console.error('Error al guardar el historial de búsqueda:', err);
      },
    });
  }
  
  
/*
  identifyPlant(event: Event) {
    event.preventDefault();

    if (!this.selectedFile) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
    const base64Image = reader.result as string;

      const payload = {
        images: [base64Image] // Imagen en formato base64 
    };
    

      this.http.post('/api/identify', payload).subscribe(
        (response) => {
          this.plantInfo = response;
        },
        (error) => {
          console.error('Error al identificar la planta:', error);
        }
      );
    };
    reader.readAsDataURL(this.selectedFile);
  }*/

}
