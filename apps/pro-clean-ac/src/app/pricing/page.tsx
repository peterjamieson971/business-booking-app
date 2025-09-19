"use client";

import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PricingCalculator } from "@/components/pricing/pricing-calculator";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Star,
  Shield,
  Clock,
  Award,
  DollarSign,
  Users,
  Zap,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Basic Clean",
      price: 299,
      originalPrice: 399,
      description: "Perfect for regular maintenance",
      popular: false,
      features: [
        "1-2 AC units cleaning",
        "Basic duct cleaning",
        "Filter replacement",
        "System inspection",
        "2-3 hours service time",
        "Basic sanitization"
      ],
      savings: "Save AED 100"
    },
    {
      name: "Complete Clean",
      price: 599,
      originalPrice: 799,
      description: "Most popular comprehensive package",
      popular: true,
      features: [
        "Up to 4 AC units cleaning",
        "Complete duct cleaning",
        "Coil deep cleaning",
        "Full sanitization",
        "Filter replacement",
        "4-6 hours service time",
        "Performance optimization",
        "6-month warranty"
      ],
      savings: "Save AED 200"
    },
    {
      name: "Premium Clean",
      price: 999,
      originalPrice: 1299,
      description: "Ultimate cleaning and maintenance",
      popular: false,
      features: [
        "Unlimited AC units",
        "Complete system overhaul",
        "Professional coil cleaning",
        "Advanced sanitization",
        "Premium filter upgrade",
        "6-8 hours service time",
        "Performance optimization",
        "12-month warranty",
        "Priority support",
        "Quarterly maintenance"
      ],
      savings: "Save AED 300"
    }
  ];

  const testimonials = [
    {
      name: "Ahmed Al-Rashid",
      location: "Dubai Marina",
      rating: 5,
      text: "Excellent service! The pricing was transparent and fair. My AC is working like new after their complete cleaning service.",
      service: "Complete Clean Package"
    },
    {
      name: "Sarah Johnson",
      location: "Downtown Dubai",
      rating: 5,
      text: "Very professional team. The pricing calculator helped me understand exactly what I was paying for. Highly recommended!",
      service: "Premium Clean Package"
    },
    {
      name: "Mohammed Hassan",
      location: "Jumeirah",
      rating: 5,
      text: "Great value for money. The service was thorough and the pricing was very competitive compared to other companies.",
      service: "Basic Clean Package"
    }
  ];

  const guarantees = [
    {
      icon: Shield,
      title: "Money-Back Guarantee",
      description: "100% satisfaction guarantee or your money back"
    },
    {
      icon: Award,
      title: "Price Match Promise",
      description: "We'll match any competitor's written quote"
    },
    {
      icon: Clock,
      title: "No Hidden Fees",
      description: "Transparent pricing with no surprise charges"
    },
    {
      icon: Users,
      title: "Licensed Professionals",
      description: "All work performed by certified technicians"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/hero/woman-using-ac-remote-1920w.webp"
              alt="AC pricing and quotes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/60" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-white"
            >
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                Transparent Pricing
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Fair & Transparent
                <br />AC Cleaning Prices
              </h1>
              <p className="text-xl text-blue-50 max-w-3xl mx-auto mb-8">
                No hidden fees, no surprises. Get instant quotes with our pricing calculator
                and choose the package that's right for your home or business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="#calculator">
                    Calculate Your Price
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/contact">
                    Get Custom Quote
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Plans */}
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
                Service Packages
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Choose Your Perfect Package
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pre-designed packages for different needs and budgets.
                Each package includes professional service with satisfaction guarantee.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className={`relative h-full ${plan.popular ? 'border-2 border-blue-500 shadow-xl' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-blue-500 text-white px-4 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <p className="text-gray-600">{plan.description}</p>

                      <div className="mt-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-3xl font-bold text-blue-600">AED {plan.price}</span>
                          <span className="text-lg text-gray-400 line-through">AED {plan.originalPrice}</span>
                        </div>
                        <div className="text-sm text-green-600 font-semibold mt-1">
                          {plan.savings}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        asChild
                        size="lg"
                        className={`w-full ${
                          plan.popular
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-gray-900 hover:bg-gray-800'
                        }`}
                      >
                        <Link href={`/booking?package=${plan.name.toLowerCase().replace(' ', '-')}`}>
                          Choose {plan.name}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <p className="text-gray-600 mb-4">
                Need a custom solution for your business or large property?
              </p>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Request Enterprise Quote
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Pricing Calculator */}
        <section id="calculator" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                Instant Calculator
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Calculate Your Exact Cost
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get a personalized quote based on your specific property and service needs.
                Our calculator considers all factors for accurate pricing.
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

        {/* Guarantees */}
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
                Our Promise
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Risk-Free Service Guarantee
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We stand behind our work with comprehensive guarantees and transparent pricing.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guarantees.map((guarantee, index) => {
                const Icon = guarantee.icon;
                return (
                  <motion.div
                    key={guarantee.title}
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
                      {guarantee.title}
                    </h3>
                    <p className="text-gray-600">
                      {guarantee.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
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
                Customer Reviews
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What Our Customers Say About Our Pricing
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.location}</div>
                        <div className="text-sm text-blue-600 mt-1">{testimonial.service}</div>
                      </div>
                    </CardContent>
                  </Card>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Book Your AC Cleaning?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Choose your package or get a custom quote. Professional service guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/booking">
                    Book Service Now
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/contact">
                    Speak to Expert
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