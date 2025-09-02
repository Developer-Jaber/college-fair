"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'
import { useState } from 'react'
import { registerUser } from '@/app/actions/auth/registerUser'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import { CustomAlert } from '@/components/customComponents/CustomAlert'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
})

export default function RegisterForm () {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const [alertState, setAlertState] = useState<{
    show: boolean
    variant: 'success' | 'error'
    title: string
    description: string
  }>({
    show: false,
    variant: 'success',
    title: '',
    description: ''
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setIsLoading(true)
    setError('')

    try {
      const result = registerUser(data)

      if (!(await result).success) {
        throw new Error((await result).error || 'Registration failed')
      }

      const signInResult = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/'
      })

      if (signInResult?.error) {
        throw new Error(signInResult.error)
      }

      if (signInResult?.ok) {
        // Authentication successful
        setAlertState({
          show: true,
          variant: 'success',
          title: 'Success!',
          description: 'You have been Registered in successfully.'
        })

        // Redirect after a brief delay to show the alert
        setTimeout(() => {
          router.push(signInResult.url || '/')
        }, 1500)
      } else {
        // This shouldn't happen, but just in case
        throw new Error('Authentication failed. Please try again.')
      }
    } catch (err) {
      let errorMessage = 'Invalid credentials. Please try again.'

      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'string') {
        errorMessage = err
      }

      setError(errorMessage)
      setAlertState({
        show: true,
        variant: 'error',
        title: 'Already registered this email',
        description: errorMessage
      })
    } finally {
      setIsLoading(false)
    }
  }

  const closeAlert = () => {
    setAlertState(prev => ({ ...prev, show: false }))
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 p-6'>
      {error && (
        <div className='bg-red-50 p-3 rounded-lg text-red-600 text-sm'>
          {error}
        </div>
      )}

      <div>
        <label className='block mb-1 font-medium text-gray-700 text-sm'>
          Full Name
        </label>
        <div className='relative'>
          <div className='left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none'>
            <FiUser className='text-gray-400' />
          </div>
          <input
            {...register('name')}
            type='text'
            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='Enter Your Name'
          />
        </div>
        {errors.name && (
          <p className='mt-1 text-red-600 text-sm'>{errors.name.message}</p>
        )}
      </div>

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
            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='your@email.com'
          />
        </div>
        {errors.email && (
          <p className='mt-1 text-red-600 text-sm'>{errors.email.message}</p>
        )}
      </div>

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
            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='••••••••'
          />
        </div>
        {errors.password && (
          <p className='mt-1 text-red-600 text-sm'>{errors.password.message}</p>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type='submit'
        disabled={isLoading}
        className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all ${
          isLoading
            ? 'bg-[var(--accent)] cursor-not-allowed'
            : 'bg-[var(--primary)] hover:to-indigo-700 shadow-md'
        }`}
      >
        {isLoading ? (
          'Registering...'
        ) : (
          <>
            Register <FiArrowRight className='ml-2' />
          </>
        )}
      </motion.button>

      <div className='text-gray-600 text-sm text-center'>
        Already have an account?{' '}
        <Link
          href='/signin'
          className='font-medium hover:text-blue-800 text-[var(--accent-color)]'
        >
          Sign in
        </Link>
      </div>
    </form>

     {/* alert */}
      <CustomAlert
        isOpen={alertState.show}
        onClose={closeAlert}
        title={alertState.title}
        description={alertState.description}
        variant={alertState.variant}
      />
    </>
  )
}
