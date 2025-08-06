
// src/lib/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/app/actions/auth/loginUser";
import { NextAuthOptions, Profile } from "next-auth";
import { User as CustomUser } from "@/types";
import GoogleProvider from "next-auth/providers/google";
import dbConnect, { collectionNames } from "./dbConnect";

// validate the environment variavles
function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error("Google Client ID and Secret must set in .env file.")
  }

  return { clientId, clientSecret }

}

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
    GoogleProvider(getGoogleCredentials())
  ],

  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle credentials login
      if (!account || account.provider === 'credentials') {
        return true
      }

      // Type guard for social providers
      if (account.provider && user.email) {
        try {
          // Safe type casting for profile
          const socialProfile = profile as (Profile & {
            picture?: string
            given_name?: string
            family_name?: string
          }) | undefined

          const userData = {
            name: user.name ||
              socialProfile?.name ||
              `${socialProfile?.given_name || ''} ${socialProfile?.family_name || ''}`.trim() ||
              'Unknown User',
            email: user.email,
            image: user.image || socialProfile?.picture,
            provider: account.provider,
            lastLogin: new Date()
          }

          await dbConnect(collectionNames.USERS).updateOne(
            { email: userData.email },
            {
              $set: userData,
              $setOnInsert: {
                createdAt: new Date(),
                verified: true
              }
            },
            { upsert: true }
          )
          return true
        } catch (error) {
          console.error('User data update failed:', error)
          return false
        }
      }

      return false
    },
  }
};

