'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCheck, FiChevronDown } from 'react-icons/fi'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  selectClassName?: string
  optionClassName?: string
  icon?: React.ReactNode
  variant?: 'default' | 'outline' | 'filled'
  size?: 'sm' | 'md' | 'lg'
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  selectClassName = '',
  optionClassName = '',
  icon,
  variant = 'default',
  size = 'md'
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const selectRef = React.useRef<HTMLDivElement>(null)

  const selectedOption = options.find(opt => opt.value === value)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const variantStyles = {
    default: 'bg-white border-gray-300 hover:border-gray-400',
    outline: 'bg-transparent border-2 border-gray-200 hover:border-gray-300',
    filled: 'bg-gray-100 border-transparent hover:bg-gray-200'
  }

  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-4 text-lg'
  }

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <motion.button
        type='button'
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between rounded-lg border transition-all duration-200
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${selectClassName}
        `}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        <span
          className={`truncate ${
            !selectedOption ? 'text-gray-400' : 'text-gray-900'
          }`}
        >
          {selectedOption?.label || placeholder}
        </span>

        <div className='flex items-center space-x-2'>
          {icon}
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronDown className='text-gray-400' />
          </motion.span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='z-50 absolute mt-1 w-full'
          >
            <div className='py-1 max-h-60 overflow-auto'>
              {options.map(option => (
                <motion.button
                  key={option.value}
                  type='button'
                  disabled={option.disabled}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={`
                    w-full flex items-center bg-white hover:bg-[var(--primary)] justify-between px-4 py-2 text-left transition-colors duration-150
                    ${
                      option.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-400'
                    }
                    ${
                      value === option.value
                        ? 'hover:bg-[var(--primary)] text-[var(--text)]'
                        : 'text-gray-900'
                    }
                    ${optionClassName}
                  `}
                  whileHover={{
                    backgroundColor: option.disabled ? '' : '#f3f4f6'
                  }}
                >
                  <span>{option.label}</span>
                  {value === option.value && (
                    <FiCheck className='text-blue-600' />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
