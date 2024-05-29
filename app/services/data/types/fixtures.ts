import { League, Team } from "./base";
import { ResponseMultiple } from "./response";

export type FixtureResponse = ResponseMultiple<
  "fixtures",
  Match,
  { league: number; team: number; season: number; next: number }
>;

export type Fixture = {
  id: number;
  referee: null | string;
  timezone: string;
  date: string;
  timestamp: number;
  periods: {
    first: null | number;
    second: null | number;
  };
  venue: {
    id: number;
    name: string;
    city: string;
  };
  status: {
    long: string;
    short: string;
    elapsed: null | number;
  };
};

export type Teams = {
  home: Team & { winner: boolean };
  away: Team & { winner: boolean };
};

export type Goals = {
  home: null | number;
  away: null | number;
};

export type Score = {
  halftime: Goals;
  fulltime: Goals;
  extratime: Goals;
  penalty: Goals;
};

export type Match = {
  fixture: Fixture;
  league: League;
  teams: Teams;
  goals: Goals;
  score: Score;
};
