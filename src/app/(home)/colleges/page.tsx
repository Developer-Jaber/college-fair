'use client'
import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiStar,
  FiCalendar,
  FiBook,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiAlertCircle
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
import { Select } from '@/components/customComponents/Select'

// Skeleton Components
const SearchBarSkeleton = () => (
  <div className='flex md:flex-row flex-col gap-4 bg-white shadow-sm mb-8 p-4 rounded-xl animate-pulse'>
    <div className='relative flex-grow'>
      <div className='bg-gray-200 rounded-lg h-10'></div>
    </div>
    <div className='flex gap-2'>
      <div className='bg-gray-200 rounded-lg w-24 h-10'></div>
    </div>
  </div>
)

const CollegeCardSkeleton = () => (
  <div className='bg-white shadow-md rounded-xl overflow-hidden animate-pulse'>
    {/* Image Skeleton */}
    <div className='bg-gray-200 h-48'></div>
    
    {/* Content Skeleton */}
    <div className='p-5'>
      {/* Title Skeleton */}
      <div className='bg-gray-200 mb-3 rounded h-6'></div>
      
      {/* Rating Skeleton */}
      <div className='flex items-center mb-3'>
        <div className='flex gap-1 mr-2'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='bg-gray-200 rounded w-4 h-4'></div>
          ))}
        </div>
        <div className='bg-gray-200 rounded w-16 h-4'></div>
      </div>
      
      {/* Quick Facts Skeleton */}
      <div className='space-y-2 mb-4'>
        <div className='flex items-center'>
          <div className='bg-gray-200 mr-2 rounded w-4 h-4'></div>
          <div className='bg-gray-200 rounded w-32 h-4'></div>
        </div>
        <div className='flex items-center'>
          <div className='bg-gray-200 mr-2 rounded w-4 h-4'></div>
          <div className='bg-gray-200 rounded w-24 h-4'></div>
        </div>
      </div>
      
      {/* Button Skeleton */}
      <div className='bg-gray-200 rounded w-full h-10'></div>
    </div>
  </div>
)

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className='flex flex-col justify-center items-center col-span-full py-16'
  >
    <div className='flex justify-center items-center bg-gray-100 mb-4 rounded-full w-24 h-24'>
      <FiBook className='w-12 h-12 text-gray-400' />
    </div>
    <h3 className='mb-2 font-semibold text-gray-900 text-xl'>No colleges found</h3>
    <p className='max-w-md text-gray-500 text-center'>
      We couldn&apos;t find any colleges matching your search criteria. Try adjusting your filters or search terms.
    </p>
  </motion.div>
)

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className='flex flex-col justify-center items-center col-span-full py-16'
  >
    <div className='flex justify-center items-center bg-red-50 mb-4 rounded-full w-24 h-24'>
      <FiAlertCircle className='w-12 h-12 text-red-400' />
    </div>
    <h3 className='mb-2 font-semibold text-gray-900 text-xl'>Something went wrong</h3>
    <p className='mb-6 max-w-md text-gray-500 text-center'>
      We&apos;re having trouble loading the colleges. Please check your connection and try again.
    </p>
    <PrimaryButton onClick={onRetry}>
      Try Again
    </PrimaryButton>
  </motion.div>
)


