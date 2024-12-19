import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrl: './plant-card.component.css'
})
export class PlantCardComponent {

  
  
  @Input() plant: {
    imageUrl: string ;
    scientificName: string;
    commonName: string;
    similarImages: { url: string }[];
    description: string;
    referenceUrl: string;
    careInfo: string;
  } | null = null;
}
