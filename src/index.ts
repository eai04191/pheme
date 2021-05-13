import { config } from "./config";
import Discord, { TextChannel } from "discord.js";
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}. ready.`);
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  const name = newState.member?.nickname || newState.member?.displayName;

  const guild = oldState.member?.guild || newState.member?.guild;
  if (!guild) return;
  const guildChannel = guild.channels.cache.find(
    (ch) => ch.name === "bot" && ch.type === "text"
  );
  if (!guildChannel) return;
  const channel = guildChannel as TextChannel;

  if (oldState.channelID === null) {
    await channel.send(`:inbox_tray: **${name}** joined the channel`);
  }

  if (newState.channelID === null) {
    await channel.send(`:outbox_tray: **${name}** left the channel`);
  }

  // if (newState.selfDeaf) {
  //   console.log(`${name} can't hear now`);
  // }

  // if (oldState.selfDeaf && newState.selfDeaf === false) {
  //   console.log(`${name} can hear now`);
  // }
});

client.login(config.token);
