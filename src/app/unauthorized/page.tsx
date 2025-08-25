'use client'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Shield, ArrowLeft, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function UnauthorizedPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const getDashboardRoute = () => {
    if (!session?.user?.role) return '/signin'
    
    switch(session.user.role.toLowerCase()) {
      case 'admin':
        return '/admin'
      case 'student':
        return '/student'
      case 'faculty':
        return '/faculty'
      default:
        return '/my-college'
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <h1 className="mb-2 font-bold text-gray-900 text-2xl">
          Access Denied
        </h1>
        
        <p className="mb-6 text-gray-600">
          You don&apos;t have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        {session?.user && (
          <div className="bg-gray-50 mb-6 p-4 rounded-lg">
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Signed in as:</span> {session.user.email}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Role:</span> {session.user.role}
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <Button 
            onClick={() => router.push(getDashboardRoute())}
            className="w-full"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Go to Dashboard
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full"
          >
            <LogOut className="mr-2 w-4 h-4" />
            Sign Out
          </Button>
        </div>
        
        <Link 
          href="/" 
          className="inline-block mt-4 text-blue-600 hover:text-blue-800 text-sm"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}