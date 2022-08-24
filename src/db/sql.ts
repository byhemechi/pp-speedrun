import db from ".";

const sql = <T>(baseString: TemplateStringsArray, ...params: any[]) =>
  new Promise<T[] | null>((resolve, reject) => {
    db.all(
      baseString.join("?"),
      ...params,
      (error: Error | null, rows: T[] | null) => {
        error ? reject(error) : resolve(rows);
      }
    );
  });

export const exec = (query: string) =>
  new Promise<void>((resolve, reject) => {
    db.exec(query, (error: Error | null) => {
      error ? reject(error) : resolve();
    });
  });
export default sql;
