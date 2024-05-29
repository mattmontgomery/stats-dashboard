import Dashboard from "./Dashboard";
import { fetchNextOpponent } from "./services/data/next-opponent";
import { fetchOpponentStatistics } from "./services/data/opponent";
import DebugJson from "./components/DebugJson";

export default async function HomePage() {
  const data = await fetchNextOpponent("Real Salt Lake", "mls");
  const opponentId =
    data.response?.[0].teams.away.name === "Real Salt Lake"
      ? data.response?.[0].teams.home.id
      : data.response?.[0].teams.away.id;
  const opponent = await fetchOpponentStatistics(opponentId, "mls", 2024);
  console.log(opponentId);
  return (
    <main className="min-h-screen flex-col p-24 grid grid-flow-row gap-16">
      <Dashboard
        data={{
          team: "Real Salt Lake",
          matches: data.response,
        }}
        opponent={opponent.response}
      />
      <DebugJson data={opponent} />
      <DebugJson data={data} />
    </main>
  );
}
