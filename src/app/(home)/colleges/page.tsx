'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiStar,
  FiCalendar,
  FiBook,
  FiFilter,
  FiSearch,
  FiChevronDown
} from 'react-icons/fi'
import Image from 'next/image'
import CollegeDetailsModal from '@/components/CollegeDetailsModal'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import {
  fetchCollegesFailure,
  fetchCollegesStart,
  fetchCollegesSuccess,
  setSearchQuery,
  setSelectedCollege,
  setSortBy
} from '../../features/colleges/collegesSlice'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import SectionTitle from '@/components/SectionTitle'
import PrimaryButton from '@/components/customComponents/PrimaryButton'


export default function CollegeListing () {
  const [showFilters, setShowFilters] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { status } = useSession()
  const router = useRouter()

  const { colleges, searchQuery, sortBy, selectedCollege } = useSelector(
    (state: RootState) => state.colleges
  )

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        dispatch(fetchCollegesStart())
        const response = await fetch('/api/colleges')
        if (!response.ok) throw new Error('Faild to fetch colleges')
        const data = await response.json()
        dispatch(fetchCollegesSuccess(data))
      } catch (err) {
        dispatch(
          fetchCollegesFailure(
            err instanceof Error ? err.message : 'Unknown error occurred'
          )
        )
      }
    }
    fetchColleges()
  }, [dispatch])

  const filteredColleges = colleges
    .filter(colleges =>
      colleges.name.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    )//<-- close filter here
    .sort((a, b)=>
      sortBy === 'rating' ? b.rating - a.rating : b.research - a.research
    )

  return (
    <div className='bg-[var(--bg-color)] px-4 sm:px-6 lg:px-8 py-32 min-h-screen'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <SectionTitle
          title='Explore Top Colleges'
          subtitle='Find your perfect academic match with detailed insights'
        ></SectionTitle>

        {/* Search & Filter Bar */}
        <motion.div
          className='flex md:flex-row flex-col gap-4 bg-white shadow-sm mb-8 p-4 rounded-xl'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className='relative flex-grow'>
            <FiSearch className='top-1/2 left-3 absolute text-gray-400 -translate-y-1/2 transform' />
            <input
              type='text'
              placeholder='Search colleges...'
              className='py-2 pr-4 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full'
              value={searchQuery}
              onChange={e => dispatch(setSearchQuery(e.target.value))}
            />
          </div>

          <div className='flex gap-2'>
            <PrimaryButton
              variant='secondary'
              className='flex items-center gap-2 px-4 py-2'
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter />
              <span>Filters</span>
              <FiChevronDown
                className={`transition-transform ${
                  showFilters ? 'rotate-180' : ''
                }`}
              />
            </PrimaryButton>
          </div>
        </motion.div>

        {/* Filter Dropdown */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='bg-white shadow-sm mb-8 p-2 rounded-xl overflow-hidden'
            >
              <div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
                <div>
                  <label
                    htmlFor='sortBy'
                    className='block mb-1 font-medium text-gray-700'
                  >
                    Sort By
                  </label>
                  <select
                    id='sortBy'
                    className='p-2 border rounded-lg w-full'
                    value={sortBy}
                    onChange={e =>
                      dispatch(
                        setSortBy(e.target.value as 'rating' | 'research')
                      )
                    }
                  >
                    <option value='rating'>Highest Rating</option>
                    <option value='research'>Most Research</option>
                  </select>
                </div>
                {/* Add more filters as needed */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Colleges Grid */}
        <div className='gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-2xl:grid-cols-4'>
          {filteredColleges.map(college => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => dispatch(setSelectedCollege(college))}
              className='bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-shadow'
            >
              {/* College Image */}
              <div className='h-48 overflow-hidden'>
                <Image
                  src={college.image}
                  alt={college.name}
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
                  width={500}
                  height={200}
                />
              </div>

              {/* College Info */}
              <div className='p-5'>
                <h2 className='mb-1 font-bold text-gray-900 text-xl'>
                  {college.name}
                </h2>

                {/* Rating */}
                <div className='flex items-center mb-3'>
                  <div className='flex mr-2'>
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(college.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className='text-gray-600 text-sm'>
                    {college.rating} ({college.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Quick Facts */}
                <div className='space-y-2 mb-4'>
                  <div className='flex items-center text-gray-600 text-sm'>
                    <FiCalendar className='mr-2 text-primary' />
                    {college.admission}
                  </div>
                  <div className='flex items-center text-gray-600 text-sm'>
                    <FiBook className='mr-2 text-primary' />
                    {college.research.toLocaleString()} research papers
                  </div>
                </div>

                {/* Details Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={e => {
                    e.stopPropagation()
                    if (status === 'unauthenticated') {
                      router.push('/register')
                    } else {
                      dispatch(setSelectedCollege(college))
                    }
                  }}
                  className='bg-[var(--primary)] py-2 rounded-lg w-full font-medium text-white'
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* College Details Modal */}
        <CollegeDetailsModal
          onClose={() => dispatch(setSelectedCollege(null))}
          selectedCollege={selectedCollege}
        ></CollegeDetailsModal>
      </div>
    </div>
  )
}
