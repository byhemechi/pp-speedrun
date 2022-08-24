import { type PathLike } from "fs";
import fs from "fs/promises";
import Play from "./types/play";

export async function* watchForPlays(path: PathLike) {
  const handle = fs.watch(path);

  for await (const { eventType } of handle) {
    if (eventType !== "change") continue;
    const fileContents = await fs
      .readFile(path, "utf-8")
      .then((i) => i.split("\n").filter((line) => line.length > 0));

    try {
      yield JSON.parse(fileContents[fileContents.length - 1]) as Play;
    } catch (err) {}
  }
}
