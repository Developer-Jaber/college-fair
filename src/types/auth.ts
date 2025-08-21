export type UserRole = 'admin' | 'staff' | 'faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

declare module "next-auth" {
  interface User {
    role: UserRole;
    department?:string;
  }

  interface Session {
    user: User;
  }
}

