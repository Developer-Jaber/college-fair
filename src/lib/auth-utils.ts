
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { UserRole } from '@/types/auth'
import { redirect } from 'next/navigation'

export async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/signin')
  }
  
  return session.user
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await getAuthenticatedUser()
  
  if (!allowedRoles.includes(user.role)) {
    redirect('/unauthorized')
  }
  
  return user
}

export async function requireAdmin() {
  return await requireRole(['admin'])
}

export async function requireStudent() {
  return await requireRole(['student'])
}

export async function requireAdminOrStaff() {
  return await requireRole(['admin', 'staff'])
}