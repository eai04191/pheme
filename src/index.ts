import { config } from "./config";
import Discord from "discord.js";
const client = new Discord.Client();
import { connect } from "./db";

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}. ready.`);
  connect();
});

client.on("voiceStateUpdate", (oldState, newState) => {
  const name = newState.member?.nickname || newState.member?.displayName;

  if (oldState.channelID === null) {
    console.log(`${name} joined the channel`);
  }

  if (newState.channelID === null) {
    console.log(`${name} left the channel`);
  }

  if (newState.selfDeaf) {
    console.log(`${name} can't hear now`);
  }

  if (oldState.selfDeaf && newState.selfDeaf === false) {
    console.log(`${name} can hear now`);
  }
});

client.login(config.token);
