import Image from "next/image";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/client";
import { useDiscordProfile, usePhemeStats } from "../hooks/swr";
import { SignIn } from "../components/SignIn";

export default function Page() {
  const [session, loading] = useSession();

  if (!session) {
    return <SignIn />;
  }

  return <App />;
}

const App: React.VFC = () => {
  const { data, error } = usePhemeStats();

  const list = data ? (
    data.map((stat, index) => (
      <div key={index}>
        <UserStat stat={stat} />
      </div>
    ))
  ) : (
    <div>Loading...</div>
  );

  return (
    <div>
      <h1>Pheme</h1>
      <button onClick={() => signOut()}>Sign out</button>
      {list}
    </div>
  );
};

const UserStat: React.VFC<{ stat: Stat }> = ({ stat }) => {
  const { data, error } = useDiscordProfile(stat.id);
  if (error) {
    console.error("discordからユーザーデータの取得に失敗", error);
  }
  if (!data) return null;

  const avatar = `https://cdn.discordapp.com/avatars/${stat.id}/${data.avatar}.png`;

  return (
    <div>
      <Image
        src={avatar}
        alt={`${data.username}'s avatar`}
        width={32}
        height={32}
      />
      <span>{data.username}</span>:<span>{stat.totalTimeSpent}ms</span>
    </div>
  );
};
