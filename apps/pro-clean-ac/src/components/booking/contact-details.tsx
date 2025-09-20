"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  ArrowLeft,
  MessageCircle,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface ContactDetailsProps {
  data: Record<string, unknown>;
  onNext: (data: Record<string, unknown>) => void;
  onBack: () => void;
}

export function ContactDetails({ data, onNext, onBack }: ContactDetailsProps) {
  const [formData, setFormData] = useState({
    firstName: (data.firstName as string) || "",
    lastName: (data.lastName as string) || "",
    email: (data.email as string) || "",
    phone: (data.phone as string) || "",
    alternatePhone: (data.alternatePhone as string) || "",
    preferredContact: (data.preferredContact as string) || "phone",
    specialRequests: (data.specialRequests as string) || "",
    hearAboutUs: (data.hearAboutUs as string) || ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const contactMethods = [
    {
      id: "phone",
      name: "Phone Call",
      icon: Phone,
      description: "We'll call you on your primary number"
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: MessageCircle,
      description: "Receive updates via WhatsApp"
    },
    {
      id: "email",
      name: "Email",
      icon: Mail,
      description: "Email notifications and confirmations"
    }
  ];

  const hearAboutOptions = [
    "Google Search",
    "Social Media",
    "Friend/Family Referral",
    "Previous Customer",
    "Website Advertisement",
    "Real Estate Agent",
    "Building Management",
    "Other"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(formData);
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
          Contact Information
        </h2>
        <p className="text-gray-600">
          We&apos;ll use this information to confirm your booking and provide updates
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Contact Details
            </h3>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Primary Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+971 50 123 4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="alternatePhone">Alternate Phone (Optional)</Label>
                <Input
                  id="alternatePhone"
                  type="tel"
                  placeholder="+971 4 123 4567"
                  value={formData.alternatePhone}
                  onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Preferred Contact Method
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                const isSelected = formData.preferredContact === method.id;

                return (
                  <div
                    key={method.id}
                    className={`
                      p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                      ${isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                    onClick={() => handleInputChange('preferredContact', method.id)}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${
                      isSelected ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                    <div className="text-center">
                      <div className="font-semibold">{method.name}</div>
                      <div className={`text-xs mt-1 ${
                        isSelected ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {method.description}
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-blue-600 mx-auto mt-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Additional Information
            </h3>

            <div>
              <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
              <select
                id="hearAboutUs"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.hearAboutUs}
                onChange={(e) => handleInputChange('hearAboutUs', e.target.value)}
              >
                <option value="">Select an option</option>
                {hearAboutOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
              <Textarea
                id="specialRequests"
                placeholder="Any special requirements or questions about the service?"
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                className="mt-1"
                rows={4}
              />
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Privacy Notice:</strong> Your information is secure and will only be used to provide our services and communicate about your booking. We do not share your data with third parties.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Schedule
        </Button>

        <Button
          onClick={handleNext}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue to Summary
        </Button>
      </div>
    </motion.div>
  );
}