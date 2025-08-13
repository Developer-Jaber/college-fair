"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiExternalLink, FiFilter, FiBarChart2, FiCalendar, FiUser } from 'react-icons/fi';
import SectionTitle from './SectionTitle';

const ResearchPapers = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Papers' },
    { id: 'science', label: 'Natural Sciences' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'medicine', label: 'Medical Research' },
    { id: 'humanities', label: 'Humanities' },
    { id: 'business', label: 'Business Studies' }
  ];

  const papers = [
    {
      id: 1,
      title: "Machine Learning Approaches for Climate Prediction",
      authors: "Sarah Chen, Michael Rodriguez",
      field: 'engineering',
      published: '2023-05-15',
      citations: 42,
      doi: '10.1016/j.envsoft.2023.105742',
      abstract: 'Novel ML model achieving 92% accuracy in seasonal forecasts...',
      link: '#',
      download: '#'
    },
    {
      id: 2,
      title: "CRISPR Gene Editing in Neurodegenerative Diseases",
      authors: "David Park, Emily Wong",
      field: 'medicine',
      published: '2023-02-28',
      citations: 78,
      doi: '10.1038/s41591-023-02236-4',
      abstract: 'Breakthrough in targeting Huntington disease pathways...',
      link: '#',
      download: '#'
    },
    {
      id: 3,
      title: "Quantum Computing Algorithms Optimization",
      authors: "James Wilson, Team QLab",
      field: 'science',
      published: '2023-07-10',
      citations: 31,
      doi: '10.1103/PhysRevA.107.052408',
      abstract: 'New approach reduces qubit requirements by 40%...',
      link: '#',
      download: '#'
    },
    {
      id: 4,
      title: "Sustainable Urban Development Models",
      authors: "Maria Garcia, Urban Studies Group",
      field: 'humanities',
      published: '2023-01-20',
      citations: 56,
      doi: '10.1016/j.habitatint.2023.102735',
      abstract: 'Framework for evaluating green city initiatives...',
      link: '#',
      download: '#'
    },
    {
      id: 5,
      title: "Behavioral Economics of Digital Markets",
      authors: "Robert Kim, Behavioral Finance Lab",
      field: 'business',
      published: '2023-04-05',
      citations: 29,
      doi: '10.1086/723789',
      abstract: 'User decision patterns in cryptocurrency adoption...',
      link: '#',
      download: '#'
    },
    {
      id: 6,
      title: "Advanced Battery Materials for EVs",
      authors: "Lisa Zhang, Materials Science Dept",
      field: 'engineering',
      published: '2023-03-18',
      citations: 64,
      doi: '10.1016/j.ensm.2023.102885',
      abstract: 'Solid-state electrolyte with 3x conductivity improvement...',
      link: '#',
      download: '#'
    }
  ];

  const filteredPapers = activeFilter === 'all' 
    ? papers 
    : papers.filter(paper => paper.field === activeFilter);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <SectionTitle title=" Student Research Publications" subtitle="Groundbreaking work from our academic community"></SectionTitle>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-[var(--accent)] text-white shadow-md'
                  : ' text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              <FiFilter className="mr-2" />
              {filter.label}
            </motion.button>
          ))}
        </div>

        {/* Papers Grid */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredPapers.map((paper) => (
              <motion.div
                key={paper.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-shadow"
              >
                <div className="p-6">
                  {/* Field Badge */}
                  <span className="inline-block bg-primary/10 mb-3 px-3 py-1 rounded-full font-semibold text-primary text-xs capitalize">
                    {paper.field}
                  </span>

                  {/* Title */}
                  <h3 className="mb-2 font-bold text-gray-900 text-xl line-clamp-2">
                    {paper.title}
                  </h3>

                  {/* Authors */}
                  <div className="flex items-center mb-3 text-gray-600">
                    <FiUser className="mr-2 text-sm" />
                    <span className="text-sm">{paper.authors}</span>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <FiCalendar className="mr-1.5" />
                      {new Date(paper.published).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FiBarChart2 className="mr-1.5" />
                      {paper.citations} citations
                    </div>
                  </div>

                  {/* Abstract Preview */}
                  <p className="mb-5 text-gray-600 text-sm line-clamp-3">
                    {paper.abstract}
                  </p>

                  {/* DOI */}
                  <div className="mb-4 font-mono text-gray-400 text-xs truncate">
                    DOI: {paper.doi}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 justify-center items-center gap-2 bg-[var(--primary)] hover:bg-gray-200 px-4 py-2 rounded-lg font-medium text-white hover:text-[var(--accent)] text-sm"
                    >
                      <FiExternalLink />
                      View Paper
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      href={paper.download}
                      className="flex flex-1 justify-center items-center gap-2 bg-primary hover:bg-primary/90 px-4 py-2 border-2 rounded-lg font-medium text-[var(--text)] text-sm"
                    >
                      <FiDownload />
                      Download
                    </motion.a>
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
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[var(--accent)] shadow-lg px-6 py-3 rounded-lg font-medium text-white"
          >
            Browse All Research Publications →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchPapers;