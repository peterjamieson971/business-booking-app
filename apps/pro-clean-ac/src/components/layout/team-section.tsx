"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Star, Award, ShieldCheck } from "lucide-react";

export function TeamSection() {
  const teamMembers = [
    {
      name: "Jamie",
      role: "Managing Director",
      image: "/images/optimized/about-jamie-managing-director-pro-clean-ac-23-320w.webp",
      experience: "12+ years",
      specialties: ["Business Development", "Quality Control", "Customer Relations"],
      description: "Jamie leads our team with a commitment to British standards of service and customer satisfaction."
    },
    {
      name: "Christie",
      role: "HR Manager",
      image: "/images/optimized/about-christie-hr-manager-pro-clean-ac-24-320w.webp",
      experience: "8+ years",
      specialties: ["Team Management", "Training", "Operations"],
      description: "Christie ensures our team is properly trained and maintains our high service standards."
    },
    {
      name: "Jay",
      role: "Team Manager",
      image: "/images/optimized/about-jay-team-manager-pro-clean-ac-25-640w.webp",
      experience: "10+ years",
      specialties: ["Field Operations", "Technical Expertise", "Quality Assurance"],
      description: "Jay oversees our field operations and ensures every job meets our professional standards."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet the Pro Clean AC Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced team is dedicated to providing the highest quality British standard
            of service. Fully trained by British engineers and committed to excellence.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Photo */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{member.experience} Experience</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>

                  {/* Specialties */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.specialties.map((specialty, specIndex) => (
                        <span
                          key={specIndex}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src="/images/optimized/hero-pro-clean-ac-team-13-1920w.webp"
            alt="Pro Clean AC Team"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-3xl font-bold mb-2">Professional Service Team</h3>
            <p className="text-xl opacity-90 mb-4">
              Trained to British standards, committed to excellence
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">5-Star Rated</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <span className="font-semibold">Fully Insured</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Professional Standards</h4>
            <p className="text-gray-600">
              British-trained engineers with full certification and insurance coverage
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">5-Star Service</h4>
            <p className="text-gray-600">
              Consistently rated 5 stars by our customers for quality and reliability
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">NADCA Certified</h4>
            <p className="text-gray-600">
              Adhering to the highest industry standards for AC cleaning and maintenance
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}