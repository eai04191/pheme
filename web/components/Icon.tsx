import Image from "next/image";

export const Icon: React.VFC<{ user: DiscordUser }> = ({ user }) => {
  const avatarUrl = (() => {
    if (user.avatar) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    }
    const defaultAvatarNumber = parseInt(user.discriminator) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
  })();

  return (
    <Image
      className="rounded-full"
      src={avatarUrl}
      alt={`${user.username}'s avatar`}
      width={32}
      height={32}
    />
  );
};
