export interface Location {
  lat: number;
  lng: number;
}

export interface Hive {
  name: string;
  weight: number;
  queenPlaced: string;
  temperament: number;
  medicine: string[];
  disease: string[];
  location: [0, 0];
}
