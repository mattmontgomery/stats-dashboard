import { League, Team } from "../base";

export type Fixtures = {
  played: {
    home: number;
    away: number;
    total: number;
  };
  wins: {
    home: number;
    away: number;
    total: number;
  };
  draws: {
    home: number;
    away: number;
    total: number;
  };
  loses: {
    home: number;
    away: number;
    total: number;
  };
};

export type Goals = {
  for: {
    total: {
      home: number;
      away: number;
      total: number;
    };
    average: {
      home: string;
      away: string;
      total: string;
    };
    minute: Record<string, { total: number | null; percentage: string | null }>;
  };
  against: {
    total: {
      home: number;
      away: number;
      total: number;
    };
    average: {
      home: string;
      away: string;
      total: string;
    };
    minute: Record<string, { total: number | null; percentage: string | null }>;
  };
};

export type Biggest = {
  streak: {
    wins: number;
    draws: number;
    loses: number;
  };
  wins: {
    home: string;
    away: string;
  };
  loses: {
    home: string;
    away: null | string;
  };
  goals: {
    for: {
      home: number;
      away: number;
    };
    against: {
      home: number;
      away: number;
    };
  };
};

export type Penalty = {
  scored: {
    total: number;
    percentage: string;
  };
  missed: {
    total: number;
    percentage: string;
  };
  total: number;
};

export type Lineups = {
  formation: string;
  played: number;
}[];

export type Cards = {
  yellow: Record<string, { total: number | null; percentage: string | null }>;
  red: Record<string, { total: number | null; percentage: string | null }>;
};

export type TeamStatistics = {
  get: string;
  parameters: {
    league: string;
    season: string;
    team: string;
  };
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: {
    league: League;
    team: Team;
    form: string;
    fixtures: Fixtures;
    goals: Goals;
    biggest: Biggest;
    clean_sheet: {
      home: number;
      away: number;
      total: number;
    };
    failed_to_score: {
      home: number;
      away: number;
      total: number;
    };
    penalty: Penalty;
    lineups: Lineups;
    cards: Cards;
  };
};
