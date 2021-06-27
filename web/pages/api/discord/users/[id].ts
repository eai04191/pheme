import type { NextApiRequest, NextApiResponse } from "next";

const getDiscordUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) throw new Error("DISCORD_BOT_TOKENがないよ");

  const {
    query: { id },
  } = req;

  const data = await fetch(`https://discord.com/api/users/${id}`, {
    headers: { Authorization: `Bot ${token}` },
  }).then((response) => response.json());

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
};

export default getDiscordUser;
