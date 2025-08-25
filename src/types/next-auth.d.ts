import { User as NextAuthUser } from "next-auth";
import { UserRole } from "./auth";

declare module "next-auth" {
  interface User extends NextAuthUser {
    id:string;
    _id?: string
    email?: string;
    password?: string
    name?: string;
    role: UserRole;        
    department?: string; 
    image?: string;
  }

  interface Profile {
    picture?: string
    given_name?: string
    family_name?: string
    name?: string;
    email?:string;
    sub?: string;
    email_verified?: boolean;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: UserRole;       
      department?: string; 
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    role: UserRole;       
    department?: string;   
    sub?: string; // Subject (user ID)   
  }
}


export interface CustomAdapterUser extends AdapterUser {
  _id?: string;
  password?: string;
  role: UserRole;          
  department?: string;    
}