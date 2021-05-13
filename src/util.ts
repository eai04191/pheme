import Discord, { TextChannel } from "discord.js";
import prettyMilliseconds from "pretty-ms";
import dayjs from "dayjs";

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
  return dayjs(date).format("HH:mm");
};

export const getRandomClock = () => {
  const clocks = [
    ":clock1:",
    ":clock130:",
    ":clock2:",
    ":clock230:",
    ":clock3:",
    ":clock330:",
    ":clock4:",
    ":clock430:",
    ":clock5:",
    ":clock530:",
    ":clock6:",
    ":clock630:",
    ":clock7:",
    ":clock730:",
    ":clock8:",
    ":clock830:",
    ":clock9:",
    ":clock930:",
    ":clock10:",
    ":clock1030:",
    ":clock11:",
    ":clock1130:",
    ":clock12:",
    ":clock1230:",
  ];
  return clocks[Math.floor(Math.random() * clocks.length)];
};
