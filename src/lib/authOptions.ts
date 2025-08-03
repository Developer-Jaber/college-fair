
// src/lib/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/app/actions/auth/loginUser";
import { NextAuthOptions } from "next-auth";
import { User as CustomUser } from "@/types";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ): Promise<{ id: string; email: string } | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Explicitly type the user as CustomUser | null
        const user: CustomUser | null = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        if (!user) {
          return null;
        }

        // Map _id to id for NextAuth.js compatibility
        return {
          id: user._id,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
  ],
  
  pages: {
    signIn: "/signin",
  },
};

