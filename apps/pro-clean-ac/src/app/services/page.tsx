"use client";

import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import {
  Wind,
  Shield,
  Wrench,
  Zap,
  CheckCircle,
  Clock,
  DollarSign,
  Award,
  Users,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { PricingCalculator } from "@/components/pricing/pricing-calculator";

export default function ServicesPage() {
  const services = [
    {
      id: "duct-cleaning",
      title: "Duct Cleaning",
      subtitle: "Dubai's Experts in Duct Cleaning",
      description: "Air duct cleaning is the process of removing dust, dirt, mould, and anything that shouldn't be in your air conditioning duct systems to improve the air quality in your home.",
      image: "/images/optimized/hero-duct-cleaning-services-dubai-1-1024w.webp",
      icon: Wind,
      features: [
        "Professional Rotobrush machine cleaning",
        "HEPA filtration system",
        "Complete duct system cleaning",
        "Improved air quality",
        "Reduced energy consumption"
      ],
      benefits: [
        "Removes dust, dirt, and mould from ducts",
        "Improves indoor air quality",
        "Reduces allergens and health hazards",
        "Increases HVAC efficiency",
        "Extends AC system lifespan"
      ],
      process: [
        "Remove grills and diffusers for access",
        "Use specialized Rotobrush machine",
        "Heavy-duty vacuum with HEPA filters",
        "Spinning brush attachments clean thoroughly",
        "Sanitize ducts for clean air passage"
      ],
      pricing: "From AED 150 per room",
      duration: "2-4 hours",
      frequency: "Every 12 months recommended"
    },
    {
      id: "sanitization",
      title: "Sanitisation",
      subtitle: "Complete AC System Sanitization",
      description: "Once we remove the grills then we can really see if there's any mould or dust and debris inside the ducts. This could be what's causing a bad smell in your home or office.",
      image: "/images/optimized/hero-sanitation-services-dubai-2-1024w.webp",
      icon: Shield,
      features: [
        "Antimicrobial treatment",
        "Mould and bacteria elimination",
        "Odour removal",
        "Safe sanitizing agents",
        "Complete system disinfection"
      ],
      benefits: [
        "Eliminates harmful bacteria and mould",
        "Removes bad odours from AC system",
        "Prevents health issues",
        "Creates cleaner breathing environment",
        "Reduces allergic reactions"
      ],
      process: [
        "Thorough inspection of duct system",
        "Identify mould and contamination",
        "Apply professional sanitizing treatment",
        "Eliminate bacteria and microbes",
        "Ensure safe, clean air circulation"
      ],
      pricing: "From AED 200 per system",
      duration: "1-2 hours",
      frequency: "As needed or with duct cleaning"
    },
    {
      id: "coil-cleaning",
      title: "Coil Cleaning",
      subtitle: "Professional Evaporator & Condenser Coil Cleaning",
      description: "There are two types of coils within your AC system: evaporator coils which are inside the indoor unit and the condenser coils which are found within the outside unit.",
      image: "/images/optimized/hero-coil-cleaning-services-dubai-3-1024w.webp",
      icon: Wrench,
      features: [
        "Evaporator coil cleaning",
        "Condenser coil cleaning",
        "Chemical coil treatment",
        "Improved heat transfer",
        "Enhanced cooling efficiency"
      ],
      benefits: [
        "Improved cooling performance",
        "Reduced energy consumption",
        "Extended equipment lifespan",
        "Better heat transfer efficiency",
        "Lower maintenance costs"
      ],
      process: [
        "Access indoor and outdoor units",
        "Remove debris and buildup",
        "Apply specialized cleaning chemicals",
        "Rinse and inspect coils",
        "Test system performance"
      ],
      pricing: "From AED 300 per unit",
      duration: "2-3 hours",
      frequency: "Every 6-12 months"
    },
    {
      id: "ac-cleaning",
      title: "AC Cleaning",
      subtitle: "Complete Air Conditioning System Cleaning",
      description: "At Pro Clean AC we are specialists in air conditioning cleaning. There are many components to the AC system that need to be cleaned and maintained, and we can take care of it all.",
      image: "/images/optimized/hero-ac-cleaning-services-dubai-4-1024w.webp",
      icon: Zap,
      features: [
        "Complete system cleaning",
        "Filter replacement",
        "Component inspection",
        "Performance optimization",
        "Preventive maintenance"
      ],
      benefits: [
        "Comprehensive system maintenance",
        "Optimal AC performance",
        "Reduced breakdown risks",
        "Improved air quality",
        "Cost-effective operation"
      ],
      process: [
        "Complete system inspection",
        "Clean all accessible components",
        "Replace or clean filters",
        "Check system performance",
        "Provide maintenance recommendations"
      ],
      pricing: "From AED 250 per unit",
      duration: "2-4 hours",
      frequency: "Every 6 months recommended"
    }
  ];

  const faqs = [
    {
      question: "What happens if you don't clean your air ducts?",
      answer: "Dust, bacteria and mould can accumulate in your ducts and have a drastic effect on your air quality within your home or office. Dust will also reduce the efficiency of your AC system."
    },
    {
      question: "How often should you do air duct cleaning?",
      answer: "Our Duct cleaning service should be carried out every 12 months, we would also recommend minor cleaning every 3-4 months to assist with the cooling and overall performance of your AC system."
    },
    {
      question: "How much does it cost to get your AC cleaned in Dubai?",
      answer: "The cost of AC cleaning would differ depending on how many AC units and Bedrooms you have in your home."
    },
    {
      question: "How does air duct cleaning work?",
      answer: "We use a machine called a Rotobrush. It's a heavy-duty vacuum with HEPA filters, using various spinning brush attachments designed specifically to clean inside your ducts."
    },
    {
      question: "How long does duct cleaning take?",
      answer: "There are a few different factors when it comes to the length of time we need to complete our service including the number of AC units or the size of your home or villa."
    },
    {
      question: "When to do duct cleaning in Dubai?",
      answer: "We recommend carrying out duct cleaning every 12 months in Dubai due to the climate and the excess dust that can infiltrate and put a strain on the system."
    },
    {
      question: "Will duct cleaning improve the air conditioning?",
      answer: "By carrying out duct cleaning, it will improve the air quality and the efficiency of the system, and also help with the cooling effect."
    },
    {
      question: "Will duct cleaning remove a smell?",
      answer: "Our method of cleaning and sanitisation will help eradicate smells and bad odours within the ducts."
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: "NADCA Certified",
      description: "Member of the National Air Duct Cleaners Association with industry-leading standards"
    },
    {
      icon: Users,
      title: "British-Trained Engineers",
      description: "Our staff are trained by British engineers with professional expertise"
    },
    {
      icon: Wrench,
      title: "Specialized Equipment",
      description: "Rotobrush machine with HEPA filters for thorough cleaning"
    },
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Fully licensed and insured for your peace of mind"
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
              src="/images/hero/professional-ac-cleaning-1920w.webp"
              alt="Professional AC cleaning service"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/60" />
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
                Our Services
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Professional AC Services
              </h1>
              <p className="text-xl text-blue-50">
                Complete air conditioning cleaning and maintenance services in Dubai.
                From duct cleaning to sanitization, we provide comprehensive solutions for optimal air quality.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
                  >
                    {/* Content */}
                    <div className={isEven ? 'lg:pr-8' : 'lg:pl-8 lg:col-start-2'}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <Badge variant="secondary">{service.title}</Badge>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {service.subtitle}
                      </h2>

                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Key Features */}
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features:</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {service.features.slice(0, 4).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="grid sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <DollarSign className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                          <div className="text-sm font-semibold text-gray-900">Pricing</div>
                          <div className="text-xs text-gray-600">{service.pricing}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <Clock className="w-5 h-5 text-green-600 mx-auto mb-2" />
                          <div className="text-sm font-semibold text-gray-900">Duration</div>
                          <div className="text-xs text-gray-600">{service.duration}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <Award className="w-5 h-5 text-orange-600 mx-auto mb-2" />
                          <div className="text-sm font-semibold text-gray-900">Frequency</div>
                          <div className="text-xs text-gray-600">{service.frequency}</div>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                          <Link href={`/booking?service=${service.id}`}>
                            Book {service.title}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                          <Link href="/contact">
                            Get Quote
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Image */}
                    <div className={isEven ? 'lg:pl-8' : 'lg:pr-8 lg:col-start-1'}>
                      <div className="relative">
                        <img
                          src={service.image}
                          alt={`${service.title} Service in Dubai`}
                          className="rounded-2xl shadow-2xl w-full"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                          <div className="flex items-center gap-2">
                            <Icon className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-gray-900">{service.title}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Calculator */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                Instant Quote
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Calculate Your Service Cost
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get an accurate, transparent quote for your AC cleaning services.
                Our pricing calculator considers your property type, size, and specific needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <PricingCalculator />
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us */}
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
                Why Choose Pro Clean AC
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Dubai&apos;s Trusted AC Cleaning Experts
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                At Pro Clean AC our aim is to always provide the best value for money
                and the highest quality British standard of service.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
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
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4">
                FAQ&apos;s
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pro Clean AC are always here to help you.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-gray-50 rounded-lg px-6 border-none"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Improve Your Air Quality?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get professional AC cleaning services from Dubai&apos;s trusted experts
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/booking">
                    Book Service Now
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/contact">
                    Get Free Quote
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}