// critique.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CritiqueInterface } from '../Interface/critiques.interface';

@Injectable({
  providedIn: 'root'
})
export class CritiqueService {

  private apiUrl = 'http://127.0.0.1:5000/critiques';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les critiques
  getCritiques(): Observable<CritiqueInterface[]> {
    return this.http.get<CritiqueInterface[]>(this.apiUrl);
  }

  // Ajouter une critique
  addCritique(critique: CritiqueInterface): Observable<any> {
    return this.http.post(this.apiUrl, critique);
  }
}
