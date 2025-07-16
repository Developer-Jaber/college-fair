
// src/lib/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/app/actions/auth/loginUser";
import { NextAuthOptions } from "next-auth";
import { User as CustomUser } from "@/types";

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
  ],
  pages: {
    signIn: "/signin",
  },
};





// import CredentialsProvider from "next-auth/providers/credentials";
// import { loginUser } from "@/app/actions/auth/loginUser";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. "Sign in with...")
//       name: "Credentials",
//       // `credentials` is used to generate a form on the sign in page.
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password" }
//       },
//       async authorize(credentials) {
//         // Add logic here to look up the user from the credentials supplied
//         const user = await loginUser(credentials)
//         if (user) {
//           // Any object returned will be saved in `user` property of the JWT
//           return user
//         } else {
//           // If you return null then an error will be displayed advising the user to check their details.
//           return null

//           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         }
//       }
//     })
//   ],
//   pages: {
//     signIn: '/signin'
//   }
// }