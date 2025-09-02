// app/contact/page.tsx
'use client'

import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheckCircle } from 'react-icons/fi'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import PrimaryButton from '@/components/customComponents/PrimaryButton'

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional()
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Form submitted:', data)
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 px-4 sm:px-6 lg:px-8 py-42 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 font-bold text-gray-900 text-4xl">Get in Touch</h1>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            Have questions or want to work together? We&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="gap-12 grid grid-cols-1 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white shadow-lg hover:shadow-xl p-8 rounded-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <FiMail className="text-[var(--accent)] text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Email Us</h3>
                  <p className="text-gray-600">hello@example.com</p>
                  <p className="text-gray-600">support@example.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg hover:shadow-xl p-8 rounded-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <FiMapPin className="text-[var(--accent)] text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Visit Us</h3>
                  <p className="text-gray-600">123 Tech Street</p>
                  <p className="text-gray-600">San Francisco, CA 94107</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg hover:shadow-xl p-8 rounded-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <FiPhone className="text-[var(--accent)] text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">Mon-Fri: 9am-5pm</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-lg p-8 rounded-xl"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="flex justify-center mb-6">
                  <FiCheckCircle className="text-green-500 text-6xl" />
                </div>
                <h2 className="mb-2 font-bold text-gray-900 text-2xl">Message Sent!</h2>
                <p className="mb-6 text-gray-600">
                  Thank you for reaching out. We&apos;ll get back to you soon.
                </p>
                <PrimaryButton
                  variant='primary'
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 rounded-lg transition-colors"
                >
                  Send Another Message
                </PrimaryButton>
              </motion.div>
            ) : (
              <>
                <h2 className="mb-6 font-bold text-gray-900 text-2xl">Send us a message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium text-gray-700 text-sm">
                      Full Name
                    </label>
                    <input
                      id="name"
                      {...register('name')}
                      type="text"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-red-600 text-sm">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium text-gray-700 text-sm">
                      Email Address
                    </label>
                    <input
                      id="email"
                      {...register('email')}
                      type="email"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mb-1 font-medium text-gray-700 text-sm">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      {...register('phone')}
                      type="tel"
                      className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-[var(--primary)] focus:ring-2 w-full"
                      placeholder="+1 (___) ___-____"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-1 font-medium text-gray-700 text-sm">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="How can we help you?"
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-red-600 text-sm">{errors.message.message}</p>
                    )}
                  </div>

                  <div>
                    <PrimaryButton
                      variant='secondary'
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white ${
                        isSubmitting
                          ? 'bg-[var(--primary)] cursor-not-allowed'
                          : 'shadow-md'
                      }`}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message <FiSend className="ml-2" />
                        </>
                      )}
                    </PrimaryButton>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}