export default function CollegeListing () {
  const [showFilters, setShowFilters] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const dispatch = useDispatch<AppDispatch>()
  const { status } = useSession()
  const router = useRouter()

  const { colleges, searchQuery, sortBy, selectedCollege, isLoading, error } = useSelector(
    (state: RootState) => state.colleges
  )

   const fetchColleges = useCallback(async () => {
    try {
      dispatch(fetchCollegesStart())
      
      // Add artificial delay for better UX demonstration (remove in production)
      if (isInitialLoad) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      const response = await fetch('/api/colleges')
      if (!response.ok) throw new Error('Failed to fetch colleges')
      const data = await response.json()
      dispatch(fetchCollegesSuccess(data))
      setIsInitialLoad(false)
    } catch (err) {
      dispatch(
        fetchCollegesFailure(
          err instanceof Error ? err.message : 'Unknown error occurred'
        )
      )
    }
  }, [dispatch, isInitialLoad])

  useEffect(() => {
    fetchColleges()
  }, [fetchColleges])

  const filteredColleges = colleges
    .filter(colleges =>
      colleges.name.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    ) //<-- close filter here
    .sort((a, b) =>
      sortBy === 'rating' ? b.rating - a.rating : b.research - a.research
    )

  const options = [
    { value: 'rating', label: 'Highest Rating', icon: <FiStar /> },
    { value: 'research', label: 'Most Rating', icon: <FiBook /> }
  ]

   // Show skeleton on initial load
  if (isInitialLoad && isLoading) {
    return (
      <div className='bg-[var(--bg-color)] px-4 sm:px-6 lg:px-8 py-32 min-h-screen'>
        <div className='mx-auto max-w-7xl'>
          {/* Header - Show actual content */}
          <SectionTitle
            title='Explore Top Colleges'
            subtitle='Find your perfect academic match with detailed insights'
          />

          {/* Search Bar Skeleton */}
          <SearchBarSkeleton />

          {/* Cards Grid Skeleton */}
          <div className='gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-2xl:grid-cols-4'>
            {[...Array(12)].map((_, index) => (
              <CollegeCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    )
  }

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
           initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className='relative flex-grow'>
            <FiSearch className='top-1/2 left-3 absolute text-gray-400 -translate-y-1/2 transform' />
            <input
              type='text'
              placeholder='Search colleges...'
              className='py-2 pr-4 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full'
              value={searchQuery}
              onChange={e => dispatch(setSearchQuery(e.target.value))}
              disabled={isLoading}
            />
          </div>

          <div className='flex gap-2'>
            <PrimaryButton
              variant='secondary'
              className='flex items-center gap-2 px-4 py-2'
              onClick={() => setShowFilters(!showFilters)}
              disabled={isLoading}
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
              className='bg-white shadow-sm mb-8 p-2 rounded-xl'
            >
              <div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
                <Select
                  options={options}
                  value={sortBy}
                  onChange={value =>
                    dispatch(setSortBy(value as 'rating' | 'research'))
                  }
                  placeholder='Select an option'
                  disabled={isLoading}
                />
                {/* Add more filters as needed */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

         {/* Content Area */}
        <div className='gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-2xl:grid-cols-4'>
          {/* Error State */}
          {error && (
            <ErrorState onRetry={fetchColleges} />
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredColleges.length === 0 && (
            <EmptyState />
          )}

          {/* Loading State for Subsequent Loads */}
          {isLoading && !isInitialLoad && (
            <>
              {[...Array(8)].map((_, index) => (
                <CollegeCardSkeleton key={`loading-${index}`} />
              ))}
            </>
          )}

        {/* Colleges Grid */}
          {!isLoading && !error && filteredColleges.map((college, index) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => dispatch(setSelectedCollege(college))}
              className='group bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300 cursor-pointer'
            >
              {/* College Image */}
              <div className='relative h-48 overflow-hidden'>
                <Image
                  src={college.image}
                  alt={college.name}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                  width={500}
                  height={200}
                />
              </div>

              {/* College Info */}
              <div className='p-5'>
                <h2 className='mb-1 font-bold text-gray-900 group-hover:text-primary text-xl transition-colors'>
                  {college.name}
                </h2>

                {/* Rating */}
                <div className='flex items-center mb-3 text-card'>
                  <div className='flex mr-2'>
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 transition-colors ${
                          i < Math.floor(college.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className='text-gray-600'>
                    {college.rating} ({college.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Quick Facts */}
                <div className='space-y-2 mb-4'>
                  <div className='flex items-center font-medium text-gray-600 text-sm'>
                    <FiCalendar className='mr-2 text-primary' />
                    {college.admission}
                  </div>
                  <div className='flex items-center font-medium text-gray-600 text-sm'>
                    <FiBook className='mr-2 text-primary' />
                    {college.research.toLocaleString()} research papers
                  </div>
                </div>

                {/* Details Button */}
                <PrimaryButton 
                  className='py-2 rounded-sm w-full font-medium group-hover:scale-105 transition-transform'
                  onClick={e => {
                    e.stopPropagation()
                    if (status === 'unauthenticated') {
                      router.push('/register')
                    } else {
                      dispatch(setSelectedCollege(college))
                    }
                  }}
                >
                  View Details
                </PrimaryButton>
              </div>
            </motion.div>
          ))}
        </div>

        {/* College Details Modal */}
        <CollegeDetailsModal
          onClose={() => dispatch(setSelectedCollege(null))}
          selectedCollege={selectedCollege}
        />
      </div>
    </div>
  )
}
