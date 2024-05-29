import { convertParamsToQueryString } from "../url";
import { LeagueIds, TeamIds } from "./ids";
import { FixtureResponse } from "./types/fixtures";

export const url = "https://api-football-v1.p.rapidapi.com/v3/fixtures";

export async function fetchNextOpponent(
  team: string,
  league: string
): Promise<FixtureResponse> {
  const params = {
    league: LeagueIds[league] ?? 253, // Default to MLS
    team: TeamIds[team] ?? 1606, // Default to Real Salt Lake
    season: 2024,
    next: 5,
  };
  const response = await fetch(
    `${url}?${new URLSearchParams(
      convertParamsToQueryString(params)
    ).toString()}`,
    {
      headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY ?? "",
      },
    }
  );
  const data = await response.json();
  return data;
}
