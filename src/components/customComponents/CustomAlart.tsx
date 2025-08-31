import { CheckCircle2Icon, XIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { useEffect } from 'react'


interface CustomAlartProps {
    isOpen: boolean
    onClose: () => void
    title: string
    description: string
    duration?: number
}


export function CustomAlart ({
  title,
  description,
  isOpen,
  onClose,
  duration = 5000
}: CustomAlartProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(onClose, duration)

      return () => clearTimeout(timer)
    }
  }, [onClose, isOpen, duration])

  if (isOpen === false) return null

  return (
    <div className='top-4 right-4 slide-in-from-right-5 z-50 fixed animate-in'>
      <Alert className='bg-white shadow-lg border-green-500 border-l-4'>
        <div className='flex items-start gap-3'>
          <CheckCircle2Icon className='mt-0.5 w-5 h-5 text-green-600' />
          <div className='flex-1'>
            <AlertTitle className='font-semibold text-green-800'>
              {title}
            </AlertTitle>
            <AlertDescription className='text-green-700'>
              {description}
            </AlertDescription>
          </div>
          <button
            title='Close'
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
          >
            <XIcon className='w-4 h-4' />
          </button>
        </div>
      </Alert>
    </div>
  )
}
