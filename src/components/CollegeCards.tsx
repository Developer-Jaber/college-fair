"use client";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaFlask, FaRunning, FaChevronRight } from "react-icons/fa";
import Stanford from "./../../public/collegeimg/stanford.png";
import Harverd from "./../../public/collegeimg/harvard.png";
import MIT from "./../../public/collegeimg/mit.png";
import SectionTitle from "./SectionTitle";
import PrimaryButton from "./PrimaryButton";

const CollegeCards = () => {
  const colleges = [
    {
      id: 1,
      name: "Stanford University",
      image: `${Stanford.src}`,
      admission: "Fall 2024: Jan 5 - Apr 1",
      events: ["Open House: Mar 15", "STEM Fair: Apr 22"],
      research: "120+ patents in 2023",
      sports: ["NCAA Division I", "32 Varsity Teams"]
    },
    {
      id: 2,
      name: "Harvard College",
      image:`${Harverd.src}`,
      admission: "Fall 2024: Dec 1 - Mar 1",
      events: ["Alumni Week: May 3-7", "Arts Festival: Jun 10"],
      research: "$1.1B research budget",
      sports: ["Ivy League", "42 National Championships"]
    },
    {
      id: 3,
      name: "MIT",
      image: `${MIT.src}`,
      admission: "Rolling Admissions",
      events: ["Tech Symposium: Feb 28", "HackMIT: Nov 5-7"],
      research: "85 Nobel Laureates",
      sports: ["Division III", "33 Sports Clubs"]
    }
  ];

  return (
    <section className="bg-gradient-to-b from-[#f0fce6] to-[#4325ba]/5 py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <SectionTitle title="Featured Institutions" subtitle="Partner colleges with world-class facilities"></SectionTitle>

        {/* College Cards Grid */}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          {colleges.map((college) => (
            <motion.div
              key={college.id}
              whileHover="hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[400px] perspective-1000"
            >
              {/* Card Container */}
              <motion.div
                variants={{
                  hover: { rotateY: 15 }
                }}
                className="relative w-full h-full transition-all duration-500 preserve-3d"
              >
                {/* Front Side */}
                <motion.div 
                  className="absolute inset-0 bg-white shadow-xl rounded-2xl overflow-hidden backface-hidden"
                  style={{
                    backgroundImage: `url(${college.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <div className="absolute inset-0 flex flex-col justify-end bg-black/40 p-6">
                    <h3 className="font-bold text-white text-2xl">{college.name}</h3>
                    <div className="flex items-center mt-2">
                      <FaCalendarAlt className="mr-2 text-primary" />
                      <span className="text-white/90">{college.admission}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Back Side (Visible on hover) */}
                <motion.div
                  variants={{
                    hover: { rotateY: -15 }
                  }}
                  className="absolute inset-0 flex flex-col bg-white shadow-xl p-6 rounded-2xl backface-hidden"
                  style={{
                    transform: "rotateY(180deg)",
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <h3 className="mb-4 font-bold text-gray-900 text-xl">{college.name}</h3>
                  
                  {/* Details Sections */}
                  <div className="flex-grow space-y-4">
                    <div>
                      <div className="flex items-center mb-1 text-primary">
                        <FaCalendarAlt className="mr-2" />
                        <span className="font-medium">Events</span>
                      </div>
                      <ul className="pl-6 text-gray-700 text-sm">
                        {college.events.map((event, i) => (
                          <li key={i} className="flex items-center mb-1">
                            <FaChevronRight className="mr-2 w-2 h-2 text-primary" />
                            {event}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center mb-1 text-primary">
                        <FaFlask className="mr-2" />
                        <span className="font-medium">Research</span>
                      </div>
                      <p className="pl-6 text-gray-700 text-sm">{college.research}</p>
                    </div>

                    <div>
                      <div className="flex items-center mb-1 text-primary">
                        <FaRunning className="mr-2" />
                        <span className="font-medium">Sports</span>
                      </div>
                      <ul className="pl-6 text-gray-700 text-sm">
                        {college.sports.map((sport, i) => (
                          <li key={i} className="flex items-center mb-1">
                            <FaChevronRight className="mr-2 w-2 h-2 text-primary" />
                            {sport}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <PrimaryButton 
                  className="mt-4 py-2 w-full font-medium text-md"
                  >
                    View Facilities
                  </PrimaryButton>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollegeCards;