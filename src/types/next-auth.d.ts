import { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface User extends NextAuthUser {
    _id?: string
    email?: string;
    password?: string
    name?: string;
  }

  interface Profile {
    picture?: string
    given_name?: string
    family_name?: string
    name?: string;
    email?:string;
  }

  interface Session {
    user: User & {
      id: string;
    };
  }
}


export interface CustomAdapterUser extends AdapterUser {
  _id?: string
  password?: string
}