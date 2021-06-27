import {
  insertNewLog,
  fetchAllLogs,
  fetchIdList,
  fetchUserStats,
  fetchEveryoneStats,
} from ".";

const insertNewLogTest = () => {
  insertNewLog({
    id: "1234",
    timeSpent: 100,
    joinDate: new Date(),
    leaveDate: new Date(),
  });
};

const fetchAllDataTest = () => {
  console.log(fetchAllLogs());
};

const fetchIdListTest = () => {
  console.log(fetchIdList());
};

const fetchUserLogTest = () => {
  console.log(fetchUserStats("1234"));
};

const fetchEveryoneStatsTest = () => {
  console.log(fetchEveryoneStats());
};
