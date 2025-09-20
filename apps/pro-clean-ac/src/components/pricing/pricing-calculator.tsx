"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calculator,
  Home,
  Wind,
  Shield,
  Wrench,
  Zap,
  Plus,
  Minus,
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  basePrice: number;
  unit: string;
  description: string;
  duration: string;
  popular?: boolean;
}

interface PropertyDetails {
  type: 'villa' | 'apartment' | 'office' | 'commercial';
  bedrooms: number;
  units: number;
  area: number;
}

interface CalculationResult {
  service: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  duration: string;
}

export function PricingCalculator() {
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({});
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>({
    type: 'apartment',
    bedrooms: 2,
    units: 2,
    area: 1000
  });
  const [showResults, setShowResults] = useState(false);

  const services: Service[] = [
    {
      id: 'duct-cleaning',
      name: 'Duct Cleaning',
      icon: Wind,
      basePrice: 150,
      unit: 'per room',
      description: 'Professional Rotobrush machine cleaning with HEPA filtration',
      duration: '2-4 hours',
      popular: true
    },
    {
      id: 'sanitization',
      name: 'AC Sanitization',
      icon: Shield,
      basePrice: 200,
      unit: 'per system',
      description: 'Complete antimicrobial treatment and odour removal',
      duration: '1-2 hours'
    },
    {
      id: 'coil-cleaning',
      name: 'Coil Cleaning',
      icon: Wrench,
      basePrice: 300,
      unit: 'per unit',
      description: 'Evaporator and condenser coil deep cleaning',
      duration: '2-3 hours'
    },
    {
      id: 'ac-cleaning',
      name: 'Complete AC Cleaning',
      icon: Zap,
      basePrice: 250,
      unit: 'per unit',
      description: 'Full system cleaning with filter replacement',
      duration: '2-4 hours',
      popular: true
    }
  ];

  const propertyTypes = [
    { id: 'apartment', name: 'Apartment', multiplier: 1.0 },
    { id: 'villa', name: 'Villa', multiplier: 1.2 },
    { id: 'office', name: 'Office', multiplier: 1.1 },
    { id: 'commercial', name: 'Commercial', multiplier: 1.3 }
  ];

  const getPropertyMultiplier = () => {
    return propertyTypes.find(pt => pt.id === propertyDetails.type)?.multiplier || 1.0;
  };

  const calculateServicePrice = (service: Service, quantity: number): number => {
    const basePrice = service.basePrice * quantity;
    const propertyMultiplier = getPropertyMultiplier();

    // Add complexity multiplier based on property size
    const sizeMultiplier = propertyDetails.area > 2000 ? 1.15 :
                          propertyDetails.area > 1500 ? 1.1 :
                          propertyDetails.area > 1000 ? 1.05 : 1.0;

    return Math.round(basePrice * propertyMultiplier * sizeMultiplier);
  };

  const updateServiceQuantity = (serviceId: string, change: number) => {
    setSelectedServices(prev => {
      const current = prev[serviceId] || 0;
      const newValue = Math.max(0, current + change);

      if (newValue === 0) {
        const { [serviceId]: _removed, ...rest } = prev;
        return rest;
      }

      return { ...prev, [serviceId]: newValue };
    });
  };

  const getCalculationResults = (): CalculationResult[] => {
    return Object.entries(selectedServices).map(([serviceId, quantity]) => {
      const service = services.find(s => s.id === serviceId)!;
      const unitPrice = calculateServicePrice(service, 1);
      const subtotal = calculateServicePrice(service, quantity);

      return {
        service: service.name,
        quantity,
        unitPrice,
        subtotal,
        duration: service.duration
      };
    });
  };

  const getTotalPrice = (): number => {
    return getCalculationResults().reduce((sum, result) => sum + result.subtotal, 0);
  };

  const getTotalDuration = (): string => {
    const results = getCalculationResults();
    if (results.length === 0) return '0 hours';

    const maxHours = Math.max(...results.map(r => {
      const hours = r.duration.match(/(\d+)-?(\d+)?/);
      return hours ? parseInt(hours[2] || hours[1]) : 2;
    }));

    return `${Math.max(2, maxHours)} hours`;
  };

  const getVAT = (): number => {
    return Math.round(getTotalPrice() * 0.05);
  };

  const getFinalTotal = (): number => {
    return getTotalPrice() + getVAT();
  };

  const hasSelectedServices = Object.keys(selectedServices).length > 0;

  useEffect(() => {
    setShowResults(hasSelectedServices);
  }, [hasSelectedServices]);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Instant Price Calculator</h2>
            <p className="text-blue-100">Get an accurate quote for your AC cleaning services</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Property Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" />
            Property Details
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setPropertyDetails(prev => ({ ...prev, type: type.id as PropertyDetails['type'] }))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  propertyDetails.type === type.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-sm">{type.name}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPropertyDetails(prev => ({
                    ...prev,
                    bedrooms: Math.max(1, prev.bedrooms - 1)
                  }))}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{propertyDetails.bedrooms}</span>
                <button
                  onClick={() => setPropertyDetails(prev => ({
                    ...prev,
                    bedrooms: Math.min(10, prev.bedrooms + 1)
                  }))}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AC Units
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPropertyDetails(prev => ({
                    ...prev,
                    units: Math.max(1, prev.units - 1)
                  }))}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{propertyDetails.units}</span>
                <button
                  onClick={() => setPropertyDetails(prev => ({
                    ...prev,
                    units: Math.min(20, prev.units + 1)
                  }))}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area (sq ft)
              </label>
              <input
                type="number"
                value={propertyDetails.area}
                onChange={(e) => setPropertyDetails(prev => ({
                  ...prev,
                  area: Math.max(500, parseInt(e.target.value) || 1000)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="500"
                max="10000"
                step="100"
              />
            </div>
          </div>
        </div>

        {/* Service Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Select Services
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              const quantity = selectedServices[service.id] || 0;
              const unitPrice = calculateServicePrice(service, 1);

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative p-4 border-2 rounded-lg transition-all ${
                    quantity > 0
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {service.popular && (
                    <Badge className="absolute -top-2 left-4 bg-orange-500">
                      Popular
                    </Badge>
                  )}

                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      quantity > 0 ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${quantity > 0 ? 'text-blue-600' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{service.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {service.duration}
                        </span>
                        <span className="font-semibold text-blue-600">
                          AED {unitPrice} {service.unit}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateServiceQuantity(service.id, -1)}
                        disabled={quantity === 0}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{quantity}</span>
                      <button
                        onClick={() => updateServiceQuantity(service.id, 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {quantity > 0 && (
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Subtotal</div>
                        <div className="font-bold text-blue-600">
                          AED {calculateServicePrice(service, quantity)}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Your Quote Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Service Breakdown */}
                  <div className="space-y-3">
                    {getCalculationResults().map((result, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <div>
                          <div className="font-medium">{result.service}</div>
                          <div className="text-sm text-gray-600">
                            {result.quantity} × AED {result.unitPrice}
                          </div>
                        </div>
                        <div className="font-semibold">AED {result.subtotal}</div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>AED {getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>VAT (5%)</span>
                      <span>AED {getVAT()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-blue-600">
                      <span>Total</span>
                      <span>AED {getFinalTotal()}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-orange-500" />
                      <span className="font-semibold text-gray-900">Service Details</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Estimated Duration:</span><br />
                        {getTotalDuration()}
                      </div>
                      <div>
                        <span className="font-medium">Property Type:</span><br />
                        {propertyTypes.find(pt => pt.id === propertyDetails.type)?.name}
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 flex-1">
                      <Link href="/booking">
                        Book This Service
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="flex-1">
                      <Link href="/contact">
                        Get Detailed Quote
                      </Link>
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    * Prices are estimates. Final pricing may vary based on property condition and specific requirements.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Text */}
        {!hasSelectedServices && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Select Services to Get Started
            </h3>
            <p className="text-gray-600">
              Choose the services you need and we&apos;ll calculate an instant quote for you
            </p>
          </div>
        )}
      </div>
    </div>
  );
}