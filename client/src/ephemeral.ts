import AsyncNedb from "nedb-async";

const db = new AsyncNedb<Log>();

export const put = async (log: Log) => {
  await db.asyncUpdate({ id: log.id }, log, { upsert: true });
};

export const get = async (id: string): Promise<Log | null> => {
  return await db.asyncFindOne({ id: id });
};
