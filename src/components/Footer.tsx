"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import collegeLogo from "../../public/logo/college-fair-logo.png"
import { useEffect, useState } from "react";
import PrimaryButton from "./customComponents/PrimaryButton";

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, []);

  const socialLinks = [
    { icon: <FaFacebook />, name: "Facebook", url: "#" },
    { icon: <FaTwitter />, name: "Twitter", url: "#" },
    { icon: <FaInstagram />, name: "Instagram", url: "#" },
    { icon: <FaLinkedin />, name: "LinkedIn", url: "#" },
    { icon: <FaYoutube />, name: "YouTube", url: "#" }
  ];



  const footerLinks = [
    {
      title: "Facilities",
      links: [
        { name: "Classrooms", url: "#" },
        { name: "Laboratories", url: "#" },
        { name: "Sports Complex", url: "#" },
        { name: "Auditoriums", url: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Booking Guide", url: "#" },
        { name: "FAQs", url: "#" },
        { name: "Policies", url: "#" },
        { name: "Support", url: "#" }
      ]
    },
    {
      title: "University",
      links: [
        { name: "About Us", url: "#" },
        { name: "Contact", url: "#" },
        { name: "Careers", url: "#" },
        { name: "News", url: "#" }
      ]
    }
  ];

    // Predefined bubble positions and sizes
  const bubbleConfigs = [
    { size: "w-6 h-6", top: "25%", left: "20%" },
    { size: "w-8 h-8", top: "30%", left: "50%" },
    { size: "w-4 h-4", top: "15%", left: "70%" },
    { size: "w-10 h-10", top: "40%", left: "10%" },
    { size: "w-5 h-5", top: "60%", left: "80%" },
    { size: "w-7 h-7", top: "75%", left: "30%" },
    { size: "w-9 h-9", top: "50%", left: "90%" },
    { size: "w-6 h-6", top: "20%", left: "40%" },
    { size: "w-8 h-8", top: "85%", left: "60%" },
    { size: "w-5 h-5", top: "65%", left: "25%" },
    { size: "w-7 h-7", top: "45%", left: "75%" },
    { size: "w-4 h-4", top: "10%", left: "55%" },
    { size: "w-9 h-9", top: "80%", left: "15%" },
    { size: "w-6 h-6", top: "35%", left: "65%" },
    { size: "w-8 h-8", top: "55%", left: "35%" }
  ];



  return (
    <footer className="relative bg-gradient-to-b from-[#f0fce6] to-[#4325ba]/10 pt-20 pb-10 overflow-hidden">
      {/* Floating bubbles background */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
        {bubbleConfigs.map((config, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, i % 2 === 0 ? -10 : 10, 0]
            }}
            transition={{
              duration: 10 + (i * 1.5),
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute bg-white/10 rounded-full ${config.size}`}
            style={{
              top: config.top,
              left: config.left 
            }}
          />
        ))}
      </div>
      )}

      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main footer content */}
        <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Brand info */}
          <div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center mb-6"
            >
              <Image src={collegeLogo} alt="College Fair" width={150} height={50} />
            </motion.div>
            <p className="mb-6 text-gray-700">
              Revolutionizing campus facility management through seamless digital booking solutions.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative bg-white/20 backdrop-blur-sm p-3 rounded-full text-gray-700 hover:text-primary transition-colors"
                >
                  {social.icon}
                  <motion.span
                    className="absolute inset-0 opacity-0 border-2 border-primary rounded-full"
                    whileHover={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="mb-4 font-semibold text-gray-900 text-lg">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <a
                        href={link.url}
                        className="flex items-center text-gray-600 hover:text-primary transition-colors"
                      >
                        <span className="bg-primary opacity-0 group-hover:opacity-100 mr-2 rounded-full w-2 h-2 transition-opacity" />
                        {link.name}
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 text-lg">Stay Updated</h3>
            <p className="mb-4 text-gray-600">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full"
                required
              />
              <PrimaryButton className="px-4 py-3 w-full font-medium">Subscribe</PrimaryButton>
            </form>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="flex md:flex-row flex-col justify-between items-center pt-8 border-white/20 border-t">
          <p className="mb-4 md:mb-0 text-gray-600">
            © {new Date().getFullYear()} College Fair. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;