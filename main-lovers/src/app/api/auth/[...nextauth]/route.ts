import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/users";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(connectMongo),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Sign In With Credentials",

      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Enter Your email...",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter Your Password...",
        },
      },

      async authorize(credentials, req) {
        const email = req?.body?.email;

        const user = await User.findOne({ email });

        if (!user) return null;

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    session({ session, token }) {
      session.user.sub = token.sub;
      session.user.email = token.email;
      session.user.premium = token.premium;
      session.user.admin = token.admin;
      session.user.city = token.city;
      return session;
    },
    jwt({ token, session, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.premium = user.premium;
        token.admin = user.lukqhdsngvkfq;
        token.city = user.city;
      }
      return token;
    },
  },
  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
