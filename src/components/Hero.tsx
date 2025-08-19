"use client";
import { animate, motion, useMotionValue, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import PrimaryButton from "./PrimaryButton";
import { useInView } from 'react-intersection-observer';
import { useEffect } from "react";

const MotionCounter = ({ value, duration = 2 }: { value: number | string; duration?: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round)
  const formatted = useTransform(rounded, (val) => {
    if(typeof value === 'string') return value;
    if(val >= 10000) return `${(val/1000).toFixed(0)}K+`;
    if(val >= 1000) return `${(val/1000).toFixed(1)}K+`;
    return `${val}+`
  });

  useEffect(()=>{
    if (inView && typeof value === "number") {
      const animation = animate(count, value, {
        duration: duration,
        ease: "easeOut"
      });
      return animation.stop;
    }
  },[inView, value, count, duration]);
  return <motion.span ref={ref}>{formatted}</motion.span>
}

const Hero = () => {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, damping: 10 , ease: [0.25, 0.46, 0.45, 0.94]},
    },
  };

  const statsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const statItemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
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
      <div className="mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-24 md:py-32 max-w-7xl">
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
              <PrimaryButton 
              className="px-8 py-3" 
              >
                Book Now
              </PrimaryButton>
            </Link>
            <Link href="/learn-more">
              <PrimaryButton
              className="px-8 py-3"
              variant="secondary"
              >
                How It Works
              </PrimaryButton>
            </Link>
          </motion.div>

          {/* Stats (optional) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={statsContainerVariants}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            {[
              { value: 500, label: "Facilities" },
              { value: 10000, label: "Monthly Bookings" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div 
              key={index}
              variants={statItemVariants}
              className="text-center"
              >
                <p className="font-bold text-primary text-3xl md:text-4xl">
                  <MotionCounter value={stat.value} duration={1.5} />
                </p>
                <p className="mt-2 text-gray-500 text-sm md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;