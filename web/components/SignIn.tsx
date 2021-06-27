import { signIn } from "next-auth/client";

export const SignIn: React.VFC = () => {
  return <button onClick={() => signIn("discord")}>Sign in</button>;
};
