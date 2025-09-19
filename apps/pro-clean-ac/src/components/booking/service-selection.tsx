"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Wind,
  Sparkles,
  Wrench,
  CheckCircle,
  Clock,
  Users,
  Home
} from "lucide-react";

interface ServiceSelectionProps {
  data: Record<string, unknown>;
  onNext: (data: Record<string, unknown>) => void;
}

export function ServiceSelection({ data, onNext }: ServiceSelectionProps) {
  const [selectedService, setSelectedService] = useState(data.service || "");
  const [selectedPackage, setSelectedPackage] = useState(data.package || "");

  const services = [
    {
      id: "duct-cleaning",
      name: "Duct Cleaning",
      icon: Wind,
      description: "Complete air duct cleaning and sanitization",
      duration: "2-4 hours",
      includes: ["Duct inspection", "Deep cleaning", "Sanitization", "Filter replacement"],
      packages: [
        {
          id: "basic",
          name: "Basic Clean",
          price: 299,
          units: "1-2 units",
          description: "Perfect for apartments and small homes"
        },
        {
          id: "standard",
          name: "Standard Clean",
          price: 499,
          units: "3-4 units",
          description: "Ideal for medium-sized homes"
        },
        {
          id: "premium",
          name: "Premium Clean",
          price: 799,
          units: "5+ units",
          description: "Complete solution for large homes and villas"
        }
      ]
    },
    {
      id: "sanitization",
      name: "Sanitization",
      icon: Sparkles,
      description: "Professional AC system sanitization",
      duration: "1-2 hours",
      includes: ["Antimicrobial treatment", "Coil sanitization", "Filter sterilization", "Air quality testing"],
      packages: [
        {
          id: "basic",
          name: "Basic Sanitization",
          price: 199,
          units: "1-2 units",
          description: "Essential sanitization for small spaces"
        },
        {
          id: "standard",
          name: "Deep Sanitization",
          price: 349,
          units: "3-4 units",
          description: "Comprehensive sanitization treatment"
        },
        {
          id: "premium",
          name: "Complete Sanitization",
          price: 549,
          units: "5+ units",
          description: "Full-system sanitization and protection"
        }
      ]
    },
    {
      id: "maintenance",
      name: "AC Maintenance",
      icon: Wrench,
      description: "Complete AC system maintenance and tune-up",
      duration: "2-3 hours",
      includes: ["System inspection", "Performance optimization", "Filter replacement", "Coil cleaning"],
      packages: [
        {
          id: "basic",
          name: "Basic Service",
          price: 249,
          units: "1-2 units",
          description: "Essential maintenance for optimal performance"
        },
        {
          id: "standard",
          name: "Full Service",
          price: 399,
          units: "3-4 units",
          description: "Comprehensive system maintenance"
        },
        {
          id: "premium",
          name: "Premium Service",
          price: 649,
          units: "5+ units",
          description: "Complete maintenance with warranty"
        }
      ]
    }
  ];

  const selectedServiceData = services.find(s => s.id === selectedService);

  const handleNext = () => {
    if (selectedService && selectedPackage) {
      const serviceData = services.find(s => s.id === selectedService);
      const packageData = serviceData?.packages.find(p => p.id === selectedPackage);

      onNext({
        service: selectedService,
        package: selectedPackage,
        serviceDetails: serviceData,
        packageDetails: packageData
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Service
        </h2>
        <p className="text-gray-600">
          Select the AC service that best fits your needs
        </p>
      </div>

      {/* Service Selection */}
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedService === service.id;

          return (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => {
                setSelectedService(service.id);
                setSelectedPackage(""); // Reset package selection
              }}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>

                <div className="space-y-2">
                  {service.includes.map((item, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {isSelected && (
                  <div className="mt-4">
                    <CheckCircle className="w-6 h-6 text-blue-600 mx-auto" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Package Selection */}
      {selectedServiceData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Choose Your Package
            </h3>
            <p className="text-gray-600">
              Select the package size that matches your property
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {selectedServiceData.packages.map((pkg) => {
              const isSelected = selectedPackage === pkg.id;

              return (
                <Card
                  key={pkg.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-gray-900">
                        {pkg.name}
                      </h4>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Home className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{pkg.units}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-3xl font-bold text-blue-600">
                        AED {pkg.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        Starting from
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      {pkg.description}
                    </p>

                    {isSelected && (
                      <Badge className="bg-blue-600">
                        Selected
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!selectedService || !selectedPackage}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue to Property Details
        </Button>
      </div>
    </motion.div>
  );
}