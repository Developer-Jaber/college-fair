
'use client'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { UserRole } from '@/types/auth'

type UseRoleProtectionOptions = {
  requiredRole?: UserRole[]
  redirectTo?: string
  fallbackRoute?: string
}

export function useRoleProtection(options: UseRoleProtectionOptions = {}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const {
    requiredRole = [],
    redirectTo = '/unauthorized',
    fallbackRoute = '/signin'
  } = options

  useEffect(() => {
    if (status === 'loading') return

    // Not authenticated
    if (!session) {
      router.push(`${fallbackRoute}?callbackUrl=${pathname}`)
      return
    }

    // No role requirements - allow access
    if (requiredRole.length === 0) {
      setIsAuthorized(true)
      setIsLoading(false)
      return
    }

    // Check role authorization
    const userRole = session.user.role
    const hasRequiredRole = requiredRole.includes(userRole)

    if (!hasRequiredRole) {
      router.push(redirectTo)
      return
    }

    setIsAuthorized(true)
    setIsLoading(false)
  }, [session, status, requiredRole, redirectTo, fallbackRoute, pathname, router])

  return {
    isAuthorized,
    isLoading,
    user: session?.user,
    session
  }
}

// Convenience hooks for specific roles
export function useAdminProtection() {
  return useRoleProtection({ requiredRole: ['admin'] })
}

export function useStudentProtection() {
  return useRoleProtection({ requiredRole: ['student'] })
}

export function useFacultyProtection() {
  return useRoleProtection({ requiredRole: ['faculty'] })
}

export function useAdminOrStaffProtection() {
  return useRoleProtection({ requiredRole: ['admin', 'staff'] })
}