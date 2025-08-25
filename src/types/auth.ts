export type UserRole = 'admin' | 'staff' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

declare module "next-auth" {
  interface User {
    id: string;
    role: UserRole;
    department?:string;
  }

  interface Session {
    user:{
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: UserRole;
      department?: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    department?: string;
  }
}