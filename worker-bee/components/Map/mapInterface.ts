export interface User {
  _id?: string;
  name?: string;
  username?: string;
  hives?: {
    [hiveName: string]: [
      {
        name: string;
        weight: number;
        queenPlaced: string;
        temperament: number;
        medicine: string[];
        disease: string[];
        location: [0, 0];
      }
    ];
  };
  schedule?: [];
}

export interface Hive {
  name?: string;
  weight?: number;
  queenPlaced?: string;
  temperament?: number;
  medicine?: string[];
  disease?: string[];
  location?: [0, 0];
}

export interface Ref {
  location: React.MutableRefObject<[number, number]>;
}
