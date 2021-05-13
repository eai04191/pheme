import AsyncNedb from "nedb-async";

interface ILog {
  id: string;
  message_id: string;
  jointime: Date | null;
}

const db = new AsyncNedb<ILog>();

export const put = async (log: ILog) => {
  await db.asyncUpdate({ id: log.id }, log, { upsert: true });
};

export const get = async (id: string): Promise<ILog | null> => {
  return await db.asyncFindOne({ id: id });
};
