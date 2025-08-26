'use client'

import * as React from 'react'
import {
  Icon,
  IconCamera,
  IconDatabase,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
} from '@tabler/icons-react'
import logo from './../../public/logo/college-fair-logo.png'
import { NavDocuments } from '@/components/nav-documents'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import { motion } from 'framer-motion'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { UserRole } from '@/types/auth'




interface NavItem {
   title: string;
   url: string;
   icon:  Icon;
   isActive?: boolean;
   items?: { title: string; url: string }[];
}

interface SidebarData {
  navMain: NavItem[];
  navClouds: NavItem[];
  navSecondary: NavItem[];
  documents: { name: string; url: string; icon: Icon }[];
}


const getSidebarData = (role?: UserRole): SidebarData => {
  const baseData: SidebarData = {

    navMain: role ? [] : [],

    navClouds: role === "admin" || role === 'staff'? [
      {
         title: 'Facilities Management',
        icon: IconCamera,
        isActive: true,
        url: '/dashboard/facilities',
        items: [
          { title: 'All Facilities', url: '/dashboard/facilities' },
          { title: 'Add New', url: '/dashboard/facilities/new' }
        ]
      },
      {
        title: 'Booking Management',
        icon: IconFileDescription,
        url: '/dashboard/bookings',
        items: [
          { title: 'Pending Approvals', url: '/dashboard/bookings/pending' },
          { title: 'All Bookings', url: '/dashboard/bookings' }
        ]
      }
    ] : [
      {
        title: 'My Bookings',
        icon: IconFileDescription,
        url: '/dashboard/my-bookings',
        items: [
          { title: 'Active', url: '/dashboard/my-bookings' },
          { title: 'History', url: '/dashboard/my-bookings/history' }
        ]
      }
    ],

    navSecondary: [
       {
        title: 'Settings',
        url: '/dashboard/settings',
        icon: IconSettings
      },
      {
        title: 'Get Help',
        url: '/dashboard/help',
        icon: IconHelp
      },
      {
        title: 'Search',
        url: '/dashboard/search',
        icon: IconSearch
      }
    ],

    // admin-only documents
    documents: role === 'admin' ? [
       {
        name: 'User Management',
        url: '/dashboard/users',
        icon: IconDatabase
      },
      {
        name: 'Reports',
        url: '/dashboard/reports',
        icon: IconReport
      },
      {
        name: 'System Settings',
        url: '/dashboard/system',
        icon: IconFileWord
      }
    ] : []
  }

  return baseData
}

export function AppSidebar ({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data: session} = useSession();

  const data = getSidebarData(session?.user?.role)
  
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
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
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {data.documents.length> 0 && <NavDocuments items={data.documents}></NavDocuments>}
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
