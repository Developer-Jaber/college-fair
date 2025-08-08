'use client'

import { College } from "@/types"
import AuthGuard from "./AuthGuard"
import { motion, AnimatePresence } from 'framer-motion'
import Image from "next/image"
import { FiAward, FiBook, FiCalendar, FiStar, FiX } from "react-icons/fi"


export interface CollegeDetailsModalProps {
  selectedCollege: College | null
  onClose: () => void
}


export default function CollegeDetailsModal ({ 
  selectedCollege,
  onClose
 }: CollegeDetailsModalProps ) {
  if(!selectedCollege) return null

  return (
    <>
      <AuthGuard>
        <AnimatePresence>
          {selectedCollege && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4'
              onClick={onClose}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={e => e.stopPropagation()}
                className='bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'
              >
                {/* Modal Header */}
                <div className='relative'>
                  <div className='w-full h-48 overflow-hidden'>
                    <Image
                      width={500}
                      height={200}
                      src={selectedCollege.image}
                      alt={selectedCollege.name}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <button
                    type='button'
                    aria-label='Close'
                    onClick={onClose}
                    className='top-4 right-4 absolute bg-white/80 hover:bg-white shadow-md p-2 rounded-full'
                  >
                    <FiX />
                  </button>
                </div>

                {/* Modal Content */}
                <div className='p-6'>
                  <h2 className='mb-2 font-bold text-gray-900 text-2xl'>
                    {selectedCollege.name}
                  </h2>

                  {/* Rating */}
                  <div className='flex items-center mb-4'>
                    <div className='flex mr-2'>
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(selectedCollege.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className='text-gray-600'>
                      {selectedCollege.rating} (
                      {selectedCollege.reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className='gap-6 grid grid-cols-1 md:grid-cols-2 mb-6'>
                    <div>
                      <h3 className='flex items-center mb-3 font-semibold text-lg'>
                        <FiCalendar className='mr-2 text-primary' />
                        Admission Info
                      </h3>
                      <p className='text-gray-700'>
                        {selectedCollege.admission}
                      </p>
                    </div>

                    <div>
                      <h3 className='flex items-center mb-3 font-semibold text-lg'>
                        <FiBook className='mr-2 text-primary' />
                        Research Output
                      </h3>
                      <p className='text-gray-700'>
                        {selectedCollege.research.toLocaleString()} published
                        papers
                      </p>
                    </div>
                  </div>

                  {/* Events */}
                  <div className='mb-6'>
                    <h3 className='flex items-center mb-3 font-semibold text-lg'>
                      <FiAward className='mr-2 text-primary' />
                      Upcoming Events
                    </h3>
                    <ul className='space-y-2'>
                      {selectedCollege.events.map((event, i) => (
                        <li key={i} className='flex items-start'>
                          <span className='bg-primary mt-2 mr-2 rounded-full w-2 h-2'></span>
                          <span className='text-gray-700'>{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sports */}
                  <div>
                    <h3 className='flex items-center mb-3 font-semibold text-lg'>
                      <FiAward className='mr-2 text-primary' />
                      Sports Facilities
                    </h3>
                    <ul className='space-y-2'>
                      {selectedCollege.sports.map((sport, i) => (
                        <li key={i} className='flex items-start'>
                          <span className='bg-primary mt-2 mr-2 rounded-full w-2 h-2'></span>
                          <span className='text-gray-700'>{sport}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AuthGuard>
    </>
  )
}
