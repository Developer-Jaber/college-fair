"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';
import SectionTitle from './SectionTitle';

// Sample campus building data
const campusBuildings = [
  {
    id: 'lib',
    name: 'Main Library',
    type: 'Study Space',
    availability: '82% Available',
    top: '25%',
    left: '30%',
    color: 'bg-blue-500'
  },
  {
    id: 'sci',
    name: 'Science Complex',
    type: 'Labs & Classrooms',
    availability: '45% Available',
    top: '50%',
    left: '60%',
    color: 'bg-green-500'
  },
  {
    id: 'gym',
    name: 'Athletics Center',
    type: 'Sports Facilities',
    availability: '68% Available',
    top: '70%',
    left: '25%',
    color: 'bg-red-500'
  }
];

type Building = {
  id: string;
  name: string;
  type: string;
  availability: string;
  top: string;
  left: string;
  color: string;
};

export default function CampusMapSection() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <SectionTitle title="Explore Campus Facilities" subtitle="Click any building to check availability and book instantly"></SectionTitle>

        {/* Interactive Map Container */}
        <div className="relative bg-white shadow-xl rounded-2xl h-[500px] overflow-hidden">
          {/* Base Map Image */}
          <div 
            className="absolute inset-0 bg-[url('/campus-map.svg')] bg-contain bg-no-repeat bg-center grayscale-30"
          />

          {/* Building Markers */}
          {campusBuildings.map(building => (
            <motion.button
              key={building.id}
              className={`absolute w-8 h-8 ${building.color} rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all`}
              style={{ top: building.top, left: building.left }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setSelectedBuilding(building)}
            >
              <span className="sr-only">{building.name}</span>
            </motion.button>
          ))}

          {/* Building Info Card */}
          <AnimatePresence>
            {selectedBuilding && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="right-8 bottom-8 left-8 absolute bg-white shadow-lg p-6 rounded-xl max-w-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 text-2xl">{selectedBuilding.name}</h3>
                    <p className="text-gray-500">{selectedBuilding.type}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedBuilding(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <MapPinIcon className="mr-2 w-5 h-5 text-primary" />
                    <span>Building {selectedBuilding.id.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="mr-2 w-5 h-5 text-primary" />
                    <span>{selectedBuilding.availability}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowBookingModal(true)}
                  className="bg-[var(--primary)] mt-6 py-3 rounded-lg w-full font-medium text-[var(--text)]"
                >
                  Book Now
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Booking Modal */}
        <AnimatePresence>
          {showBookingModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4"
              onClick={() => setShowBookingModal(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-white p-6 rounded-xl w-full max-w-md"
              >
                <h3 className="mb-4 font-bold text-2xl">Book {selectedBuilding?.name}</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">Date</label>
                    <div className="relative">
                      <CalendarIcon className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
                      <input 
                        type="date" 
                        className="p-2 pl-10 border rounded-lg w-full"
                        title="Select a date"
                        placeholder="Select a date"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="time-slot" className="block mb-1 font-medium text-gray-700 text-sm">Time Slot</label>
                    <select id="time-slot" className="p-2 border rounded-lg w-full">
                      <option>9:00 AM - 11:00 AM</option>
                      <option>1:00 PM - 3:00 PM</option>
                      <option>3:30 PM - 5:30 PM</option>
                    </select>
                  </div>

                  <button className="bg-[var(--primary)] mt-4 py-3 rounded-lg w-full font-medium text-[var(--text)]">
                    Confirm Booking
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}