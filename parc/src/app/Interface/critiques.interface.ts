export interface CritiqueInterface {
  critiques_id: number;
  attraction_id: number;
  attraction_nom: string;
  auteur: string;
  texte: string;
  note: number;
  anonyme: boolean;
  date_creation: Date;
}
