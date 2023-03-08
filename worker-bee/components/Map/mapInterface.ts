import { Dispatch, SetStateAction } from "react";

export interface User {
  _id?: string;
  name?: string;
  username?: string;
  hives?: {
    [hiveName: string]: [
      {
        _id: string;
        hiveName: string;
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
  setUser?: Dispatch<SetStateAction<User>>;
}

export interface Ref {
  location: React.MutableRefObject<[number, number]>;
}
