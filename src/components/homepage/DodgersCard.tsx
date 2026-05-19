"use client";

import { useEffect, useState } from "react";
import { Card } from "./Card";
import Image from "next/image";

const TEAM_ID = 119;
const OHTANI_ID = 660271;
const SEASON = new Date().getFullYear();

interface TeamRecord { wins: number; losses: number; pct: string; standing: string; }
interface OhtaniStats { avg: string; hr: string; rbi: string; era: string; }
interface Game { date: string; opponent: string; rivalId?: number; home: boolean; time: string; }

function SectionLabel({ label }: { label: string }) {
  return (
    <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>
      {label}
    </p>
  );
}

export function DodgersCard() {
  const [record, setRecord] = useState<TeamRecord | null>(null);
  const [ohtani, setOhtani] = useState<OhtaniStats | null>(null);
  const [schedule, setSchedule] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [standingsRes, ohtaniRes, scheduleRes] = await Promise.all([
          fetch(`https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=${SEASON}&standingsTypes=regularSeason`),
          fetch(`https://statsapi.mlb.com/api/v1/people/${OHTANI_ID}/stats?stats=season&season=${SEASON}&group=hitting,pitching`),
          fetch(`https://statsapi.mlb.com/api/v1/schedule?teamId=${TEAM_ID}&season=${SEASON}&sportId=1&startDate=${new Date().toISOString().split("T")[0]}&endDate=${new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0]}`),
        ]);

        const [standingsData, ohtaniData, scheduleData] = await Promise.all([
          standingsRes.json(), ohtaniRes.json(), scheduleRes.json(),
        ]);

        // Team record
        for (const division of standingsData.records || []) {
          const team = division.teamRecords?.find((t: { team: { id: number } }) => t.team.id === TEAM_ID);
          if (team) {
            setRecord({
              wins: team.wins,
              losses: team.losses,
              pct: team.winningPercentage,
              standing: `${team.divisionRank}${["st","nd","rd"][team.divisionRank - 1] || "th"} in ${division.division?.nameShort || "NL West"}`,
            });
            break;
          }
        }

        // Ohtani stats
        const groups = ohtaniData.stats || [];
        const hitting = groups.find((g: { group: { displayName: string } }) => g.group?.displayName === "hitting")?.splits?.[0]?.stat;
        const pitching = groups.find((g: { group: { displayName: string } }) => g.group?.displayName === "pitching")?.splits?.[0]?.stat;
        setOhtani({
          avg: hitting?.avg || ".---",
          hr: hitting?.homeRuns ?? "—",
          rbi: hitting?.rbi ?? "—",
          era: pitching?.era || "—",
        });

        // Schedule
        const games: Game[] = [];
        for (const date of scheduleData.dates || []) {
          for (const game of date.games || []) {
            if (games.length >= 2) break;
            const isHome = game.teams?.home?.team?.id === TEAM_ID;
            const rivalTeam = isHome ? game.teams?.away?.team : game.teams?.home?.team;
            const opponent = rivalTeam?.name || "TBD";
            const rivalId = rivalTeam?.id;
            const gameTime = new Date(game.gameDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
            const gameDate = new Date(game.officialDate).toLocaleDateString("en-US", { month: "short", day: "numeric" });
            games.push({ date: gameDate, opponent, rivalId, home: isHome, time: gameTime });
          }
          if (games.length >= 2) break;
        }
        setSchedule(games);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <Card title="" style={{ flex: 1 }}>
      <style>{`
        .dodgers-header{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
        .dodgers-stats-row{display:flex;gap:14px;align-items:stretch;}
        .dodgers-divider{width:1px;background:var(--border);flex-shrink:0;}
        @media(max-width:640px){
          .dodgers-stats-row{flex-direction:column;gap:14px;}
          .dodgers-divider{width:100%;height:1px;}
        }
      `}</style>
      <div className="dodgers-header">
        <Image src="https://www.mlbstatic.com/team-logos/119.svg" width={20} height={20} style={{ height: "auto" }} alt="LAD" />
        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1.1rem", fontWeight: 700, color: "var(--foreground)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Los Angeles Dodgers</span>
      </div>
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="skeleton" style={{ height: "12px", width: "60%", borderRadius: "var(--ui-radius)" }} />
          <div className="skeleton" style={{ height: "12px", width: "80%", borderRadius: "var(--ui-radius)" }} />
          <div className="skeleton" style={{ height: "12px", width: "50%", borderRadius: "var(--ui-radius)" }} />
        </div>
      ) : (
        <div className="dodgers-stats-row">

          {/* Team Record */}
          <div style={{ flex: 1 }}>
            <SectionLabel label="Team Record" />
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1.4rem", fontWeight: 700, color: "var(--foreground)", margin: "0 0 2px" }}>
              {record ? `${record.wins}–${record.losses}` : "—"}
            </p>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--muted-foreground)", margin: 0 }}>{record?.pct || "—"} PCT</p>
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--muted-foreground)", margin: "2px 0 0" }}>{record?.standing || "—"}</p>
          </div>

          <div className="dodgers-divider" />

          {/* Ohtani */}
          <div style={{ flex: 1 }}>
            <SectionLabel label="Ohtani" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {[
                { label: "AVG", value: ohtani?.avg },
                { label: "HR", value: ohtani?.hr },
                { label: "RBI", value: ohtani?.rbi },
                { label: "ERA", value: ohtani?.era },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85rem", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{value}</p>
                  <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", color: "var(--muted-foreground)", margin: "1px 0 0", textTransform: "uppercase" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="dodgers-divider" />

          {/* Schedule */}
          <div style={{ flex: 1 }}>
            <SectionLabel label="Next Games" />
            {schedule.length === 0 ? (
              <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--muted-foreground)", margin: 0 }}>No games</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {schedule.map((g, i) => (
                  <div key={i} className={i > 0 ? "dodgers-game-extra" : ""}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {g.rivalId && <Image src={`https://www.mlbstatic.com/team-logos/${g.rivalId}.svg`} width={16} height={16} style={{ height: "auto" }} alt={g.opponent} />}
                      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", fontWeight: 600, color: "var(--foreground)", margin: 0 }}>
                        {g.home ? "vs" : "@"} {g.opponent}
                      </p>
                    </div>
                    <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem", color: "var(--muted-foreground)", margin: "1px 0 0" }}>
                      {g.date} · {g.time} · {g.home ? "Home" : "Away"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </Card>
  );
}
