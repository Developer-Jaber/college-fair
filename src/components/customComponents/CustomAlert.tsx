'use client'

import { AlertCircleIcon, CheckCircle2Icon, XIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { useEffect } from 'react'

interface CustomAlartProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  duration?: number
  variant: 'success' | 'error' | 'warning'
}

export function CustomAlert ({
  title,
  description,
  isOpen,
  onClose,
  duration = 5000,
  variant = 'success'
}: CustomAlartProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(onClose, duration)

      return () => clearTimeout(timer)
    }
  }, [onClose, isOpen, duration])

  const variantStyles = {
    success: {
      border: 'border-l-4 border-green-500',
      bg: 'bg-green-50',
      title: 'text-green-800',
      description: 'text-green-700',
      icon: <CheckCircle2Icon className='w-5 h-5 text-green-600' />
    },
    error: {
      border: 'border-l-4 border-red-500',
      bg: 'bg-red-50',
      title: 'text-red-800',
      description: 'text-red-700',
      icon: <AlertCircleIcon className='w-5 h-5 text-red-600' />
    },
    warning: {
      border: 'border-l-4 border-yellow-500',
      bg: 'bg-yellow-50',
      title: 'text-yellow-800',
      description: 'text-yellow-700',
      icon: <AlertCircleIcon className='w-5 h-5 text-yellow-600' />
    }
  }

  if (!isOpen) return null

  return (
    <div className='top-4 right-4 slide-in-from-right-5 z-50 fixed animate-in'>
      <Alert
        className={`${variantStyles[variant].bg} ${variantStyles[variant].border} shadow-lg`}
      >
        {variantStyles[variant].icon}

        <AlertTitle className={variantStyles[variant].title}>
          {title}
        </AlertTitle>
        <AlertDescription className={variantStyles[variant].description}>
          {description}
        </AlertDescription>

        <button
          title='Close'
          onClick={onClose}
          className='text-gray-400 hover:text-gray-600 transition-colors'
        >
          <XIcon className='w-4 h-4' />
        </button>
      </Alert>
    </div>
  )
}
