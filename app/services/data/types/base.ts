export type League = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
};

export type Team = {
  id: number;
  name: string;
  logo: string;
  winner: null | boolean;
};
