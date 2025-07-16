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

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export default function RegisterForm () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setIsSubmitting(true)
    setError('')

    try {
      await registerUser(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else if (typeof err === 'string') {
        setError(err)
      } else {
        setError('Registration failed. Please try again.')
      }
    } finally {
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
      setIsSubmitting(false)
      router.push('/')
    }
  }
  return (
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
            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='••••••••'
          />
        </div>
        {errors.password && (
          <p className='mt-1 text-red-600 text-sm'>{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className='block mb-1 font-medium text-gray-700 text-sm'>
          Confirm Password
        </label>
        <div className='relative'>
          <div className='left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none'>
            <FiLock className='text-gray-400' />
          </div>
          <input
            {...register('confirmPassword')}
            type='password'
            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='••••••••'
          />
        </div>
        {errors.confirmPassword && (
          <p className='mt-1 text-red-600 text-sm'>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white ${
          isSubmitting
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-[var(--primary)] hover:to-indigo-700 shadow-md'
        }`}
      >
        {isSubmitting ? 'Creating Account...' : 'Register'}
        {!isSubmitting && <FiArrowRight className='ml-2' />}
      </button>

      <div className='text-gray-600 text-sm text-center'>
        Already have an account?{' '}
        <Link
          href='/signin'
          className='font-medium text-blue-600 hover:text-blue-800'
        >
          Sign in
        </Link>
      </div>
    </form>
  )
}
