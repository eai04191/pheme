import Discord, { TextChannel } from "discord.js";

export const getTextChannel = (guild: Discord.Guild) => {
  const guildChannel = guild.channels.cache.find(
    (ch) => ch.name === "bot" && ch.type === "text"
  );
  if (!guildChannel) throw new Error(`"bot" channel is not found.`);
  const channel = guildChannel as TextChannel;
  return channel;
};
