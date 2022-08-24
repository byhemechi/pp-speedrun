import { getState, saveState } from "./gameState";
import getPlays from "./getPlays";
import { updateState } from "./socket";

export default async function showCurrentStatus() {
  const state = await getState();
  const rankedPlays = await getPlays();

  if (!rankedPlays) return;

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

  saveState({
    pp: totalPP,
    plays: rankedPlays,
    timeSpent: state?.timeSpent ?? 0,
    timeStarted: state?.timeStarted ?? Date.now(),
  });

  updateState();
}
