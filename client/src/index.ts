import { config } from "./config";
import Discord from "discord.js";
import { getTextChannel, duration, format, getRandomClock } from "./util";
import { put, get } from "./ephemeral";
import { saveLog } from "./api";

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}. ready.`);
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  if (!newState.member) return;

  const author = {
    name: newState.member.nickname || newState.member?.displayName,
    icon: newState.member.user.displayAvatarURL(),
    link: `https://discordapp.com/users/${newState.member.id}`,
  };

  try {
    const guild = oldState.member?.guild || newState.member?.guild;
    if (guild === undefined) return;
    const channel = getTextChannel(guild);

    // JOIN
    if (oldState.channelID === null) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${author.name} joined the channel!`, author.icon)
        .setColor("#77b255");
      const message = await channel.send("", embed);

      await put({
        id: newState.member.id,
        message_id: message.id,
        joinDate: new Date(),
      });
      return;
    }

    // LEFT
    if (newState.channelID === null) {
      const log = await get(newState.member.id);
      if (log === null || log.joinDate === null) return;

      const { message_id, joinDate } = log;
      const leaveDate = new Date();

      const message = channel.messages.cache.find(
        (message) => message.id === message_id
      );
      if (message === undefined) return;

      const clock = getRandomClock();
      const spent = duration(joinDate);
      // If the time spent is less than VC_SRESHOLD, remove the message
      if (!spent) {
        message.delete();
        return;
      }
      const join = format(joinDate);
      const leave = format(leaveDate);

      const embed = new Discord.MessageEmbed()
        .setAuthor(`${author.name} left the channel!`, author.icon)
        .setColor("#dd2e44")
        .setDescription(
          `${clock} Spent **${spent}** from ${join} to ${leave}.`
        );
      message.edit("", embed);

      saveLog({ ...log, leaveDate });
      return;
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
