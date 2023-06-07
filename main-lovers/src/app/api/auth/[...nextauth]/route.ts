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
      authorization: {
        params: {
          scope: "user:email%20read:user",
        },
      },
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

      // LOGIN CHECK
      async authorize(credentials, req) {
        console.log("⭐️");

        const email = req?.body?.email;
        console.trace({ email });
        console.trace(credentials);

        const user = await User.findOne({ email });
        console.trace({ user });
        if (!user) return null;

        // const isPwdValid = await bcrypt.compare(
        //   user.password,
        //   req?.body?.password
        // );

        // return user;
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
      console.log("NEXT AUTH CALLBACK - SECOND (session)");
      // console.log({ token });
      console.log({ session });

      session.user.sub = token.sub;
      session.user.email = token.email;
      session.user.premium = token.premium;
      session.user.admin = token.admin;
      session.user.city = token.city;
      return session;
    },
    jwt({ token, session, user, account }) {
      console.log("NEXT AUTH CALLBACK - FIRST (twt)");

      console.trace({ account });
      console.trace({ user });
      console.log({ token });
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
