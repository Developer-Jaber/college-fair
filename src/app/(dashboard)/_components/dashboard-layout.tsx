'use client'
import { ReactNode, useEffect, useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import {
  Award,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ClipboardList,
  CreditCard,
  GraduationCap,
  KeyRound,
  Loader2,
  Menu,
  Receipt,
  Shield,
  ShoppingCart,
  UserCog,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FaUserGraduate } from 'react-icons/fa'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Sidebar, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import { NavUser } from '@/components/nav-user'
import Image from 'next/image'
import logo from './../../../../public/logo/college-fair-logo.png'
import { IconDashboard } from '@tabler/icons-react'
import { SiteHeader } from '@/components/site-header'
import { useSession } from 'next-auth/react'

type RouteGroupType = {
  group: string
  items: {
    href: string
    label: string
    icon: ReactNode
    permission?: string[]
  }[]
}

const ROUTE_GROUPS: RouteGroupType[] = [
  {
    group: 'College Management',
    items: [
      {
        href: '/admin',
        label: 'Overview',
        icon: <IconDashboard className='mr-2 size-3' />
      },
      {
        href: '/admin/college-management/departments',
        label: 'Departments',
        icon: <GraduationCap className='mr-2 size-3' />
      },
      {
        href: '/admin/college-management/courses',
        label: 'Courses',
        icon: <BookOpen className='mr-2 size-3' />
      },
      {
        href: '/admin/college-management/faculty',
        label: 'Faculty',
        icon: <Users className='mr-2 size-3' />
      },
      {
        href: '/admin/college-management/students',
        label: 'Students',
        icon: <FaUserGraduate className='mr-2 size-3' />
      },
      {
        href: '/admin/booking-management/booking',
        label: 'All Booking',
        icon: <ShoppingCart className='mr-2 size-3' />
      },
      {
        href: '/admin/booking-management/transactions',
        label: 'Transactions',
        icon: <CreditCard className='mr-2 size-3' />
      },
      {
        href: '/admin/booking-management/invoices',
        label: 'Invoices',
        icon: <Receipt className='mr-2 size-3' />
      },
      {
        href: '/admin/user-management/admins',
        label: 'Admins',
        icon: <Shield className='mr-2 size-3' />
      },
      {
        href: '/admin/user-management/staff',
        label: 'Staff',
        icon: <UserCog className='mr-2 size-3' />
      },
      {
        href: '/admin/user-management/customers',
        label: 'Customers',
        icon: <Users className='mr-2 size-3' />
      },
      {
        href: '/admin/user-management/roles',
        label: 'Roles & Permissions',
        icon: <KeyRound className='mr-2 size-3' />
      }
    ]
  },
  {
    group: 'Student Management',
    items: [
      {
        href: '/student',
        label: 'Overview',
        icon: <IconDashboard className='mr-2 size-3' />
      },
      {
        href: '/student/courses',
        label: 'My Courses',
        icon: <BookOpen className='mr-2 size-3' />
      },
      {
        href: '/student/schedule',
        label: 'Class Schedule',
        icon: <Calendar className='mr-2 size-3' />
      },
      {
        href: '/student/grades',
        label: 'Grades & Transcripts',
        icon: <Award className='mr-2 size-3' />
      },
      {
        href: '/student/assignments',
        label: 'Assignments',
        icon: <ClipboardList className='mr-2 size-3' />
      }
    ]
  }
]

type RouteGroupProps = RouteGroupType

const RouteGroup = ({ group, items }: RouteGroupProps) => {
  const [open, setOpen] = useState(true)
  const pathname = usePathname()

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <Button
          className='flex justify-between w-full font-normal text-foreground/80'
          variant='ghost'
        >
          {group}
          <div className={`transition-transform ${open ? 'rotate-180' : ''}`}>
            <ChevronDown />
          </div>
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content forceMount>
        <motion.div
          className={`flex flex-col gap-2 ${
            !open ? 'pointer-events-none' : ''
          }`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {items.map(item => (
            <Button
              className='justify-start w-full font-normal'
              variant='link'
              asChild
              key={item.href}
            >
              <Link
                className={`flex items-center rounded-md px-5 py-1 transition-all ${
                  pathname === item.href
                    ? 'bg-foreground/10 hover:bg-foreground/5'
                    : 'hover:bg-foreground/10'
                }`}
                href={item.href}
              >
                {item.icon}
                <span className='text-sm'>{item.label}</span>
              </Link>
            </Button>
          ))}
        </motion.div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

type DashboardLayoutProps = { children: ReactNode };

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

   // Security check and loading state
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/signin');
      return;
    }

    const userRole = session.user.role?.toLowerCase();
    
    // Role-based route protection
    if (pathname.startsWith('/admin') && userRole !== 'admin') {
      router.push('/unauthorized');
      return;
    }
    
    if (pathname.startsWith('/student') && userRole !== 'student') {
      router.push('/unauthorized');
      return;
    }

    setIsLoading(false);
  }, [session, status, pathname, router]);

  // Show loading spinner while checking authentication
  if (status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-gray-600 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render if no session
  if (!session) {
    return null;
  }

  const userRole = session.user.role;

  const filteredRouteGroups = ROUTE_GROUPS.filter((group) => {
    if (userRole === "admin") {
      return group.group === "College Management";
    } else if (userRole === "student") {
      return group.group === "Student Management";
    }
    return false;
  });

  const getHeaderTitle = () => {
    switch(userRole?.toLowerCase()) {
      case 'admin':
        return 'Admin Dashboard';
      case 'student':
        return 'Student Dashboard';
      case 'faculty':
        return 'Faculty Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className='flex w-full'>
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger asChild>
          <Button size='icon' variant='outline'>
            <Menu />
          </Button>
        </Collapsible.Trigger>
      </Collapsible.Root>

      <Collapsible.Root
        className='left-0 z-20 fixed to-0 h-dvh'
        open={open}
        onOpenChange={setOpen}
      >
        <Collapsible.Content forceMount>
          <Sidebar>
            <div
              className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4 transition-transform duration-300 ${
                open ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <SidebarHeader>
                <div className='flex justify-between items-center'>
                  {/* Logo */}
                  <Link href='/' className='flex-shrink-0'>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className='flex items-center'
                    >
                      <Image
                        width={120}
                        className='rounded-2xl'
                        src={logo}
                        alt='college-fair'
                      ></Image>
                    </motion.div>
                  </Link>
                  <Collapsible.Trigger asChild>
                    <Button size='icon' variant='outline'>
                      <ChevronLeft />
                    </Button>
                  </Collapsible.Trigger>
                </div>
              </SidebarHeader>
              <Separator className='my-2' />
              <div className='mt-4'>
                {filteredRouteGroups.map(routeGroup => (
                  <RouteGroup {...routeGroup} key={routeGroup.group} />
                ))}
              </div>
              <Separator className='my-2' />
              <SidebarFooter>
                <NavUser />
              </SidebarFooter>
            </div>
          </Sidebar>
        </Collapsible.Content>
      </Collapsible.Root>
      <main
        className={`transition-margin flex-1 p-4 duration-300 w-full ${
          open ? 'ml-64' : 'ml-0'
        }`}
      >
        <SiteHeader>{getHeaderTitle()}</SiteHeader>
        {children}
      </main>
    </div>
  )
}

export { DashboardLayout }
