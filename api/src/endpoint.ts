import { insertNewLog, fetchEveryoneStats, getProperSheet } from "./";

export const doGet = (e: GoogleAppsScript.Events.DoGet) => {
  const data = {
    stats: fetchEveryoneStats(),
    sheetName: getProperSheet().getSheetName(),
  };
  const payload = JSON.stringify(data);
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
    timeSpent: obj.timeSpent,
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
  const { id, timeSpent, joinDate, leaveDate } = arg;
  if (
    typeof id === "string" &&
    typeof timeSpent === "number" &&
    joinDate instanceof Date &&
    leaveDate instanceof Date
  ) {
    return true;
  }
  return false;
};
