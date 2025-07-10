"use client";
import { motion } from "framer-motion";

const Steps = () => {
  const steps = [
    {
      id: 1,
      title: "Browse Facilities",
      description: "Search by location, type, or availability.",
    },
    {
      id: 2,
      title: "Select Time Slot",
      description: "Choose from real-time available slots.",
    },
    {
      id: 3,
      title: "Confirm Booking",
      description: "Get instant confirmation via email.",
    },
  ];

  return (
    <section className="flex justify-center items-center bg-amber-50 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
            <span className="bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Simple Booking Process
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            Reserve a facility in just 3 easy steps.
          </p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Vertical line (desktop only) */}
          <div className="hidden lg:block top-0 left-1/2 absolute bg-gradient-to-b from-primary to-secondary w-0.5 h-full -translate-x-1/2 transform"></div>

          {/* Steps Grid */}
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col items-center lg:items-${
                  index % 2 === 0 ? "start" : "end"
                } text-center lg:text-${index % 2 === 0 ? "left" : "right"}`}
              >
                {/* Step Number */}
                <div className="flex justify-center items-center bg-gradient-to-r from-primary to-secondary mb-4 rounded-full w-12 h-12 font-bold text-xl">
                  {step.id}
                </div>

                {/* Step Content */}
                <h3 className="mb-2 font-semibold text-gray-800 text-xl">
                  {step.title}
                </h3>
                <p className="max-w-xs text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;