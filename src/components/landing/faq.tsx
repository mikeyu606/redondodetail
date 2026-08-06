"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/site-config";

const faqs = [
  {
    question: "What is The Redondo Detail Promise?",
    answer: siteConfig.promise.text,
  },
  {
    question: "Do I need to supply water or power?",
    answer:
      "No, our mobile setup is fully self-contained! We bring our own water tanks, power generators, and professional-grade equipment. Your driveway is all we need.",
  },
  {
    question: "Do I need to be home during the service?",
    answer:
      "No, as long as the vehicle is accessible in the driveway, we handle everything on autopilot. Many of our subscribers leave for work and come home to a spotless car.",
  },
  {
    question: "How does the subscription work?",
    answer:
      "Secured via Stripe. Pause, reschedule, or cancel anytime with zero hidden fees. You're billed automatically every two weeks, and we'll text you the night before each visit.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We proudly serve Redondo Beach, Hermosa Beach, Manhattan Beach, and Palos Verdes. Routes are clustered by zip code for efficient, on-time service.",
  },
  {
    question: "How long does a detail take?",
    answer:
      "Most full details take 60–90 minutes depending on vehicle size and condition. We never rush — every jamb, vent, and glass panel gets our full attention.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl tracking-tight text-charcoal sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate">
            Everything you need to know before locking in your driveway slot.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-2xl border border-pink-medium/40 bg-white px-6 shadow-sm shadow-pink-medium/10"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
