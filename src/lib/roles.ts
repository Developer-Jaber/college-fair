export const ROLE_PERMISSION: Record<UserRole, Permission[]> = {
    admin: [
    { resource: 'facilities', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'bookings', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'reports', actions: ['read'] },
  ],
  staff: [
    { resource: 'facilities', actions: ['read', 'update'] },
    { resource: 'bookings', actions: ['create', 'read', 'update'] },
    { resource: 'users', actions: ['read'] },
  ],
  faculty: [
    { resource: 'facilities', actions: ['read'] },
    { resource: 'bookings', actions: ['create', 'read', 'update'] },
  ],
  student: [
    { resource: 'facilities', actions: ['read'] },
    { resource: 'bookings', actions: ['create', 'read'] },
  ],
};

export const getDashboardConfig = (role: UserRole) => {
    const baseConfig = {
    admin: {
      title: 'Admin Dashboard',
      description: 'Manage all college facilities and bookings',
      sections: ['overview', 'facilities', 'bookings', 'users', 'reports'],
    },
    staff: {
      title: 'Staff Dashboard',
      description: 'Manage facilities and bookings',
      sections: ['overview', 'facilities', 'bookings'],
    },
    faculty: {
      title: 'Faculty Dashboard',
      description: 'View and book college facilities',
      sections: ['overview', 'bookings', 'my-bookings'],
    },
    student: {
      title: 'Student Dashboard',
      description: 'Book available college facilities',
      sections: ['overview', 'bookings', 'my-bookings'],
    },
  };

  return baseConfig[role];
};