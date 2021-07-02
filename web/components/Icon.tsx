import Image from "next/image";

export const Icon: React.VFC<{ user: DiscordUser }> = ({ user }) => {
  return (
    <Image
      className="rounded-full"
      src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
      alt={`${user.username}'s avatar`}
      width={32}
      height={32}
    />
  );
};
