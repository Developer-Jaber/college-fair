
// src/lib/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/app/actions/auth/loginUser";
import { NextAuthOptions, Profile } from "next-auth";
import { User as CustomUser } from "@/types";
import GoogleProvider from "next-auth/providers/google";
import dbConnect, { collectionNames } from "./dbConnect";
import { UserRole } from "@/types/auth";

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
        name: {label:"Name", type: "name", required: false},
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(
        credentials: Record<"name" | "email" | "password", string> | undefined,
      ){
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
          name: user.name || '', 
          role: (user.role as UserRole) || 'staff', 
          department: user.department || undefined, 
        };
      },
    }),
    GoogleProvider(getGoogleCredentials())
  ],

  pages: {
    signIn: "/signin",
    error: '/signin'
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 //30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
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
            lastLogin: new Date(),
            role: 'student' as UserRole,
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
    async jwt({token, user,account, profile}) {
      if(user) {
        token.role = (user).role || "student";
        token.department = (user).department;
        token.id = user.id;
      }

      if (account?.provider === 'google' && profile) {
        token.email_verified = (profile).email_verified;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as UserRole;
        session.user.department = token.department as string;
        session.user.id = token.id as string;
      }
      return session;
    },

  },
  
};

