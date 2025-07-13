import type { Metadata } from "next";
import { geist } from '@/fonts/geist';
import "./globals.css";
import Navbar from "@/components/Navbar";
import NextAuthSessionProvider from "@/Providers/NextAuthSessionProvider";
import Footer from "@/components/Footer";




export const metadata: Metadata = {
  title: "CampusSpot | Book College Facilities Online",
  description: "Streamline campus resource management with instant bookings for classrooms, labs, and event spaces. Designed for universities and students.",
  keywords: ["college booking", "campus facilities", "university reservation system"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
      <body
        className={geist.variable}
      >
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </body>
      </NextAuthSessionProvider>
    </html>
  );
}
