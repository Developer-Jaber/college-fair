'use client'

import { UserRole } from "@/types/auth";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";


interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGuard({ allowedRoles, children, fallback}:RoleGuardProps){
  const { data:session } = useSession();

  if(!session?.user?.role || !allowedRoles.includes(session.user.role)){
      return fallback || (
        <div className="p-4 text-muted-foreground text-center">
          You don&lsquo;t have permission to view this content.
        </div>
      );
  }

  return <>{children}</>
}