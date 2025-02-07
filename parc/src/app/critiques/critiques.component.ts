import { Component, OnInit } from '@angular/core';
import { CritiqueService } from '../Service/critiques.service';
import { CritiqueInterface } from '../Interface/critiques.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { AttractionService } from '../Service/attraction.service';


@Component({
  selector: 'app-critiques',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './critiques.component.html',
  styleUrls: ['./critiques.component.scss']
})
export class CritiquesComponent implements OnInit {
  displayedColumns: string[] = ['attraction_nom', 'auteur', 'texte'];
  critiqueForm!: FormGroup; 


  constructor(
    private critiqueService: CritiqueService,
    private fb: FormBuilder,
    public attractionService: AttractionService
  )
  {}


  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllAttraction()
  public critiques: Observable<CritiqueInterface[]> = this.critiqueService.getCritiques()

  ngOnInit() {
    // Créer le formulaire de critique
    this.createForm();
  }

  createForm() {
    // Création du formulaire avec les champs nécessaires
    this.critiqueForm = this.fb.group({
      attraction_nom: ['', Validators.required],
      texte: ['', Validators.required],
      anonyme: [true]
    });
  }

  soumettreCritique() {
    if (this.critiqueForm.valid) {
      const critique = this.critiqueForm.value;
      this.critiqueService.addCritique(critique).subscribe(() => {
        alert('Critique ajoutée avec succès');
        this.critiqueForm.reset(); // Réinitialiser le formulaire après soumission
      });
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }
}
