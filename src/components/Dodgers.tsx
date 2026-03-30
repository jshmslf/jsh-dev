import { useEffect, useState } from "react";
import "../styles/Dodgers.scss";

interface Standing {
  wins: number;
  losses: number;
  pct: string;
  rank: number;
}

interface Game {
  date: string;
  opponent: string;
  home: boolean;
}

interface Shohei {
  avg: string;
  hr: number;
  rbi: number;
  ops: string;
}

const TEAM_ID = 119;
const DIVISION_ID = 203;
const SHOHEI_ID = 660271;
const SEASON = String(new Date().getFullYear());

export default function Dodgers() {
  const [standing, setStanding] = useState<Standing | null>(null);
  const [schedule, setSchedule] = useState<Game[]>([]);
  const [shohei, setShohei] = useState<Shohei | null>(null);

  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/standings?leagueId=104&season=${SEASON}&standingsTypes=regularSeason&hydrate=team`
    )
      .then((r) => r.json())
      .then((data) => {
        const division = data.records?.find(
          (r: { division: { id: number } }) => r.division.id === DIVISION_ID
        );
        const entry = division?.teamRecords?.find(
          (t: { team: { id: number } }) => t.team.id === TEAM_ID
        );
        if (!entry) return;
        setStanding({
          wins: entry.wins,
          losses: entry.losses,
          pct: entry.winningPercentage,
          rank: entry.divisionRank,
        });
      })
      .catch(() => {});

    const today = new Date().toISOString().split("T")[0];
    const end = new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0];
    fetch(
      `https://statsapi.mlb.com/api/v1/schedule?teamId=${TEAM_ID}&startDate=${today}&endDate=${end}&sportId=1&gameType=R`
    )
      .then((r) => r.json())
      .then((data) => {
        const games: Game[] = [];
        for (const day of data.dates ?? []) {
          for (const g of day.games ?? []) {
            const isHome = g.teams.home.team.id === TEAM_ID;
            const opp = isHome ? g.teams.away.team.name : g.teams.home.team.name;
            games.push({ date: day.date, opponent: opp, home: isHome });
            if (games.length === 4) break;
          }
          if (games.length === 4) break;
        }
        setSchedule(games);
      })
      .catch(() => {});

    fetch(
      `https://statsapi.mlb.com/api/v1/people/${SHOHEI_ID}/stats?stats=season&season=${SEASON}&group=hitting`
    )
      .then((r) => r.json())
      .then((data) => {
        const s = data.stats?.[0]?.splits?.[0]?.stat;
        if (!s) return;
        setShohei({
          avg: s.avg,
          hr: s.homeRuns,
          rbi: s.rbi,
          ops: s.ops,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="card dodgers">
      <div className="dodgers__left">
        <div className="dodgers__header">
          <img
            src="https://www.mlbstatic.com/team-logos/119.svg"
            alt="LA Dodgers"
            className="dodgers__logo"
          />
          <div className="dodgers__title">
            <span className="dodgers__name">Los Angeles Dodgers</span>
            <span className="dodgers__season">Regular Season {SEASON}</span>
          </div>
        </div>

        {standing ? (
          <div className="dodgers__stats">
            <div className="dodgers__stat">
              <span className="dodgers__stat-value">{standing.wins}</span>
              <span className="dodgers__stat-label">W</span>
            </div>
            <div className="dodgers__divider" />
            <div className="dodgers__stat">
              <span className="dodgers__stat-value">{standing.losses}</span>
              <span className="dodgers__stat-label">L</span>
            </div>
            <div className="dodgers__divider" />
            <div className="dodgers__stat">
              <span className="dodgers__stat-value">{standing.pct}</span>
              <span className="dodgers__stat-label">PCT</span>
            </div>
            <div className="dodgers__divider" />
            <div className="dodgers__stat">
              <span className="dodgers__stat-value">#{standing.rank}</span>
              <span className="dodgers__stat-label">NL West</span>
            </div>
          </div>
        ) : (
          <span className="dodgers__loading">Loading…</span>
        )}
      </div>

      <div className="dodgers__col-divider" />

      <div className="dodgers__schedule">
        <span className="dodgers__col-title">Upcoming</span>
        {schedule.length > 0 ? schedule.map((g) => (
          <div key={g.date + g.opponent} className="dodgers__game">
            <span className="dodgers__game-date">
              {new Date(g.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
            <span className="dodgers__game-vs">{g.home ? "vs" : "@"}</span>
            <span className="dodgers__game-opp">{g.opponent}</span>
          </div>
        )) : (
          <span className="dodgers__loading">Loading…</span>
        )}
      </div>

      <div className="dodgers__col-divider" />

      <div className="dodgers__shohei">
        <span className="dodgers__col-title">Shohei Ohtani</span>
        {shohei ? (
          <div className="dodgers__stats dodgers__stats--wrap">
            <div className="dodgers__stat">
              <span className="dodgers__stat-value">{shohei.avg}</span>
              <span className="dodgers__stat-label">AVG</span>
            </div>
            <div className="dodgers__divider" />
            <div className="dodgers__stat">
              <span className="dodgers__stat-value">{shohei.hr}</span>
              <span className="dodgers__stat-label">HR</span>
            </div>
            <div className="dodgers__divider" />
            <div className="dodgers__stat">
              <span className="dodgers__stat-value">{shohei.rbi}</span>
              <span className="dodgers__stat-label">RBI</span>
            </div>
            <div className="dodgers__divider" />
            <div className="dodgers__stat">
              <span className="dodgers__stat-value">{shohei.ops}</span>
              <span className="dodgers__stat-label">OPS</span>
            </div>
          </div>
        ) : (
          <span className="dodgers__loading">Loading…</span>
        )}
      </div>
    </div>
  );
}
