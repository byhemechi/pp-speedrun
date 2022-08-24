import type { components as ScoreSaber } from "./scoresaber";

export interface RawPlayRow {
  id: string;
  info: string;
  score: number;
  timeSet: string;
}

export interface PlayRow {
  id: string;
  info: ScoreSaber["schemas"]["LeaderboardInfo"];
  score: number;
  timeSet: Date;
}
