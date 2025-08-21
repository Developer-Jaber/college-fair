// lib/roles.ts
import { UserRole } from '@/types/auth';

export const ROLE_PERMISSIONS = {
  admin: {
    canManageUsers: true,
    canManageFacilities: true,
    canViewAllBookings: true,
    canApproveBookings: true,
    canViewReports: true,
  },
  staff: {
    canManageUsers: false,
    canManageFacilities: true,
    canViewAllBookings: true,
    canApproveBookings: true,
    canViewReports: false,
  },
  faculty: {
    canManageUsers: false,
    canManageFacilities: false,
    canViewAllBookings: false,
    canApproveBookings: false,
    canViewReports: false,
  },
  student: {
    canManageUsers: false,
    canManageFacilities: false,
    canViewAllBookings: false,
    canApproveBookings: false,
    canViewReports: false,
  },
};

export const getSidebarItems = (role: UserRole) => {
  const allItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard', roles: ['admin', 'staff', 'faculty', 'student'] },
    { name: 'Facilities', href: '/dashboard/facilities', icon: 'Building2', roles: ['admin', 'staff', 'faculty', 'student'] },
    { name: 'My Bookings', href: '/dashboard/my-bookings', icon: 'Calendar', roles: ['faculty', 'student'] },
    { name: 'All Bookings', href: '/dashboard/bookings', icon: 'CalendarCheck', roles: ['admin', 'staff'] },
    { name: 'Users', href: '/dashboard/users', icon: 'Users', roles: ['admin'] },
    { name: 'Reports', href: '/dashboard/reports', icon: 'BarChart3', roles: ['admin'] },
  ];

  return allItems.filter(item => item.roles.includes(role));
};