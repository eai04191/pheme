import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/client";
import { useDiscordProfile, usePhemeStats } from "../hooks/swr";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function Page() {
  const [session, loading] = useSession();
  return (
    <>
      <Head>
        <title>Pheme</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="h-screen flex flex-col justify-between">
        <Header />
        <main className="mb-auto">
          {session ? <App /> : <p>signinしてください</p>}
        </main>
        <Footer />
      </div>
    </>
  );
}

const App: React.VFC = () => {
  const { data, error } = usePhemeStats();

  if (!data) return <div>Loading...</div>;

  const list = data.stats.map((stat, index) => (
    <div key={index}>
      <UserStat stat={stat} />
    </div>
  ));

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="font-extrabold text-4xl">
        {data.sheetName.replaceAll("-", "/")}~
      </h2>
      <div className="p-2" />
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

  return (
    <div className="flex items-center gap-4 shadow rounded-2xl p-6 justify-between">
      <div className="flex items-center gap-4">
        <Image
          className="rounded-full"
          src={`https://cdn.discordapp.com/avatars/${stat.id}/${data.avatar}.png`}
          alt={`${data.username}'s avatar`}
          width={32}
          height={32}
        />
        <span className="font-medium">{data.username}</span>
      </div>
      <span className="font-bold text-2xl">{stat.totalTimeSpent}ms</span>
    </div>
  );
};
