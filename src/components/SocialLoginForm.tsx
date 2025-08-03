'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'

type Provider = 'google'

export default function SocialLoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<Provider | null>(null)

  const handleSocialLogin = async (provider: Provider) => {
    try {
      setIsLoading(provider)
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
      setIsLoading(null)
    }
  }

  return (
    <div className="px-6 pb-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="border-gray-300 border-t w-full" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="gap-3 grid grid-cols-1 mt-6">
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading === 'google'}
          className={`inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl w-full font-medium text-sm ${
            isLoading === 'google'
              ? 'bg-gray-100 cursor-not-allowed'
              : 'bg-white hover:bg-gray-50 shadow-sm'
          }`}
        >
          <FaGoogle className="mr-4" />
          {isLoading === 'google' ? 'Processing...' : 'Google'}
        </button>
      </div>
    </div>
  )
}