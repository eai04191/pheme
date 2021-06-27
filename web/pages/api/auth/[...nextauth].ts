import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: "identify guilds",
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile) {
      //   console.log("jwt:", { token, user, account, profile });
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, token) {
      //   console.log("session:", session, token);
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
