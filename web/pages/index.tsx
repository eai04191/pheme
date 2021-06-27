import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Page() {
  const [session, loading] = useSession();

  if (session) return <div>hello</div>;
  return <button onClick={() => signIn("discord")}>Sign out</button>;
}
