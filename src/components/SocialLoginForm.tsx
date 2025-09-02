'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Provider = 'google'

export default function SocialLoginForm () {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSocialLogin = async (provider: Provider) => {
    try {
      setIsLoading(true)
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: '/'
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      if (result?.ok) {
        alert(`Logged in with ${provider} successfully!`)
        router.push('/')
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : `Failed to login with ${provider}`
      )
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='px-6 pb-6'>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='border-gray-300 border-t w-full' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='bg-white px-2 text-gray-500'>Or continue with</span>
        </div>
      </div>

      <div className='gap-3 grid grid-cols-1 mt-6'>
        <button
          type='button'
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading === true}
          className={`inline-flex items-center justify-center gap-5 px-4 py-2 border border-gray-300 rounded-xl w-full text-lg ${
            isLoading === true
              ? 'bg-gray-100 cursor-not-allowed'
              : 'bg-white hover:bg-gray-50 shadow-sm'
          }`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='30'
            height='30'
            viewBox='0 0 48 48'
          >
            <path
              fill='#fbc02d'
              d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
            ></path>
            <path
              fill='#e53935'
              d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
            ></path>
            <path
              fill='#4caf50'
              d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
            ></path>
            <path
              fill='#1565c0'
              d='M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
            ></path>
          </svg>
          {isLoading === true ? 'Processing...' : 'Google'}
        </button>
      </div>
    </div>
  )
}
