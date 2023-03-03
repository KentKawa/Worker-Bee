export interface User {
  name: string;
  username: string;
  hives: {};
  schedule: [];
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
