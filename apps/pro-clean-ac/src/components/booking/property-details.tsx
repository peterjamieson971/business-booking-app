"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Home,
  Building,
  MapPin,
  Users,
  ArrowLeft
} from "lucide-react";

interface PropertyDetailsProps {
  data: Record<string, unknown>;
  onNext: (data: Record<string, unknown>) => void;
  onBack: () => void;
}

export function PropertyDetails({ data, onNext, onBack }: PropertyDetailsProps) {
  const [formData, setFormData] = useState({
    propertyType: data.propertyType || "",
    bedrooms: data.bedrooms || "",
    bathrooms: data.bathrooms || "",
    squareFootage: data.squareFootage || "",
    address: data.address || "",
    emirate: data.emirate || "",
    building: data.building || "",
    floor: data.floor || "",
    apartment: data.apartment || "",
    specialInstructions: data.specialInstructions || "",
    accessInstructions: data.accessInstructions || ""
  });

  const propertyTypes = [
    {
      id: "apartment",
      name: "Apartment",
      icon: Building,
      description: "High-rise or low-rise apartment"
    },
    {
      id: "villa",
      name: "Villa",
      icon: Home,
      description: "Independent house or villa"
    },
    {
      id: "townhouse",
      name: "Townhouse",
      icon: Home,
      description: "Connected townhouse or duplex"
    },
    {
      id: "office",
      name: "Office",
      icon: Building,
      description: "Commercial office space"
    }
  ];

  const emirates = [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
    "Ras Al Khaimah",
    "Fujairah"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (formData.propertyType && formData.address && formData.emirate) {
      onNext(formData);
    }
  };

  const isFormValid = formData.propertyType && formData.address && formData.emirate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Property Details
        </h2>
        <p className="text-gray-600">
          Tell us about your property to help us prepare for the service
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Property Type Selection */}
          <div>
            <Label className="text-base font-semibold mb-4 block">
              Property Type *
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {propertyTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formData.propertyType === type.id;

                return (
                  <div
                    key={type.id}
                    className={`
                      p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                      ${isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                    onClick={() => handleInputChange('propertyType', type.id)}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${
                      isSelected ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                    <div className="text-center">
                      <div className="font-semibold">{type.name}</div>
                      <div className={`text-xs ${
                        isSelected ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {type.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Property Size */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <select
                id="bedrooms"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              >
                <option value="">Select</option>
                <option value="studio">Studio</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5+">5+ Bedrooms</option>
              </select>
            </div>

            <div>
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <select
                id="bathrooms"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              >
                <option value="">Select</option>
                <option value="1">1 Bathroom</option>
                <option value="2">2 Bathrooms</option>
                <option value="3">3 Bathrooms</option>
                <option value="4">4 Bathrooms</option>
                <option value="5+">5+ Bathrooms</option>
              </select>
            </div>

            <div>
              <Label htmlFor="squareFootage">Square Footage (Optional)</Label>
              <Input
                id="squareFootage"
                type="number"
                placeholder="e.g. 1200"
                value={formData.squareFootage}
                onChange={(e) => handleInputChange('squareFootage', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emirate">Emirate *</Label>
                <select
                  id="emirate"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.emirate}
                  onChange={(e) => handleInputChange('emirate', e.target.value)}
                >
                  <option value="">Select Emirate</option>
                  {emirates.map((emirate) => (
                    <option key={emirate} value={emirate}>{emirate}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="building">Building/Community Name</Label>
                <Input
                  id="building"
                  placeholder="e.g. Marina Heights, Downtown Boulevard"
                  value={formData.building}
                  onChange={(e) => handleInputChange('building', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                placeholder="Enter your full address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="floor">Floor Number</Label>
                <Input
                  id="floor"
                  placeholder="e.g. 15, Ground"
                  value={formData.floor}
                  onChange={(e) => handleInputChange('floor', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="apartment">Apartment/Unit Number</Label>
                <Input
                  id="apartment"
                  placeholder="e.g. 1502, A"
                  value={formData.apartment}
                  onChange={(e) => handleInputChange('apartment', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="accessInstructions">Access Instructions</Label>
              <Textarea
                id="accessInstructions"
                placeholder="How should our team access your property? (e.g. security code, parking instructions)"
                value={formData.accessInstructions}
                onChange={(e) => handleInputChange('accessInstructions', e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
              <Textarea
                id="specialInstructions"
                placeholder="Any specific requirements or concerns we should know about?"
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
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
          Back to Service
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue to Schedule
        </Button>
      </div>
    </motion.div>
  );
}