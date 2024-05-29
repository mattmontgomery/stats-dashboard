import { convertParamsToQueryString } from "../url";
import { LeagueIds, TeamIds } from "./ids";

export const url = "https://api-football-v1.p.rapidapi.com/v3/teams/statistics";

export async function fetchOpponentStatistics(
  team: number,
  league: string,
  season: number
) {
  const params = {
    league: LeagueIds[league] ?? 253, // Default to MLS
    team: team ?? 1606, // Default to Real Salt Lake
    season: season,
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
