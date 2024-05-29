import { format } from "date-fns";
import { Match } from "./services/data/types/fixtures";
import { Team } from "./services/data/types/base";
import { TeamStatistics } from "./services/data/types/teams/statistics";
import clsx from "clsx";
import { GoalsChart } from "./components/GoalsChart";

export default function Dashboard(props: {
  data: {
    team: string;
    matches: Match[];
  };
  opponent: TeamStatistics["response"];
}) {
  const nextMatch = props.data.matches?.[0];
  /**
   * Determine if the focus should be on the home or away team for the next match.
   */
  const opponentFocusForNextMatch =
    nextMatch?.teams.home.name === props.data.team ? "home" : "away";
  return (
    <div className="grid grid-flow-row rounded-lg border-slate-800 border-2 px-8 divide-y-2 divide-slate-800 *:py-8">
      <div className="grid grid-flow-col font-bold text-2xl">
        {props.data.team}
      </div>
      <div className="grid grid-flow-row gap-4">
        <div className="grid grid-cols-[1fr,3fr] divide-x-2 divide-slate-800">
          <div className="text-right pr-8">
            <strong>Next Match</strong>
          </div>
          <div className="pl-8 grid-grid-flow-row gap-4">
            {props.data.matches?.[0] && (
              <MatchTitle match={props.data.matches?.[0]} />
            )}
          </div>
        </div>
        <div className="grid grid-cols-[1fr,3fr] divide-x-2 divide-slate-800">
          <div className="text-right pr-8">
            <strong>Opponent Details</strong>
          </div>
          <div className="pl-8 grid-grid-flow-row gap-4">
            {props.data.matches?.[0] && (
              <OpponentStatistics
                data={props.opponent}
                focus={opponentFocusForNextMatch}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MatchTitle(props: { match: Match }) {
  return (
    <div className="grid grid-flow-row gap-2">
      <div>
        {props.match.teams.home.name} vs. {props.match.teams.away.name}
      </div>
      <div>
        {props.match.fixture.venue.name}
        <span> in </span>
        {props.match.fixture.venue.city}
      </div>
      <div>
        <FormattedDate date={props.match.fixture.date} />
      </div>
    </div>
  );
}

export function FormattedDate(props: { date: string }) {
  const date = new Date(props.date);
  return (
    <time dateTime={props.date}>
      {format(date, "MMM d, yyyy, p")
        .replace("PM", "p.m.")
        .replace("AM", "a.m.")}
    </time>
  );
}

export function OpponentStatistics(props: {
  data: TeamStatistics["response"];
  focus: "home" | "away";
}) {
  return (
    <div className="text-sm grid grid-flow-row gap-2">
      <div>
        <div className="underline underline-offset-4 decoration-slate-800 mb-2">
          <strong>
            {props.data.team.name} ({props.focus})
          </strong>
        </div>
        <div>
          <strong>Record (W-D-L)</strong>: {props.data.fixtures.wins.total}-
          {props.data.fixtures.draws.total}-{props.data.fixtures.loses.total}
        </div>
        <div>
          <strong>Goals For ({props.focus})</strong>:{" "}
          {props.data.goals.for.total[props.focus]}
        </div>
        <div>
          <strong>Goals Against ({props.focus})</strong>:{" "}
          {props.data.goals.against.total[props.focus]}
        </div>
      </div>
      <GoalsChart goals={props.data.goals} />
    </div>
  );
}
