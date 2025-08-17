'use client'

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle
} from '@tabler/icons-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { signOut, useSession } from 'next-auth/react'

export function NavUser () {
  const { isMobile } = useSidebar()
  const { data: session } = useSession()
  const user = session?.user

  // Get initials for fallback avatar
  const getInitials = (name?: string | null) => {
    if (!name) return 'US'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='grayscale rounded-lg w-8 h-8'>
                <AvatarImage
                  src={user?.image ?? undefined}
                  alt={user?.name ?? 'User'}
                />
                <AvatarFallback className='rounded-lg'>
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 grid text-sm text-left leading-tight'>
                <span className='font-medium truncate'>{user?.name}</span>
                <span className='text-muted-foreground text-xs truncate'>
                  {user?.email}
                </span>
              </div>
              <IconDotsVertical className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-sm text-left'>
                <Avatar className='rounded-lg w-8 h-8'>
                  <AvatarImage
                    src={user?.image ?? undefined}
                    alt={user?.name ?? 'User'}
                  />
                  <AvatarFallback className='rounded-lg'>
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1 grid text-sm text-left leading-tight'>
                  <span className='font-medium truncate'>{user?.name}</span>
                  <span className='text-muted-foreground text-xs truncate'>
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconLogout />
              <button
                onClick={() => {
                  signOut()
                }}
                className='bg-primary px-4 py-2 rounded-md w-full font-medium text-white'
              >
                Sign Out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
