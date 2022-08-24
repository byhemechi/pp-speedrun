import sql from "./db/sql";
import { updateState } from "./socket";
import { PlayRow } from "./types/db";

export interface GameState {
  timeStarted: number;
  timeSpent: number;

  pp: number;
  plays: PlayRow[];
}

export async function saveState(state: GameState) {
  await sql`REPLACE into kv(key, value) values ('gameState', ${JSON.stringify(
    state
  )})`;

  updateState();
}

export async function getState() {
  const rows =
    (await sql<{
      key: string;
      value: string;
    }>`SELECT * from kv where key = 'gameState'`) ?? [];

  if (rows.length == 0) return null;
  const state = rows[0].value;
  if (!state) return null;
  return JSON.parse(state) as GameState;
}
