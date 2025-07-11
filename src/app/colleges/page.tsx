"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiCalendar, FiBook, FiAward, FiFilter, FiSearch, FiX, FiChevronDown } from 'react-icons/fi';
import Image from 'next/image';

// College Data
const colleges = [
  {
    id: 1,
    name: "Stanford University",
    image: "https://i.ibb.co/2K8Q0f8/image.png",
    rating: 4.8,
    reviews: 1245,
    admission: "Fall 2024: Jan 5 - Apr 1",
    research: 3200,
    events: ["Open House: Mar 15", "STEM Fair: Apr 22", "Alumni Week: May 3-7"],
    sports: ["32 Varsity Teams", "NCAA Division I", "Olympic Training Facilities"]
  },
  {
    id: 2,
    name: "Harvard University",
    image: "https://i.ibb.co/fGxqfbnp/image.png",
    rating: 4.7,
    reviews: 1850,
    admission: "Fall 2024: Dec 1 - Mar 1",
    research: 2900,
    events: ["Research Symposium: Feb 28", "Arts Festival: Jun 10"],
    sports: ["42 National Championships", "Ivy League", "State-of-the-art Gym"]
  },
  {
    id: 3,
    name: "MIT",
    image: "https://i.ibb.co/pBbSsXgq/image.png",
    rating: 4.9,
    reviews: 980,
    admission: "Rolling Admissions",
    research: 4100,
    events: ["Tech Expo: Nov 5", "Hackathon: Dec 12"],
    sports: ["33 Sports Clubs", "Division III Athletics"]
  },
  {
    id: 4,
    name: "UC Berkeley",
    image: "https://i.ibb.co/sp9PdXTY/image.png",
    rating: 4.5,
    reviews: 1560,
    admission: "Fall 2024: Nov 1 - Jan 31",
    research: 2700,
    events: ["Startup Pitch: Oct 15", "Science Fair: Mar 22"],
    sports: ["25 Varsity Teams", "Olympic-sized Pool"]
  },
  {
    id: 5,
    name: "Yale University",
    image: "https://i.ibb.co/RT51XYgq/image.png",
    rating: 4.6,
    reviews: 1320,
    admission: "Fall 2024: Dec 15 - Mar 15",
    research: 1900,
    events: ["Literature Fest: Apr 5", "History Conference: Sep 18"],
    sports: ["35 Varsity Teams", "Ivy League", "Rowing Club"]
  },
{
    id: 6,
    name: "Princeton University",
    image: "https://i.ibb.co/DHsbg0Kw/image.png",
    rating: 4.8,
    reviews: 1100,
    admission: "Fall 2024: Jan 1 - Mar 31",
    research: 2100,
    events: ["Innovation Day: Apr 20", "Math Colloquium: May 11"],
    sports: ["38 Varsity Teams", "Ivy League", "Historic Football Field"]
  },
  {
    id: 7,
    name: "Columbia University",
    image: "https://i.ibb.co/PzxtBxdB/image.png",
    rating: 4.6,
    reviews: 1450,
    admission: "Fall 2024: Nov 15 - Feb 28",
    research: 2400,
    events: ["Film Festival: Apr 10", "Data Science Week: Jun 1-5"],
    sports: ["31 Varsity Teams", "Urban Training Facilities"]
  },
  {
    id: 8,
    name: "University of Chicago",
    image: "https://i.ibb.co/v41DcZRM/image.png",
    rating: 4.7,
    reviews: 1280,
    admission: "Fall 2024: Oct 10 - Jan 20",
    research: 2200,
    events: ["Economics Conference: Jan 18", "Jazz Night: Mar 10"],
    sports: ["28 Sports Clubs", "Modern Gym Complex"]
  },
  {
    id: 9,
    name: "California Institute of Technology (Caltech)",
    image: "https://i.ibb.co/HpGdTN7M/image.png",
    rating: 4.9,
    reviews: 800,
    admission: "Fall 2024: Dec 10 - Mar 10",
    research: 4600,
    events: ["Robotics Day: Feb 22", "Astronomy Night: Apr 7"],
    sports: ["15 Varsity Teams", "Science-focused Recreation"]
  },
  {
    id: 10,
    name: "University of Oxford",
    image: "https://i.ibb.co/93t3Qrn3/image.png",
    rating: 4.9,
    reviews: 2300,
    admission: "Fall 2024: Oct 1 - Jan 15",
    research: 5000,
    events: ["Literature Conference: Mar 30", "Science Summit: Jul 5"],
    sports: ["Rowing Competitions", "Historic Sports Grounds"]
  },
  {
    id: 11,
    name: "University of Cambridge",
    image: "https://i.ibb.co/zqtDm2m/image.png",
    rating: 4.8,
    reviews: 2100,
    admission: "Fall 2024: Sep 20 - Jan 10",
    research: 4700,
    events: ["AI Forum: Feb 17", "Music Showcase: May 3"],
    sports: ["Cricket Grounds", "Varsity Boat Races"]
  },
  {
    id: 12,
    name: "University of Toronto",
    image: "https://i.ibb.co/zWFCxPC2/image.png",
    rating: 4.6,
    reviews: 1700,
    admission: "Fall 2024: Dec 1 - Mar 1",
    research: 3300,
    events: ["Startup Bootcamp: Mar 25", "International Week: Apr 15-19"],
    sports: ["Ice Hockey Rinks", "Basketball Courts"]
  },
  {
    id: 13,
    name: "University of Michigan",
    image: "https://i.ibb.co/mVVxqkck/image.png",
    rating: 4.7,
    reviews: 1900,
    admission: "Fall 2024: Nov 10 - Feb 28",
    research: 2900,
    events: ["Engineering Expo: Jan 30", "ML Summit: Mar 9"],
    sports: ["Big Ten Athletics", "Football Stadium"]
  },
  {
    id: 14,
    name: "University of Washington",
    image: "https://i.ibb.co/Rk4sszV7/image.png",
    rating: 4.5,
    reviews: 1600,
    admission: "Fall 2024: Dec 5 - Mar 20",
    research: 3100,
    events: ["Global Health Day: Feb 14", "Spring Career Fair: Apr 20"],
    sports: ["Pac-12 Sports", "Rowing & Soccer"]
  },
  {
    id: 15,
    name: "National University of Singapore (NUS)",
    image: "https://i.ibb.co/21GJ6KCS/image.png",
    rating: 4.8,
    reviews: 2000,
    admission: "Fall 2024: Sep 1 - Dec 31",
    research: 3500,
    events: ["AsiaTech Conference: Oct 18", "Innovation Week: Jan 12-16"],
    sports: ["Modern Gyms", "Outdoor Sports Complex"]
  },
  {
    id: 16,
    name: "ETH Zurich",
    image: "https://i.ibb.co/fY4TMjsn/image.png",
    rating: 4.9,
    reviews: 950,
    admission: "Fall 2024: Oct 1 - Jan 31",
    research: 4300,
    events: ["Quantum Summit: Feb 28", "Innovation Lab: Apr 11"],
    sports: ["Ski Club", "Indoor Climbing Facility"]
  },
  {
    id: 17,
    name: "University of Melbourne",
    image: "https://i.ibb.co/1GkcKRq1/image.png",
    rating: 4.7,
    reviews: 1350,
    admission: "Fall 2024: Nov 1 - Feb 1",
    research: 2800,
    events: ["Cultural Fest: Mar 17", "BioTech Meet: May 8"],
    sports: ["Cricket & Rugby Grounds", "Fitness Hubs"]
  },
  {
    id: 18,
    name: "University of Edinburgh",
    image: "https://i.ibb.co/Kc8TSVPX/image.png",
    rating: 4.6,
    reviews: 1230,
    admission: "Fall 2024: Sep 15 - Jan 5",
    research: 2500,
    events: ["Philosophy Debate: Mar 2", "Science Slam: Apr 29"],
    sports: ["Indoor Tracks", "Fencing & Judo"]
  },
  {
    id: 19,
    name: "Peking University",
    image: "https://i.ibb.co/CK1mJv3N/image.png",
    rating: 4.5,
    reviews: 1100,
    admission: "Fall 2024: Sep 1 - Dec 20",
    research: 3400,
    events: ["Tech Forum: Jan 10", "Mandarin Culture Fest: Apr 4"],
    sports: ["Basketball Arenas", "Martial Arts Classes"]
  },
  {
    id: 20,
    name: "University of Tokyo",
    image: "https://i.ibb.co/hxDxJDRw/image.png",
    rating: 4.6,
    reviews: 1250,
    admission: "Fall 2024: Sep 10 - Jan 20",
    research: 3700,
    events: ["Robotics Fest: Dec 3", "Language Week: Feb 27"],
    sports: ["Track Fields", "Judo & Karate Dojos"]
  },
  {
    id: 21,
    name: "McGill University",
    image: "https://i.ibb.co/1YzQq6GT/image.png",
    rating: 4.5,
    reviews: 1000,
    admission: "Fall 2024: Nov 1 - Feb 15",
    research: 2800,
    events: ["Neuroscience Fair: Feb 6", "Music Jam: May 10"],
    sports: ["Ice Skating Arena", "Varsity Hockey Team"]
  },
  {
    id: 22,
    name: "University of Sydney",
    image: "https://i.ibb.co/vxDShhSf/image.png",
    rating: 4.6,
    reviews: 1150,
    admission: "Fall 2024: Oct 10 - Jan 15",
    research: 2600,
    events: ["Arts Expo: Apr 2", "AI & Ethics Panel: Mar 6"],
    sports: ["Swimming Pools", "Surfing Club"]
  },
  {
    id: 23,
    name: "Cornell University",
    image: "https://i.ibb.co/FLhVgLdB/image.png",
    rating: 4.7,
    reviews: 1440,
    admission: "Fall 2024: Nov 15 - Feb 28",
    research: 3000,
    events: ["Climate Forum: Apr 12", "Food Science Day: Jun 5"],
    sports: ["Ivy League", "Equestrian Club"]
  },
  {
    id: 24,
    name: "Johns Hopkins University",
    image: "https://i.ibb.co/1ty1HGrd/image.png",
    rating: 4.8,
    reviews: 1750,
    admission: "Fall 2024: Dec 1 - Mar 1",
    research: 4500,
    events: ["Medical Innovations Fair: Jan 25", "Public Health Week: Mar 13"],
    sports: ["Lacrosse Fields", "Wellness Center"]
  },
  {
    id: 25,
    name: "Duke University",
    image: "https://i.ibb.co/xtfGtHqz/image.png",
    rating: 4.6,
    reviews: 1400,
    admission: "Fall 2024: Dec 10 - Mar 15",
    research: 3200,
    events: ["Engineering Showcase: Mar 5", "Music & Arts: Apr 14"],
    sports: ["Basketball Powerhouse", "ACC Athletics"]
  }
];

