'use client'

import { motion } from 'framer-motion'
import SigninForm from './components/SigninForm'
import SocialLoginForm from '@/components/SocialLoginForm'

export default function SignInPage () {
  return (
    <div className='flex justify-center items-center bg-[var(--background)] p-4 py-42 min-h-screen'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white shadow-xl rounded-2xl w-full max-w-md overflow-hidden'
      >
        {/* Header */}
        <div className='bg-[var(--primary)] p-6 text-white text-center'>
          <h1 className='font-bold text-2xl'>Welcome Back</h1>
          <p className='mt-1 text-blue-100'>Sign in to access your account</p>
        </div>

        {/* Sign In Form */}
        <SigninForm></SigninForm>

        {/* Social Login */}
        <SocialLoginForm></SocialLoginForm>
      </motion.div>
    </div>
  )
}
