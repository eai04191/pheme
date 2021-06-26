import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  token: process.env.DISCORD_TOKEN,
  timezone: process.env.TZ,
  threshold_for_time_spent: Number(process.env.THRESHOLD_FOR_TIME_SPENT || 180000),
};