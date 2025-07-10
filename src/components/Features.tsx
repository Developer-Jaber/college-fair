"use client";
import { motion } from "framer-motion";
import { AcademicCapIcon, CalendarIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const Features = () => {
  const features = [
    {
      icon: <AcademicCapIcon className="w-8 h-8" />,
      title: "Diverse Facilities",
      desc: "Book classrooms, labs, sports halls, and auditoriums in one place.",
    },
    {
      icon: <CalendarIcon className="w-8 h-8" />,
      title: "Real-Time Availability",
      desc: "See live schedules to avoid double bookings.",
    },
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: "Instant Confirmation",
      desc: "Get booking approvals in seconds, not days.",
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: "Group Management",
      desc: "Easily reserve spaces for study groups or events.",
    },
  ];

  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
            <span className="bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Why Choose Us?
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            Simplify campus life with our intuitive booking platform.
          </p>
        </motion.div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#DFE6E3] shadow-sm hover:shadow-md p-6 rounded-xl transition-shadow"
            >
              <div className="flex justify-center items-center bg-primary/10 mb-4 rounded-lg w-12 h-12 text-primary">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-semibold text-gray-800 text-xl">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;