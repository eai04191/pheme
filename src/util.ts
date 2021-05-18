import Discord, { TextChannel } from "discord.js";
import prettyMilliseconds from "pretty-ms";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);
import { config } from "./config";

if (config.timezone === undefined) {
  const guess = dayjs.tz.guess();
  dayjs.tz.setDefault(guess);
  console.log(
    `Since TZ was not set in env, the time zone was guessed to be ${guess} and was set.`
  );
} else {
  dayjs.tz.setDefault(config.timezone);
  console.log(`The time zone has been set to ${config.timezone}.`);
}

export const getTextChannel = (guild: Discord.Guild) => {
  const guildChannel = guild.channels.cache.find(
    (ch) => ch.name === "bot" && ch.type === "text"
  );
  if (!guildChannel) throw new Error(`"bot" channel is not found.`);
  const channel = guildChannel as TextChannel;
  return channel;
};

export const duration = (date: Date) => {
  const ms = new Date().getTime() - date.getTime();
  return prettyMilliseconds(ms, {
    secondsDecimalDigits: 0,
  });
};

export const format = (date: Date) => {
  return dayjs(date).tz().format("HH:mm");
};

export const getRandomClock = () => {
  const r = Math.random();
  const time = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12][Math.floor(r * 12)];
  const half = ["", "30"][Math.floor(r * 2)];
  return `:clock${time}${half}:`;
};
