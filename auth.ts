import NextAuth from "next-auth";
import { getExistingUser } from "./lib/user";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./drizzle/db";
import authConfig from "./auth.config";
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
    async session({ session, token }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getExistingUser(token.email as string);
      if (!existingUser) return token;
      token.name = existingUser.name;
      token.email = existingUser.email;
      return token;
    },
  },
  ...authConfig,
});
