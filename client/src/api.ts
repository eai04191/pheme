import got from "got";
import { config } from "./config";

export const saveLog = async (log: Log & { leaveDate: Date }) => {
  const { id, joinDate, leaveDate } = log;

  if (!config.endpoint) return;

  const timeSpent = leaveDate.getTime() - joinDate.getTime();
  const body = {
    id,
    timeSpent,
    joinDate,
    leaveDate,
  };
  console.log(body);

  await got.post(config.endpoint, { json: body });
};
