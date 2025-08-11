import type { Metadata } from 'next'
import { geist } from '@/fonts/geist'
import '../globals.css'
import Navbar from '@/components/Navbar'
import NextAuthSessionProvider from '@/Providers/NextAuthSessionProvider'
import Footer from '@/components/Footer'
import { Providers } from '../providers'

export const metadata: Metadata = {
  title: {
    default: 'CollegeFair | Book College Facilities Online',
    template: '%s | CollegeFair'
  },
  description:
    'Streamline campus resource management with instant bookings for classrooms, labs, and event spaces. Designed for universities and students.',
  keywords: [
    'college booking',
    'campus facilities',
    'university reservation system',
    'room booking',
    'educational space management'
  ],
  metadataBase: new URL('https://college-fair-six.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CollegeFair | Modern Campus Booking Platform',
    description: 'Book college facilities with our intuitive reservation system. Perfect for students and administrators.',
    url: 'https://college-fair-six.vercel.app',
    siteName: 'CollegeFair',
    images: [
      {
        url: 'https://i.ibb.co/LDCdVT6d/Screenshot-2025-07-13-151313.png',
        width: '1200',
        height: '630',
        alt: 'CampusSpot Booking Interface'
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CollegeFair | Book College Facilities Online',
    description: 'Instant bookings for classrooms, labs, and event spaces at your fingertips.',
    images: ['https://i.ibb.co/LDCdVT6d/Screenshot-2025-07-13-151313.png'],
    creator: '@CollegeFair',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'KNTJ4myhefC0Na_Le0ksYXXFgsV4mcoP9EJbXowfrc0',
  },
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <NextAuthSessionProvider>
        <body className={geist.variable}>
          <Providers>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
          </Providers>
        </body>
      </NextAuthSessionProvider>
    </html>
  )
}
