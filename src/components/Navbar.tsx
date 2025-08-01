'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import logo from './../../public/logo/college-fair-logo.png'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()

  // Close mobile menu when clicking a link
  const closeMenu = () => setIsOpen(false)

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setScrolled(true)
      else setScrolled(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Nav links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'College', href: '/colleges' },
    { name: 'Admission', href: '/admission' },
    { name: 'My College', href: '/my-college' },
    // { name: 'Products', href: '/products' },
    // { name: 'Add', href: '/products/add' },
    // { name: "Bookings", href: "/bookings" },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <header
      className={`fixed w-full z-50  transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 shadow-md py-2 backdrop-blur-sm'
          : 'bg-transparent py-8'
      }`}
    >
      <nav className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link href='/' className='flex-shrink-0'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center'
            >
              <Image
                width={150}
                className='rounded-2xl'
                src={logo}
                alt='college-fair'
              ></Image>
            </motion.div>
          </Link>

          {/* Desktop Nav Links */}
          <div className='hidden md:flex items-center space-x-8'>
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className='group relative text-gray-700 hover:text-primary transition-colors'
              >
                {link.name}
                <motion.span
                  className='bottom-0 left-0 absolute bg-primary w-0 group-hover:w-full h-0.5 transition-all duration-300'
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                />
              </Link>
            ))}

            {session?.user?.email ? (
              
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signOut()}
                  className='bg-[var(--primary)] px-4 py-2 rounded-md font-medium text-white'
                >
                  Sign Out
                </motion.button>
              
            ) : (
              <Link href={'/register'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  // onClick={() => signIn()}
                  className='bg-[var(--primary)] px-4 py-2 rounded-md font-medium text-white'
                >
                  Sign Up
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='p-2 rounded-md focus:outline-none text-gray-700 hover:text-primary'
            >
              {isOpen ? (
                <XMarkIcon className='w-6 h-6' />
              ) : (
                <Bars3Icon className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu (Animated) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className='md:hidden overflow-hidden'
            >
              <div className='space-y-2 px-2 pt-2 pb-4'>
                {navLinks.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className='block hover:bg-gray-100 px-3 py-2 rounded-md font-medium text-gray-700 text-base'
                  >
                    {link.name}
                  </Link>
                ))}

                <button className='bg-primary px-4 py-2 rounded-md w-full font-medium text-white'>
                  Sign In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Navbar
