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
    question: "What is the Her Driveway Club Promise?",
    answer: siteConfig.promise.text,
  },
  {
    question: "What’s included in the wash?",
    answer:
      "A full interior and exterior deep clean: hand wash, vacuum, wipe-down, glass inside and out, wheels, tires, and door jambs. We use plant-based, non-toxic products that are safe for kids and pets. 1% of every membership goes to local Newport Beach PTAs and schools.",
  },
  {
    question: "Do I need to supply water or power?",
    answer:
      "Yes an outdoor hose spigot and an outdoor power outlet are required. We bring the soap, towels, and equipment.",
  },
  {
    question: "Do I need to be home?",
    answer:
      "Nope. We’ll text you about 30 minutes before arrival. Leave the car in the driveway and make sure outdoor water and power are reachable. Keys are optional.",
  },
  {
    question: "How does booking and membership work?",
    answer:
      "Reserve your first visit online with no card. You pay after service. If you stay on, bi-weekly memberships are $50 for sedans, $60 for crossovers, and $70 for SUVs. Pause, reschedule, or cancel anytime.",
  },
  {
    question: "How does extra-car pricing work?",
    answer:
      "Your first vehicle is full price. Each extra vehicle stays 50% off on every bi-weekly visit, not just the first one. That’s $25–$35 per extra car, ongoing.",
  },
  {
    question: "Where do you launch?",
    answer:
      "We’re live in Newport Beach coastal zips first, Saturdays and Sundays. Palos Verdes, South Bay, and pool routes are on the waitlist as we expand neighborhood by neighborhood.",
  },
  {
    question: "Who actually washes my car?",
    answer:
      "We’re woman-owned and woman-operated. Trained team members—often local grads in their early 20s—come out for a focused few hours on your route day.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-4xl font-medium tracking-tight text-charcoal sm:text-5xl">
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
