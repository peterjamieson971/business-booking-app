"use client";

import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  Star,
  Users
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const services = [
    {
      icon: "duct",
      title: "Duct Cleaning",
      description: "Air duct cleaning is the process of removing dust, dirt, mould, and anything that shouldn't be in your air conditioning duct systems.",
      image: "/images/optimized/about-duct-cleaning-dubai-17-640w.webp"
    },
    {
      icon: "sanitization",
      title: "Sanitisation",
      description: "Once we remove the grills then we can really see if there's any mould or dust and debris inside the ducts. This could be what's causing a bad smell in your home or office. It is important that the ducts are cleaned and sanitised to help prevent any health issues.",
      image: "/images/optimized/hero-sanitation-services-dubai-2-640w.webp"
    },
    {
      icon: "coil",
      title: "Coil Cleaning",
      description: "There are two types of coils within your AC system evaporator coils which are inside the indoor unit and the condenser coils which are found within the outside unit.",
      image: "/images/optimized/hero-coil-cleaning-services-dubai-3-640w.webp"
    },
    {
      icon: "ac",
      title: "AC Cleaning",
      description: "At Pro Clean AC we are specialists in air conditioning cleaning. There are many components to the AC system that need to be cleaned and maintained, and we can take care of it all.",
      image: "/images/optimized/hero-ac-cleaning-services-dubai-4-640w.webp"
    }
  ];

  const teamMembers = [
    {
      name: "Jamie",
      role: "Managing Director",
      image: "/images/optimized/about-jamie-managing-director-pro-clean-ac-23-320w.webp",
      description: "Leading our team with British standards of excellence"
    },
    {
      name: "Christie",
      role: "HR Manager",
      image: "/images/optimized/about-christie-hr-manager-pro-clean-ac-24-320w.webp",
      description: "Ensuring our team maintains the highest service standards"
    },
    {
      name: "Jay",
      role: "Team Manager",
      image: "/images/optimized/about-jay-team-manager-pro-clean-ac-25-640w.webp",
      description: "Overseeing operations and quality assurance"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Professional Standards",
      description: "British-trained engineers with full certification and insurance coverage"
    },
    {
      icon: Star,
      title: "5-Star Service",
      description: "Consistently rated 5 stars by our customers for quality and reliability"
    },
    {
      icon: Award,
      title: "NADCA Certified",
      description: "Adhering to the highest industry standards for AC cleaning and maintenance"
    },
    {
      icon: Users,
      title: "Expat-Led Team",
      description: "An experienced team that takes pride in offering professional service"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/hero/woman-adjusting-thermostat-1920w.webp"
              alt="Woman adjusting home thermostat"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left lg:max-w-3xl text-white"
            >
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                About Us
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Cleaner air for you and your family.
              </h1>
              <div className="text-xl space-y-4 text-blue-50">
                <p>
                  At Pro Clean AC our staff are trained by British engineers. We come fully equipped on time with a friendly attitude. We can service your villa, apartment, or work place with our industry leading Machines.
                </p>
                <p>
                  The moment you make contact with us you will know that we are not like any other company you have come across before in Dubai. We pride ourselves on a very efficient service from start to finish. So for any air conditioning cleaning needs contact us for a prompt, professional & friendly service guaranteed!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* NADCA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="secondary" className="mb-4">
                  A trusted partner
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  We are NADCA Accredited
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Pro Clean AC is a member of the National Air Duct Cleaners Association (NADCA) and adheres to stringent industry standards and best practices in HVAC system cleaning and restoration.
                </p>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Certified Excellence</h3>
                    <p className="text-gray-600">Industry-leading standards and practices</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img
                  src="/images/optimized/about-image-22-1024w.webp"
                  alt="Professional AC Duct Cleaning Service in Dubai"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                  <img
                    src="/images/optimized/about-national-air-duct-cleaners-association-nadca-logo-27-320w.webp"
                    alt="NADCA Accredited"
                    className="h-12"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What We Do.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-4">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4">
                Why Pro Clean AC?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What makes us different?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We take a lot of pride in our name and level of service that we offer you and your family. It starts with a quick response back to all enquiries and upon booking an appointment, we arrive on time, as promised.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4">
                Our Team
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                An expat led, growing team of people that take pride in offering a professional service.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Interested in booking a visit with Pro Clean AC?
              </h2>
              <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/contact">
                  Plan A Visit
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}