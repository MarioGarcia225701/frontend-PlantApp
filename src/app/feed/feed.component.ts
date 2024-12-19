import { Component } from '@angular/core';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  posts: any[] = []; // Variable para almacenar los posts

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    
    this.plantService.getPosts().subscribe((data) => {
      this.posts = data;
      
    });
  }
}
