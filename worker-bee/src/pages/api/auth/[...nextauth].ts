import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import dbConnect from "../../../../services/mongo";
import UserSchema from "../../../../models/user.model";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        await dbConnect();
        const response = await UserSchema.findOne({ email });
        if (response) {
          if (response.password === password) {
            console.log("RESPONSE", response._id);
            return response;
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/Login",
    newUser: "/NewUser",
  },
};

export default NextAuth(authOptions);
