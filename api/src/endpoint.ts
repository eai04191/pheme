import { insertNewLog, fetchEveryoneStats } from "./";

export const doGet = (e: GoogleAppsScript.Events.DoGet) => {
  const payload = JSON.stringify(fetchEveryoneStats());
  const content = ContentService.createTextOutput();
  content.setMimeType(ContentService.MimeType.JSON);
  content.setContent(payload);
  return content;
};

export const doPost = (e: GoogleAppsScript.Events.DoPost) => {
  const json = e.postData.contents;
  const obj = JSON.parse(json);

  const log = {
    id: obj.id,
    timespent: obj.timespent,
    joinDate: new Date(obj.joinDate),
    leaveDate: new Date(obj.leaveDate),
  };
  if (!isLog(log)) throw new Error("データが不正です");
  insertNewLog(log);
};

/**
 * type guard
 */
const isLog = (arg: any): arg is Log => {
  const { id, timespent, joinDate, leaveDate } = arg;
  if (
    typeof id === "string" &&
    typeof timespent === "string" &&
    joinDate instanceof Date &&
    leaveDate instanceof Date
  ) {
    return true;
  }
  return false;
};
