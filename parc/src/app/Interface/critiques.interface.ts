export interface CritiqueInterface {
    attraction_id: number;
    attraction_nom:string;
    critiques_id: number;
    auteur: string | null;
    texte: string;
    date_creation: Date;
    anonyme: boolean;
  }