/**
 * Dateを受け取ってDateが含まれる週のシートがあれば返す
 * なければ作成して返す
 */
export const getProperSheet = (leaveDate: Log["leaveDate"] = new Date()) => {
  const sunday = dayjs.dayjs(leaveDate).day(0).format("YYYY-MM-DD");
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sunday);
  // あれば返す
  if (sheet) return sheet;
  // なければ作成して返す
  const templateSheet = spreadsheet.getSheetByName("template");
  if (!templateSheet) {
    throw new Error("テンプレートシート（シート名: template）が見つかりません");
  }
  const newSheet = spreadsheet.insertSheet(sunday, {
    template: templateSheet,
  });
  return newSheet;
};

/**
 * Logを受け取って適当なシートの末尾に挿入する
 */
export const insertNewLog = (log: Log) => {
  const sheet = getProperSheet(log.leaveDate);
  sheet.appendRow([log.id, log.timeSpent, log.joinDate, log.leaveDate]);
};

/**
 * シートに含まれる全データを取得する
 */
export const fetchAllLogs = () => {
  const sheet = getProperSheet();
  const allData = sheet.getDataRange().getValues();
  // ヘッダー行を削除
  allData.shift();
  return allData as [string, number, Date, Date][];
};

/**
 * シートに含まれるidの配列を返す
 */
export const fetchIdList = (): string[] => {
  const logs = fetchAllLogs();
  const idList = [...new Set(logs.map((log) => log[0]))];

  return idList;
};

/**
 * 特定idの合計時間を返す
 */
export const fetchUserStats = (id: Log["id"]) => {
  const logs = fetchAllLogs();
  const userLog = logs.filter((data) => data[0] === id);
  const totalSpentTime = userLog.reduce((acc, data) => {
    return acc + data[1];
  }, 0);
  return totalSpentTime;
};

/**
 * 全員のstatsを取得する
 */
export const fetchEveryoneStats = () => {
  const userlist = fetchIdList();

  let data: Stat[] = [];
  userlist.forEach((id) => {
    data.push({ id: id, totalTimeSpent: fetchUserStats(id) });
  });
  return data;
};
