
import '../globals.css'
import NextAuthSessionProvider from '@/Providers/NextAuthSessionProvider'
import { Providers } from '../providers'


export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NextAuthSessionProvider>
      <Providers>{children}</Providers>
    </NextAuthSessionProvider>
  )
}
