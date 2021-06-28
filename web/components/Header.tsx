import { signIn, signOut, useSession } from "next-auth/client";
import clsx from "clsx";

export const Header: React.VFC = () => {
  const [session, loading] = useSession();
  const button = session ? <SignOut /> : <SignIn />;

  return (
    <div className="relative bg-white shadow flex-grow-0 ">
      <nav className="flex items-center  max-w-7xl mx-auto justify-between py-7 px-4">
        <div className="text-3xl font-black tracking-wide">Pheme</div>
        <div>{button}</div>
      </nav>
    </div>
  );
};

const Button: React.VFC<{ children: React.ReactNode; onClick: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="border bg-white text-gray-600 border-gray-400 p-2 rounded font-semibold"
    >
      {children}
    </button>
  );
};

const SignIn: React.VFC = () => {
  return <Button onClick={() => signIn("discord")}>Sign in with Discord</Button>;
};

const SignOut: React.VFC = () => {
  return <Button onClick={() => signOut()}>Sign out</Button>;
};
