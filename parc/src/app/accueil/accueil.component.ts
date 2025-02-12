import { Component } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';  // Importation nécessaire pour mat-icon

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButton, RouterLink, MatIconModule],  // Ajout de MatIconModule ici
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllAttraction();

  constructor(public attractionService: AttractionService) {}

  // Méthode pour générer les étoiles en fonction de la difficulté
  getStars(difficulty: number): string[] {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < difficulty) {
        stars.push('star');  // Etoile pleine
      } else {
        stars.push('star_border');  // Etoile vide
      }
    }
    return stars;
  }
}
