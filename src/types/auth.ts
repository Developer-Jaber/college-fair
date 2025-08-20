export type UserRole = 'admin' | 'staff' | 'faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  permissions: Permission[];
}

export interface Permission {
    resource: string;
    action: ('create' | 'read' | 'update' | 'delete')[];
}