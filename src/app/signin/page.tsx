'use client'

import { motion } from 'framer-motion'
import SigninForm from './components/SigninForm'

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
        <div className='px-6 pb-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='border-gray-300 border-t w-full'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>
                Or continue with
              </span>
            </div>
          </div>

          <div className='gap-3 grid grid-cols-2 mt-6'>
            <button
              type='button'
              className='inline-flex justify-center bg-white hover:bg-gray-50 shadow-sm px-4 py-2 border border-gray-300 rounded-xl w-full font-medium text-gray-700 text-sm'
            >
              Google
            </button>
            <button
              type='button'
              className='inline-flex justify-center bg-white hover:bg-gray-50 shadow-sm px-4 py-2 border border-gray-300 rounded-xl w-full font-medium text-gray-700 text-sm'
            >
              GitHub
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
