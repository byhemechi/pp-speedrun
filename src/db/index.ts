import { Database } from "sqlite3";
const db = new Database(process.argv[2] ?? ":memory:");

export default db;
