import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import connectMongo from "../../../utils/connectMongo";
import mongoose from "../../../utils/mongoose";
import { z } from "zod";
import User from "../../../models/users";
import bcrypt from "bcrypt";
import { log } from "console";

// const collection = connectMongo.collection("users");

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "Password should be minimum of 5 characters"),
});

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
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Sign In With Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
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
        // const { name, password } = credentials as any;
        // // console.log("authorize 🔥");
        // console.log(req?.body?.email);
        // console.log(req?.body?.password);

        const email = req?.body?.email;

        // console.log(credentials);

        // const { email, password } = loginUserSchema.parse(credentials);

        const user = await User.findOne({ email });
        // console.log({ user });

        // console.log("PASSWORDs ⤵️");
        // console.log(user.password);
        // console.log(req?.body?.password);

        if (!user) return null;

        const isPwdValid = await bcrypt.compare(
          user.password,
          req?.body?.password
        );

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
      console.log("NEXT AUTH CALLBACK");
      console.log({ token });
      console.log({ session });

      session.user.sub = token.sub;
      session.user.email = token.email;
      return session;
    },
    jwt({ token, account, user }) {
      // console.log("JWT CALLBACK");

      // console.log({ token });
      // console.log({ account });
      if (account) {
        token.accessToken = account.access_token;
        token.admin = session.account;
        // token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);
// console.log(handler);
export { handler as GET, handler as POST };
