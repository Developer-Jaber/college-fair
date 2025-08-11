
import '../globals.css'
import Navbar from '@/components/Navbar'
import NextAuthSessionProvider from '@/Providers/NextAuthSessionProvider'
import Footer from '@/components/Footer'
import { Providers } from '../providers'


export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NextAuthSessionProvider>
      <Providers>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </Providers>
    </NextAuthSessionProvider>
  )
}
