import sql from "./db/sql";
import { components as ScoreSaber } from "./types/scoresaber";
import { getPointOnCurve, getPPFromStars } from "./stars";
import { RawPlayRow } from "./types/db";

export default async function getPlays() {
  const rawPlays = await sql<RawPlayRow>`select * from plays`;
  console.clear();
  if (!rawPlays) return;

  const parsedPlays = rawPlays.map((play) => {
    const info = JSON.parse(
      play.info
    ) as ScoreSaber["schemas"]["LeaderboardInfo"];
    const pp =
      getPointOnCurve(play.score / info.maxScore) * getPPFromStars(info.stars);

    return {
      ...play,
      info,
      timeSet: new Date(play.timeSet),
      pp,
    };
  });

  return parsedPlays
    .sort((a, b) => b.pp - a.pp)
    .map((i, n) => ({ ...i, ppWeighted: i.pp * Math.pow(0.965, n) }));
}
