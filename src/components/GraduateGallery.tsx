"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiAward, FiUsers, FiBook } from 'react-icons/fi';
import engineering1 from './../../public/Graduationpicture/engineering1.png';
import engineering2 from './../../public/Graduationpicture/engineering2.png';
import medicine1 from './../../public/Graduationpicture/medicine1.png';
import medicine2 from './../../public/Graduationpicture/medicine2.png';
import business1 from './../../public/Graduationpicture/business1.png';
import arts1 from './../../public/Graduationpicture/arts1.png';
import SectionTitle from './SectionTitle';

const GraduateGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All Graduates', icon: <FiUsers /> },
    { id: 'engineering', label: 'Engineering', icon: <FiAward /> },
    { id: 'medicine', label: 'Medicine', icon: <FiBook /> },
    { id: 'business', label: 'Business', icon: <FiFilter /> },
    { id: 'arts', label: 'Arts', icon: <FiBook /> }
  ];

  const graduates = [
    {
      id: 1,
      category: 'engineering',
      image: `${engineering1.src}`,
      year: '2023',
      program: 'Computer Science',
      quote: "Our startup just raised $2M in seed funding!",
      alumni: 120
    },
    {
      id: 2,
      category: 'medicine',
      image: `${medicine1.src}`,
      year: '2022',
      program: 'Neuroscience',
      quote: "Now researching at Johns Hopkins Hospital",
      alumni: 85
    },
    {
      id: 3,
      category: 'business',
      image: `${business1.src}`,
      year: '2024',
      program: 'MBA',
      quote: "Launched sustainable fashion brand",
      alumni: 200
    },
    {
      id: 4,
      category: 'arts',
      image: `${arts1.src}`,
      year: '2021',
      program: 'Fine Arts',
      quote: "Solo exhibition at MoMA next month",
      alumni: 65
    },
    {
      id: 5,
      category: 'engineering',
      image: `${engineering2.src}`,
      year: '2020',
      program: 'Mechanical Engineering',
      quote: "Designed eco-friendly urban infrastructure",
      alumni: 150
    },
    {
      id: 6,
      category: 'medicine',
      image: `${medicine2.src}`,
      year: '2023',
      program: 'Public Health',
      quote: "Developing community health programs",
      alumni: 90
    }
  ];

  const filteredGraduates = activeFilter === 'all' 
    ? graduates 
    : graduates.filter(grad => grad.category === activeFilter);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <SectionTitle title="Our Legacy of Graduates" subtitle="Celebrating the achievements of our alumni community"></SectionTitle>

        {/* Filter Tabs */}
        <motion.div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-[var(--accent)] text-white shadow-lg'
                  : 'bg-[var(--primary)] text-[var(--text)] hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{filter.icon}</span>
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredGraduates.map((grad) => (
              <motion.div
                key={grad.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative shadow-lg rounded-xl h-80 overflow-hidden"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-500"
                  // style={{ backgroundImage: `url(${grad.image})` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Info Card (Slides up on hover) */}
                <motion.div
                  initial={{ y: 100 }}
                  whileHover={{ y: 0 }}
                  className="right-0 bottom-0 left-0 absolute p-6 text-white"
                >
                  <div className="transition-transform translate-y-10 group-hover:translate-y-0 duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold text-primary text-sm">
                          Class of {grad.year}
                        </span>
                        <h3 className="mt-1 font-bold text-xl">{grad.program}</h3>
                      </div>
                      <span className="bg-primary/20 px-2 py-1 rounded-full text-xs">
                        {grad.alumni}+ alumni
                      </span>
                    </div>
                    <p className="opacity-0 group-hover:opacity-100 text-sm transition-opacity duration-200 delay-100">
                      {grad.quote}
                    </p>
                  </div>
                </motion.div>

                {/* Category Badge */}
                <span className="top-4 right-4 absolute bg-white/90 px-2 py-1 rounded-full text-xs capitalize">
                  {grad.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[var(--accent)] shadow-lg px-8 py-3 rounded-lg font-medium text-white"
          >
            Explore More Alumni Stories
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default GraduateGallery;