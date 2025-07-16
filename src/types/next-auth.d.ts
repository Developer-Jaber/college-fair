import { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface User extends NextAuthUser {
    id: string;
    email: string;
    name?: string;
  }

  interface Session {
    user: User & {
      id: string;
    };
  }
}