"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiFilter, FiChevronDown, FiCheckCircle } from 'react-icons/fi';
import Image from 'next/image';
import alexchan from './../../public/avatar/Alex Chen.png';
import jamalwilliams from './../../public/avatar/Jamal Williams.png';
import sophia from './../../public/avatar/Sophia Rodriguez.png';
import ethan from './../../public/avatar/Ethan Park.png';
import olivia from './../../public/avatar/Olivia Smith.png';


const CollegeReviews = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedReview, setExpandedReview] = useState<number | null>(null);

  const colleges = [
    { id: 'stanford', name: 'Stanford University' },
    { id: 'mit', name: 'MIT' },
    { id: 'harvard', name: 'Harvard University' },
    { id: 'berkeley', name: 'UC Berkeley' }
  ];

  const reviews = [
    {
      id: 1,
      college: 'stanford',
      rating: 4.8,
      program: 'Computer Science',
      date: '2023-06-15',
      author: 'Alex Chen',
      avatar: `${alexchan.src}`,
      verified: true,
      title: 'Exceptional CS Program',
      content: 'The faculty goes above and beyond to support research initiatives. I published 2 papers during my undergrad thanks to their mentorship. The only downside is the competitive atmosphere.',
      likes: 42
    },
    {
      id: 2,
      college: 'mit',
      rating: 4.9,
      program: 'Mechanical Engineering',
      date: '2023-05-22',
      author: 'Jamal Williams',
      avatar: `${jamalwilliams.src}`,
      verified: true,
      title: 'Cutting-Edge Research Facilities',
      content: 'The robotics labs are world-class. Got to work with industrial-grade equipment from day one. Career services helped me land internships at Boston Dynamics and Tesla.',
      likes: 37
    },
    {
      id: 3,
      college: 'harvard',
      rating: 4.6,
      program: 'Economics',
      date: '2023-04-10',
      author: 'Sophia Rodriguez',
      avatar: `${sophia.src}`,
      verified: false,
      title: 'Brilliant but Intense',
      content: 'The curriculum pushes you to think critically. Expect 80-hour weeks during midterms. Alumni network is incredible though - got my McKinsey interview through a professor referral.',
      likes: 29
    },
    {
      id: 4,
      college: 'berkeley',
      rating: 4.5,
      program: 'Environmental Science',
      date: '2023-07-03',
      author: 'Ethan Park',
      avatar: `${ethan.src}`,
      verified: true,
      title: 'Hands-On Fieldwork',
      content: 'Weekly trips to Muir Woods and Point Reyes for data collection. Professors are passionate about sustainability. Housing is expensive but the education is worth it.',
      likes: 18
    },
    {
      id: 5,
      college: 'stanford',
      rating: 4.7,
      program: 'Business',
      date: '2023-03-28',
      author: 'Olivia Smith',
      avatar: `${olivia.src}`,
      verified: true,
      title: 'Entrepreneurial Ecosystem',
      content: 'The startup culture here is unreal. My dorm mates and I launched an app that got accepted into Y Combinator during sophomore year. Resources for founders are amazing.',
      likes: 56
    }
  ];

  const filteredReviews = activeFilter === 'all' 
    ? reviews 
    : reviews.filter(review => review.college === activeFilter);

  // Calculate rating breakdown
  const ratingData = {
    5: 78,
    4: 15,
    3: 5,
    2: 1,
    1: 1
  };

  return (
    <section className="bg-gradient-to-br from-[#f0fce6] to-[#4325ba]/5 py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-bold text-gray-900 text-4xl md:text-5xl">
            <span className="bg-clip-text bg-gradient-to-r from-primary to-secondary text-[vr(--text)]">
              Student Experiences
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600 text-xl">
            Honest reviews from current students and alumni
          </p>
        </motion.div>

        <div className="flex lg:flex-row flex-col gap-8">
          {/* Filters & Rating Summary */}
          <div className="lg:w-1/4">
            {/* College Filter */}
            <div className="bg-white shadow-sm mb-6 p-6 rounded-xl">
              <h3 className="flex items-center mb-4 font-semibold text-gray-900 text-lg">
                <FiFilter className="mr-2 text-primary" />
                Filter by College
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`flex items-center justify-between w-full px-4 py-2 rounded-lg text-left ${activeFilter === 'all' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'}`}
                >
                  <span>All Colleges</span>
                  {activeFilter === 'all' && <FiCheckCircle className="text-primary" />}
                </button>
                {colleges.map(college => (
                  <button
                    key={college.id}
                    onClick={() => setActiveFilter(college.id)}
                    className={`flex items-center justify-between w-full px-4 py-2 rounded-lg text-left ${activeFilter === college.id ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'}`}
                  >
                    <span>{college.name}</span>
                    {activeFilter === college.id && <FiCheckCircle className="text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="bg-white shadow-sm p-6 rounded-xl">
              <h3 className="mb-4 font-semibold text-gray-900 text-lg">Overall Ratings</h3>
              <div className="flex items-center mb-4">
                <div className="mr-3 font-bold text-4xl">4.7</div>
                <div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <FiStar 
                        key={star}
                        className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="text-gray-500 text-sm">Based on 128 reviews</div>
                </div>
              </div>
              <div className="space-y-2">
                {([5, 4, 3, 2, 1] as (1 | 2 | 3 | 4 | 5)[]).map((rating) => (
                  <div key={rating} className="flex items-center">
                    <span className="w-8 text-gray-600 text-sm">{rating} star</span>
                    <div className="flex-1 bg-gray-200 mx-2 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${ratingData[rating]}%` }}
                        transition={{ duration: 1 }}
                        className="bg-primary h-full"
                      />
                    </div>
                    <span className="w-8 text-gray-500 text-sm">{ratingData[rating]}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="lg:w-3/4">
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <AnimatePresence>
                {filteredReviews.map(review => (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-white/20 ${expandedReview === review.id ? 'col-span-2' : ''}`}
                  >
                    <div className="p-6">
                      {/* Review Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className="bg-gray-200 mr-3 rounded-full w-10 h-10 overflow-hidden">
                            <Image src={review.avatar} alt={review.author} width={100} height={100} className="object-cover" />
                          </div>
                          <div>
                            <div className="font-medium">{review.author}</div>
                            <div className="flex items-center text-gray-500 text-sm">
                              {review.verified && (
                                <FiCheckCircle className="mr-1 text-primary" size={14} />
                              )}
                              {review.program} · {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full font-medium text-sm">
                          <FiStar className="fill-yellow-500 mr-1 text-yellow-500" />
                          {review.rating}
                        </div>
                      </div>

                      {/* Review Content */}
                      <div>
                        <h3 className="mb-2 font-semibold text-lg">{review.title}</h3>
                        <p className={`text-gray-600 ${expandedReview !== review.id ? 'line-clamp-3' : ''}`}>
                          {review.content}
                        </p>
                        {expandedReview !== review.id && (
                          <button
                            onClick={() => setExpandedReview(review.id)}
                            className="flex items-center mt-2 font-medium text-primary text-sm"
                          >
                            Read more <FiChevronDown className="ml-1" />
                          </button>
                        )}
                      </div>

                      {/* Review Footer */}
                      <div className="flex justify-between items-center mt-4 pt-4 border-gray-100 border-t">
                        <button className="flex items-center text-gray-500 hover:text-primary text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          Helpful ({review.likes})
                        </button>
                        <div className="text-gray-400 text-xs">
                          {review.college}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[var(--accent)] shadow-lg px-6 py-3 rounded-lg font-medium text-white"
              >
                Share Your Experience
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeReviews;