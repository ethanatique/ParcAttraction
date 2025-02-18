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
import { MatIconModule } from '@angular/material/icon'; 
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { AttractionService } from '../Service/attraction.service';
import { AuthService } from '../Service/auth.service'; 

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
    MatIconModule 
  ],
  templateUrl: './critiques.component.html',
  styleUrls: ['./critiques.component.scss']
})
export class CritiquesComponent implements OnInit {
  displayedColumns: string[] = ['attraction_nom', 'auteur', 'texte', 'note'];
  critiqueForm!: FormGroup;
  filterForm!: FormGroup;
  showFilterForm: boolean = false;

  constructor(
    private critiqueService: CritiqueService,
    private fb: FormBuilder,
    public attractionService: AttractionService,
    private authService: AuthService 
  ) {}

  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllAttraction();
  public critiques: CritiqueInterface[] = [];
  public filteredCritiques: CritiqueInterface[] = [];

  ngOnInit() {
    this.createForm();
    this.createFilterForm();
    this.authService.setUser();
    this.reloadCritiques();
  }

  createForm() {
    this.critiqueForm = this.fb.group({
      attraction_id: ['', Validators.required],
      texte: ['', Validators.required],
      note: [0, Validators.required],
      anonyme: [true]
    });
  }

  createFilterForm() {
    this.filterForm = this.fb.group({
      attraction_id: ['']
    });
  }

  soumettreCritique() {
    if (this.critiqueForm.valid) {
      let critique = this.critiqueForm.value;

      if (!this.authService.isLoggedIn) {
        critique.anonyme = true; 
        critique.auteur = null;
      } else {
        if (!critique.anonyme && this.authService.user) {
          critique.auteur = this.authService.user.name; 
          critique.anonyme = false;
        }
      }

      console.log('Critique soumise:', critique); 
      this.critiqueService.addCritique(critique).subscribe({
        next: () => {
          alert('Critique ajoutée avec succès');
          this.critiqueForm.reset(); 
          this.reloadCritiques(); 
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
    this.critiqueService.getCritiques().subscribe(critiques => {
      this.critiques = critiques;
      this.filteredCritiques = critiques; 
    });
  }

  filterCritiques() {
    const filters = this.filterForm.value;
    this.filteredCritiques = this.critiques.filter(critique => {
      let matches = true;
      if (filters.attraction_id !== '') {
        matches = matches && critique.attraction_id === parseInt(filters.attraction_id, 10);
      }
      return matches;
    });
    this.showFilterForm = false;
  }

  toggleFilterForm() {
    this.showFilterForm = !this.showFilterForm;
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
