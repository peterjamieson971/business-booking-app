"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function CorporateClientsSection() {
  const clients = [
    {
      name: "Zurich",
      logo: "/images/optimized/hero-zurich-logo-7-full.webp",
      description: "Insurance & Financial Services"
    },
    {
      name: "Costa Coffee",
      logo: "/images/optimized/hero-costa-coffee-logo-8-full.webp",
      description: "International Coffee Chain"
    },
    {
      name: "Five Hotels",
      logo: "/images/optimized/hero-five-logo-9-640w.webp",
      description: "Luxury Hospitality"
    },
    {
      name: "RAKBank",
      logo: "/images/optimized/hero-rakbank-logo-11-full.webp",
      description: "Banking & Financial Services"
    }
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 bg-blue-600 text-white">
            Trusted Partners
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Corporate Clients
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our extensive experience gives us the chance to work with some of the most
            renowned names in Dubai. Trusted by leading corporations for professional AC services.
          </p>
        </motion.div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 h-32 flex items-center justify-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="font-semibold text-lg">{client.name}</h3>
                <p className="text-sm text-gray-400">{client.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* NADCA Certification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 pt-16 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="bg-white rounded-xl p-6">
              <img
                src="/images/optimized/hero-national-air-duct-cleaners-association-nadca-logo-15-320w.webp"
                alt="NADCA Accredited - National Air Duct Cleaners Association"
                className="h-16 object-contain"
              />
            </div>
            <div className="text-left max-w-md">
              <h3 className="text-xl font-bold mb-2">NADCA Accredited</h3>
              <p className="text-gray-300">
                Pro Clean AC is a member of the National Air Duct Cleaners Association (NADCA)
                and adheres to stringent industry standards and best practices in HVAC system
                cleaning and restoration.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-300 mb-6">
            Ready to join our list of satisfied corporate clients?
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Corporate Enquiry
          </a>
        </motion.div>
      </div>
    </section>
  );
}