
import '../globals.css'
import NextAuthSessionProvider from '@/Providers/NextAuthSessionProvider'
import { Providers } from '../providers'
import { DashboardLayout } from './_components/dashboard-layout'
import { SidebarProvider } from '@/components/ui/sidebar'


export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NextAuthSessionProvider>
      <Providers>
       <SidebarProvider>
         <DashboardLayout>{children}</DashboardLayout>
       </SidebarProvider>
      </Providers>
    </NextAuthSessionProvider>
  )
}
