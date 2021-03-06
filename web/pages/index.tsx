import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/client";
import { useDiscordProfile, usePhemeStats } from "../hooks/swr";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Icon } from "../components/Icon";
import prettyMilliseconds from "pretty-ms";

export default function Page() {
  const [session, loading] = useSession();
  return (
    <>
      <Head>
        <title>Pheme</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="h-screen flex flex-col justify-between text-gray-700">
        <Header />
        <main className="mb-auto">
          {loading ? (
            <Message>Loading...</Message>
          ) : session ? (
            <App />
          ) : (
            <Message>Sign inしてください</Message>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

const Message: React.VFC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 text-center font-bold text-xl">
      {children}
    </div>
  );
};

const App: React.VFC = () => {
  const { data, error } = usePhemeStats();

  if (!data) {
    return <Message>Loading...</Message>;
  }

  const list = data.stats
    .sort((a, b) => b.totalTimeSpent - a.totalTimeSpent)
    .map((stat, index) => (
      <div key={index} className="relative">
        <UserStat stat={stat} />
      </div>
    ));

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <p className="font-extrabold text-4xl">
        {data.sheetName.replaceAll("-", "/")}
      </p>
      <div className="p-1" />
      <h2 className="font-bold text-2xl">今週のボイスチャンネル参加時間</h2>
      <div className="p-3" />
      <div className="grid gap-2">{list}</div>
    </div>
  );
};

const UserStat: React.VFC<{ stat: Stat }> = ({ stat }) => {
  const { data, error } = useDiscordProfile(stat.id);
  if (error) {
    console.error("discordからユーザーデータの取得に失敗", error);
  }
  if (!data) return null;

  const duration = prettyMilliseconds(stat.totalTimeSpent, {
    secondsDecimalDigits: 0,
  })
    .replace("ms", "ミリ秒")
    .replace("s", "秒")
    .replace("m", "分")
    .replace("h", "時間")
    .replace("d", "日")
    .replace("y", "年");
  const prettyMS = stat.totalTimeSpent.toLocaleString();

  return (
    <div className="flex items-center shadow rounded-2xl p-6 justify-between hover:shadow-lg transition hover:-translate-x-2 transform-gpu">
      <div className="flex items-center space-x-4">
        <Icon user={data} />
        <span className="font-medium">{data.username}</span>
      </div>
      <span className="font-bold text-2xl" title={`${prettyMS}ms`}>
        {duration}
      </span>
    </div>
  );
};
