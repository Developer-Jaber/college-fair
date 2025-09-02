"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiAlertTriangle, FiHome, FiCompass } from 'react-icons/fi'
import PrimaryButton from '@/components/customComponents/PrimaryButton'

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-green-100 p-6 min-h-screen text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Animated 404 text */}
        <div className="relative mb-8">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -10, 0]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2
            }}
            className="left-1/3 drop-shadow-md font-bold text-[var(--secondary)] text-9xl"
          >
            4
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5,
              delay: 0.5
            }}
            className="top-0 left-2/3 absolute drop-shadow-md font-bold text-[var(--primary)] text-9xl"
          >
            0
          </motion.div>
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2.5
            }}
            className="top-0 left-4/5 absolute drop-shadow-md font-bold text-[var(--secondary)] text-9xl"
          >
            4
          </motion.div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex justify-center mb-4">
            <FiAlertTriangle className="text-yellow-500 text-4xl" />
          </div>
          <h1 className="mb-2 font-bold text-gray-800 text-3xl">Oops! Lost in Space</h1>
          <p className="text-gray-600">
            The page you&apos;re looking for has drifted off into the cosmic void.
            Maybe it&apos;s exploring new galaxies?
          </p>
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex sm:flex-row flex-col justify-center gap-4"
        >
          <Link
            href="/"
          >
            <PrimaryButton
            className="flex justify-center items-center gap-2 shadow-md px-6 py-3 rounded-lg transition-all"
            >
              <FiHome /> Back to Home
            </PrimaryButton>
          </Link>
          <Link
            href="/explore"
          >
            <PrimaryButton
            variant='secondary'
            className="flex justify-center items-center gap-2 shadow-sm px-6 py-3 transition-all"
            >
              <FiCompass /> Explore Content
            </PrimaryButton>
          </Link>
        </motion.div>

        {/* Fun astronaut animation */}
        <motion.div
          animate={{
            x: [-50, 50, -50],
            y: [0, -20, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
          className="opacity-70 mt-12"
        >
          <div className="text-4xl">🚀</div>
        </motion.div>
      </motion.div>
    </div>
  )
}