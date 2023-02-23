import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/SignIn",
  },
};

export default NextAuth(authOptions);
