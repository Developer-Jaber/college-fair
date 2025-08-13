'use client'
import React from 'react'
import {motion} from 'framer-motion'
import { StepProps } from '@/types'

export default function SectionTitle({title, subtitle}: StepProps) {
  return (
    <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-4xl md:text-5xl">
            <span className="text-gray-800">
              {title}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-200 text-lg">
            {subtitle}
          </p>
        </motion.div>
  )
}
