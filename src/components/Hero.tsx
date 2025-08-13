"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, damping: 10 },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="-z-10 absolute inset-0 bg-gradient-to-br from-[#f0fce6] to-[#4325ba]/10"
      />

      {/* Floating animated elements (optional) */}
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        className="top-20 left-10 absolute bg-primary/20 blur-xl rounded-full w-16 h-16"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          delay: 0.5,
          ease: "easeInOut",
        }}
        className="right-10 bottom-20 absolute bg-secondary/20 blur-xl rounded-full w-20 h-20"
      />

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 font-bold text-gray-900 text-4xl md:text-6xl"
          >
            <span className="text-gray-800">
              Book College Facilities
            </span>{" "}
            <br />
            <span className="text-gray-800">Effortlessly</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-2xl text-gray-600 text-lg md:text-xl"
          >
            Reserve classrooms, labs, sports halls, and more with just a few clicks. Designed for students and faculty.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex sm:flex-row flex-col justify-center gap-4"
          >
            <Link href="/book-now">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[var(--primary)] shadow-lg hover:shadow-primary/30 px-8 py-3 rounded-lg font-semibold text-white transition-all"
              >
                Book Now
              </motion.button>
            </Link>
            <Link href="/learn-more">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[var(--accent)] hover:bg-gray-50 px-8 py-3 border-2 border-primary rounded-lg font-semibold text-[white] hover:text-[var(--text)] transition-all"
              >
                How It Works
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats (optional) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            {[
              { value: "500+", label: "Facilities" },
              { value: "10K+", label: "Monthly Bookings" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-bold text-primary text-3xl">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;