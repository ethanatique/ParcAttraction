import { Component, OnInit } from '@angular/core';
import { CritiqueService } from '../Service/critiques.service';
import { CritiqueInterface } from '../Interface/critiques.interface';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Importez le module MatIconModule
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { AttractionService } from '../Service/attraction.service';
import { AuthService } from '../Service/auth.service'; // Importez le service d'authentification

@Component({
  selector: 'app-critiques',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule // Ajoutez MatIconModule ici
  ],
  templateUrl: './critiques.component.html',
  styleUrls: ['./critiques.component.scss']
})
export class CritiquesComponent implements OnInit {
  displayedColumns: string[] = ['attraction_nom', 'auteur', 'texte', 'note'];
  critiqueForm!: FormGroup;

  constructor(
    private critiqueService: CritiqueService,
    private fb: FormBuilder,
    public attractionService: AttractionService,
    private authService: AuthService // Injectez le service d'authentification
  ) {}

  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllAttraction();
  public critiques: Observable<CritiqueInterface[]> = this.critiqueService.getCritiques();

  ngOnInit() {
    // Créer le formulaire de critique
    this.createForm();
    // Vérifier l'état de connexion de l'utilisateur
    this.authService.setUser();
  }

  createForm() {
    // Création du formulaire avec les champs nécessaires
    this.critiqueForm = this.fb.group({
      attraction_id: ['', Validators.required],
      texte: ['', Validators.required],
      note: [0, Validators.required],
      anonyme: [true]
    });
  }

  soumettreCritique() {
    if (this.critiqueForm.valid) {
      let critique = this.critiqueForm.value;

      // Vérifier si l'utilisateur est connecté
      if (!this.authService.isLoggedIn) {
        critique.anonyme = true; // Forcer l'anonymat si l'utilisateur n'est pas connecté
        critique.auteur = null; // Mettre l'auteur à null
      } else {
        if (!critique.anonyme && this.authService.user) {
          critique.auteur = this.authService.user.name; // Mettre le nom de l'utilisateur
        }
      }

      console.log('Critique soumise:', critique); // Ajoutez ce log pour déboguer
      this.critiqueService.addCritique(critique).subscribe({
        next: () => {
          alert('Critique ajoutée avec succès');
          this.critiqueForm.reset(); // Réinitialiser le formulaire après soumission
          this.reloadCritiques(); // Recharger les critiques
        },
        error: (err) => {
          console.error('Erreur lors de la soumission de la critique:', err);
          alert('Erreur lors de la soumission de la critique');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }

  reloadCritiques() {
    this.critiques = this.critiqueService.getCritiques();
  }

  getStars(note: number): string[] {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < note) {
        stars.push('star'); // Étoile pleine
      } else {
        stars.push('star_border'); // Étoile vide
      }
    }
    return stars;
  }
}
