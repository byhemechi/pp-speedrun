import fs from "fs/promises";
import db from "./db";
import initialise from "./db/init";
import sql, { exec } from "./db/sql";
import handlePlay from "./handlePlay";
import { startWebSocket } from "./socket";
import { getPointOnCurve, getPPFromStars } from "./stars";
import showCurrentStatus from "./statusPage";
import { watchForPlays } from "./watchForPlays";

async function main() {
  const d = new Date();
  const playGenerator = watchForPlays(
    `${process.env.AppData}\\Beat Savior Data\\${d.getFullYear()}-${(
      d.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}.bsd`
  );

  await initialise();
  await showCurrentStatus();

  startWebSocket();

  for await (const play of playGenerator) {
    await handlePlay(play);
    showCurrentStatus();
  }
}

main();