type College = {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  admission: string;
  research: number;
  events: string[];
  sports: string[];
};
export default function CollegeListing() {
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

//   // Filter and sort colleges

//   const filteredColleges = colleges
//     .filter(college => 
//       college.name.toLowerCase().includes(searchQuery.toLowerCase())
//     .sort((a, b) => {
//       if (sortBy === 'rating') return b.rating - a.rating;
//       if (sortBy === 'research') return b.research - a.research;
//       return 0;
//     });
const filteredColleges = colleges
  .filter(college => 
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) // <-- Close filter here
  .sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'research') return b.research - a.research;
    return 0;
  });


  return (
    <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 font-bold text-gray-900 text-4xl md:text-5xl">
            <span className="bg-clip-text bg-gradient-to-r from-primary to-secondary text-transparent">
              Explore Top Colleges
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-gray-600 text-xl">
            Find your perfect academic match with detailed insights
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div 
          className="flex md:flex-row flex-col gap-4 bg-white shadow-sm mb-8 p-4 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative flex-grow">
            <FiSearch className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2 transform" />
            <input
              type="text"
              placeholder="Search colleges..."
              className="py-2 pr-4 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
            >
              <FiFilter />
              <span>Filters</span>
              <FiChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Filter Dropdown */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white shadow-sm mb-8 p-4 rounded-xl overflow-hidden"
            >
              <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                <div>
                  <label htmlFor="sortBy" className="block mb-1 font-medium text-gray-700 text-sm">Sort By</label>
                  <select
                    id="sortBy"
                    className="p-2 border rounded-lg w-full"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="rating">Highest Rating</option>
                    <option value="research">Most Research</option>
                  </select>
                </div>
                {/* Add more filters as needed */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Colleges Grid */}
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-2xl:grid-cols-4">
          {filteredColleges.map((college) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-shadow"
            >
              {/* College Image */}
              <div className="h-48 overflow-hidden">
                <Image 
                  src={college.image} 
                  alt={college.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  width={500}
                  height={200}
                />
              </div>

              {/* College Info */}
              <div className="p-5">
                <h2 className="mb-1 font-bold text-gray-900 text-xl">{college.name}</h2>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(college.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    {college.rating} ({college.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Quick Facts */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiCalendar className="mr-2 text-primary" />
                    {college.admission}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiBook className="mr-2 text-primary" />
                    {college.research.toLocaleString()} research papers
                  </div>
                </div>

                {/* Details Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCollege(college)}
                  className="bg-[var(--primary)] py-2 rounded-lg w-full font-medium text-white"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* College Details Modal */}
        <AnimatePresence>
          {selectedCollege && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4"
              onClick={() => setSelectedCollege(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="relative">
                  <div className="w-full h-48 overflow-hidden">
                    <Image 
                      width={500}
                      height={200}
                      src={selectedCollege.image} 
                      alt={selectedCollege.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setSelectedCollege(null)}
                    className="top-4 right-4 absolute bg-white/80 hover:bg-white shadow-md p-2 rounded-full"
                  >
                    <FiX />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <h2 className="mb-2 font-bold text-gray-900 text-2xl">{selectedCollege.name}</h2>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(selectedCollege.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      {selectedCollege.rating} ({selectedCollege.reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-6">
                    <div>
                      <h3 className="flex items-center mb-3 font-semibold text-lg">
                        <FiCalendar className="mr-2 text-primary" />
                        Admission Info
                      </h3>
                      <p className="text-gray-700">{selectedCollege.admission}</p>
                    </div>

                    <div>
                      <h3 className="flex items-center mb-3 font-semibold text-lg">
                        <FiBook className="mr-2 text-primary" />
                        Research Output
                      </h3>
                      <p className="text-gray-700">
                        {selectedCollege.research.toLocaleString()} published papers
                      </p>
                    </div>
                  </div>

                  {/* Events */}
                  <div className="mb-6">
                    <h3 className="flex items-center mb-3 font-semibold text-lg">
                      <FiAward className="mr-2 text-primary" />
                      Upcoming Events
                    </h3>
                    <ul className="space-y-2">
                      {selectedCollege.events.map((event, i) => (
                        <li key={i} className="flex items-start">
                          <span className="bg-primary mt-2 mr-2 rounded-full w-2 h-2"></span>
                          <span className="text-gray-700">{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sports */}
                  <div>
                    <h3 className="flex items-center mb-3 font-semibold text-lg">
                      <FiAward className="mr-2 text-primary" />
                      Sports Facilities
                    </h3>
                    <ul className="space-y-2">
                      {selectedCollege.sports.map((sport, i) => (
                        <li key={i} className="flex items-start">
                          <span className="bg-primary mt-2 mr-2 rounded-full w-2 h-2"></span>
                          <span className="text-gray-700">{sport}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}