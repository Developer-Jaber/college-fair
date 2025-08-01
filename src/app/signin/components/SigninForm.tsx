import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'

// Form validation schema
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export default function SigninForm () {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true)
    setError('')

    // try {
    //   const result = await signIn('credentials', {
    //     redirect: false,
    //     email: data.email,
    //     password: data.password
    //   })

    //   if (result?.error) {
    //     throw new Error(result.error)
    //   }

    //   if (result?.ok) {
    //     router.push('/')
    //   }
    
    // } catch (err) {
    //   setError(err.message || 'Invalid credentials. Please try again.')
    // } finally {
    //   setIsLoading(false)
    // }
     try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      if (result?.ok) {
        router.push('/')
      }
    } catch (err) {
      // Type-safe error handling
      if (err instanceof Error) {
        setError(err.message)
      } else if (typeof err === 'string') {
        setError(err)
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 p-6'>
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='bg-red-50 p-3 rounded-lg text-red-600 text-sm'
        >
          {error}
        </motion.div>
      )}

      {/* Email Field */}
      <div>
        <label className='block mb-1 font-medium text-gray-700 text-sm'>
          Email
        </label>
        <div className='relative'>
          <div className='left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none'>
            <FiMail className='text-gray-400' />
          </div>
          <input
            {...register('email')}
            type='email'
            className={`pl-10 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.email
                ? 'border-red-500'
                : 'border-gray-300 hover:border-blue-300'
            }`}
            placeholder='your@email.com'
          />
        </div>
        {errors.email && (
          <p className='mt-1 text-red-600 text-sm'>{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className='block mb-1 font-medium text-gray-700 text-sm'>
          Password
        </label>
        <div className='relative'>
          <div className='left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none'>
            <FiLock className='text-gray-400' />
          </div>
          <input
            {...register('password')}
            type='password'
            className={`pl-10 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.password
                ? 'border-red-500'
                : 'border-gray-300 hover:border-blue-300'
            }`}
            placeholder='••••••••'
          />
        </div>
        {errors.password && (
          <p className='mt-1 text-red-600 text-sm'>{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <input
            id='remember-me'
            name='remember-me'
            type='checkbox'
            className='border-gray-300 rounded focus:ring-blue-500 w-4 h-4 text-blue-600'
          />
          <label
            htmlFor='remember-me'
            className='block ml-2 text-gray-700 text-sm'
          >
            Remember me
          </label>
        </div>
        <Link
          href='/forgot-password'
          className='text-blue-600 hover:text-blue-800 text-sm transition-colors'
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type='submit'
        disabled={isLoading}
        className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all ${
          isLoading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-[var(--primary)] hover:to-indigo-700 shadow-md'
        }`}
      >
        {isLoading ? (
          'Signing In...'
        ) : (
          <>
            Sign In <FiArrowRight className='ml-2' />
          </>
        )}
      </motion.button>

      {/* Sign Up Link */}
      <div className='text-gray-600 text-sm text-center'>
        Don&apos;t have an account?{' '}
        <Link
          href='/register'
          className='font-medium text-blue-600 hover:text-blue-800 transition-colors'
        >
          Create one
        </Link>
      </div>
    </form>
  )
}
