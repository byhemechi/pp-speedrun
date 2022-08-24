import sql from "./db/sql";
import { getPointOnCurve, getPPFromStars } from "./stars";
import { PlayRow } from "./types/db";
import type Play from "./types/play";
import { components as ScoreSaber } from "./types/scoresaber";

export default async function handlePlay(play: Play) {
  if (!play.trackers.winTracker.won) return;
  const id = `${play.songID}${play.songDifficultyRank}`;

  const existing = await sql<PlayRow>`select score from plays where id = ${id}`;
  if (
    existing &&
    existing[0] &&
    existing[0].score > play.trackers.scoreTracker.score
  )
    return;

  const mapInfoResponse = await fetch(
    `https://scoresaber.com/api/leaderboard/by-hash/${play.songID}/info?difficulty=${play.songDifficultyRank}`
  );
  if (mapInfoResponse.status !== 200) return;
  const mapInfo =
    (await mapInfoResponse.json()) as ScoreSaber["schemas"]["LeaderboardInfo"];

  if (!mapInfo.ranked) return;

  const scorePercentage =
    play.trackers.scoreTracker.rawScore / mapInfo.maxScore;

  const pp = getPointOnCurve(scorePercentage) * getPPFromStars(mapInfo.stars);

  console.log(`Set a new ${pp}pp play`);

  await sql`REPLACE INTO plays(id,info,score) VALUES (${id},${JSON.stringify(
    mapInfo
  )},${play.trackers.scoreTracker.score})`;
}
