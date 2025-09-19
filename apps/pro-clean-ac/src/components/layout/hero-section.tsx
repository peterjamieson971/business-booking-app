"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Shield,
  Clock,
  Star,
  CheckCircle,
  Snowflake,
  Wind
} from "lucide-react";
import { motion } from "framer-motion";

const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
    animate={{
      y: [-20, -100],
      x: [0, Math.random() * 50 - 25],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
    style={{
      left: `${Math.random() * 100}%`,
      bottom: "10%",
    }}
  />
);

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.3} />
        ))}

        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0EA5E9" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6"
            >
              <Badge variant="secondary" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Licensed & Insured
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                24/7 Emergency
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-current text-yellow-500" />
                5-Star Rated
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Keep Your Cool with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Professional AC Service
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Expert air conditioning repair, installation, and maintenance services.
              Fast response times, transparent pricing, and 100% satisfaction guarantee.
            </motion.p>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid sm:grid-cols-2 gap-4 mb-8 text-left"
            >
              {[
                "Same-day emergency service",
                "Upfront pricing with no hidden fees",
                "Certified HVAC technicians",
                "1-year warranty on all repairs"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <Link href="/booking">
                  Book Service Now
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 group">
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Watch How It Works
              </Button>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 text-orange-700">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Emergency? Call now:</span>
                <a href="tel:+97141234567" className="font-bold text-orange-600 hover:underline">
                  +971 4 123 4567
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
          >
            {/* Main Hero Image with Real Pro Clean AC Photos */}
            <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 shadow-2xl">
              {/* AC Cleaning Service Images Grid */}
              <div className="grid grid-cols-2 gap-4 h-96">
                {/* Duct Cleaning Image */}
                <motion.div
                  className="relative rounded-xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/optimized/hero-duct-cleaning-services-dubai-1-640w.webp"
                    alt="Professional AC Duct Cleaning Service"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-600/20" />
                  <div className="absolute bottom-2 left-2 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
                    Duct Cleaning
                  </div>
                </motion.div>

                {/* AC Cleaning Image */}
                <motion.div
                  className="relative rounded-xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/optimized/hero-ac-cleaning-services-dubai-4-640w.webp"
                    alt="Professional AC Unit Cleaning"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-green-600/20" />
                  <div className="absolute bottom-2 left-2 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
                    AC Cleaning
                  </div>
                </motion.div>

                {/* Coil Cleaning Image */}
                <motion.div
                  className="relative rounded-xl overflow-hidden shadow-lg col-span-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/optimized/hero-coil-cleaning-services-dubai-3-1024w.webp"
                    alt="Professional Coil Cleaning Service"
                    className="w-full h-24 object-cover"
                  />
                  <div className="absolute inset-0 bg-orange-600/20" />
                  <div className="absolute bottom-2 left-2 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
                    Coil Cleaning & Sanitization
                  </div>
                </motion.div>
              </div>

              {/* Floating wind effect */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-4 right-4"
              >
                <Wind className="w-8 h-8 text-blue-400/50" />
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600">Customer Satisfaction</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 }}
                className="absolute -right-4 top-1/2 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="text-2xl font-bold text-blue-600">&lt;30min</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9 }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="text-2xl font-bold text-orange-600">5,000+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}