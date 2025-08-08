'use client'
import * as React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

const faqs = [
  {
    question: "How do I book a college facility?",
    answer: "Navigate to the 'Admission' section, select your desired college, fill out the form with your details, and submit your application. You'll receive a confirmation email."
  },
  {
    question: "Can I visit colleges before applying?",
    answer: "Yes! Many colleges offer campus tours. Check the college details page for visiting hours or contact the administration directly."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers. Some colleges may also accept installment plans."
  },
  {
    question: "How long does the admission process take?",
    answer: "Typically 2-4 weeks after application submission. Some specialized programs may take longer."
  },
  {
    question: "Can I edit my application after submitting?",
    answer: "You can request edits within 24 hours of submission by contacting our support team at admissions@collegeconnect.com"
  }
]

export function FAQ() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-24 lg:py-32 w-full">
      <div className="px-4 md:px-6 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-bold text-[ver(--text)] text-3xl sm:text-4xl tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600">
            Can&apos;t find what you&apos;re looking for? <a href="/contact" className="text-blue-600 hover:underline">Contact our support team</a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-16 max-w-2xl text-2xl"
        >
          <Accordion type="single" collapsible className="space-y-4 w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-white shadow-sm hover:shadow-md p-6 border border-gray-200 rounded-xl transition-all"
                >
                  <AccordionTrigger className="flex justify-between items-center w-full text-left [&[data-state=open]>svg:rotate-180">
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200 shrink-0" />
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex bg-gray-100 p-1 rounded-lg">
            <span className="px-4 py-2 font-medium text-gray-700 text-sm">Still have questions?</span>
            <a
              href="/contact"
              className="bg-[var(--accent)] shadow-lg px-6 py-3 rounded-lg font-medium text-white"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}