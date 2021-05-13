import { config } from "./config";
import Discord, { TextChannel } from "discord.js";
import { getTextChannel } from "./util";

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}. ready.`);
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  const name = newState.member?.nickname || newState.member?.displayName;

  try {
    const guild = oldState.member?.guild || newState.member?.guild;
    if (guild === undefined) return;
    const channel = getTextChannel(guild);

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
  } catch (error) {
    console.error(error);
  }
});

client.login(config.token);
