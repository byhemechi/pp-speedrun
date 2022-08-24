import sql from "./db/sql";
import { getPointOnCurve, getPPFromStars } from "./stars";
import { RawPlayRow } from "./types/db";
import { components as ScoreSaber } from "./types/scoresaber";

export default async function showCurrentStatus() {
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

  const rankedPlays = parsedPlays
    .sort((a, b) => b.pp - a.pp)
    .map((i, n) => ({ ...i, ppWeighted: i.pp * Math.pow(0.965, n) }));

  const totalPP = rankedPlays.reduce((previous, current) => {
    return previous + current.ppWeighted;
  }, 0);

  console.log(`PP: ${totalPP.toFixed(2)}`);
  console.table(
    rankedPlays
      .map((play) => ({
        Song: `${play.info.songName}`,
        Difficulty: `${play.info.difficulty.difficultyRaw.split("_")[1]}`,
        Accuracy: Math.round((play.score / play.info.maxScore) * 10000) / 100,
        PP: Math.round(play.pp * 100) / 100,
        "Weighted PP": Math.round(play.ppWeighted * 100) / 100,
      }))
      .splice(0, 50)
  );
}
