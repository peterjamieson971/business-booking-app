"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  Home,
  ArrowLeft,
  Wind,
  Sparkles,
  Wrench,
  CreditCard
} from "lucide-react";

interface BookingSummaryProps {
  bookingData: Record<string, unknown>;
  onNext: () => void;
  onBack: () => void;
}

export function BookingSummary({ bookingData, onNext, onBack }: BookingSummaryProps) {
  const serviceIcons = {
    "duct-cleaning": Wind,
    "sanitization": Sparkles,
    "maintenance": Wrench
  };

  const ServiceIcon = serviceIcons[((bookingData as Record<string, unknown>)?.serviceDetails as Record<string, unknown>)?.service as keyof typeof serviceIcons] || Wind;

  // Calculate totals
  const basePrice = (((bookingData as Record<string, unknown>)?.serviceDetails as Record<string, unknown>)?.packageDetails as Record<string, unknown>)?.price as number || 0;
  const vat = Math.round(basePrice * 0.05); // 5% VAT
  const totalPrice = basePrice + vat;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Booking Summary
        </h2>
        <p className="text-gray-600">
          Please review your booking details before proceeding to payment
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Booking Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ServiceIcon className="w-5 h-5 text-blue-600" />
                Service Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {(((bookingData as Record<string, unknown>)?.serviceDetails as Record<string, unknown>)?.serviceDetails as Record<string, unknown>)?.name as string}
                  </h3>
                  <p className="text-gray-600">
                    {(((bookingData as Record<string, unknown>)?.serviceDetails as Record<string, unknown>)?.serviceDetails as Record<string, unknown>)?.description as string}
                  </p>
                </div>
                <Badge className="bg-blue-600">
                  {(((bookingData as Record<string, unknown>)?.serviceDetails as Record<string, unknown>)?.packageDetails as Record<string, unknown>)?.name as string}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  <span>{(((bookingData as Record<string, unknown>)?.serviceDetails as Record<string, unknown>)?.packageDetails as Record<string, unknown>)?.units as string}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{(((bookingData as Record<string, unknown>)?.serviceDetails as Record<string, unknown>)?.serviceDetails as Record<string, unknown>)?.duration as string}</span>
                </div>
              </div>

              {/* Service Includes */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Service Includes:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {((((bookingData as Record<string, unknown>)?.serviceDetails as Record<string, unknown>)?.serviceDetails as Record<string, unknown>)?.includes as string[])?.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Property Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Property Type:</span>
                  <p className="text-gray-600 capitalize">{((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.propertyType as string}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Emirate:</span>
                  <p className="text-gray-600">{((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.emirate as string}</p>
                </div>
                {Boolean(((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.bedrooms) && (
                  <div>
                    <span className="font-medium text-gray-700">Bedrooms:</span>
                    <p className="text-gray-600">{((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.bedrooms as string}</p>
                  </div>
                )}
                {Boolean(((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.bathrooms) && (
                  <div>
                    <span className="font-medium text-gray-700">Bathrooms:</span>
                    <p className="text-gray-600">{((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.bathrooms as string}</p>
                  </div>
                )}
              </div>

              <div>
                <span className="font-medium text-gray-700">Address:</span>
                <p className="text-gray-600">
                  {((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.address as string}
                  {Boolean(((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.building) && `, ${((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.building as string}`}
                  {Boolean(((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.floor) && `, Floor ${((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.floor as string}`}
                  {Boolean(((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.apartment) && `, Apt ${((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.apartment as string}`}
                </p>
              </div>

              {Boolean(((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.accessInstructions) && (
                <div>
                  <span className="font-medium text-gray-700">Access Instructions:</span>
                  <p className="text-gray-600">{((bookingData as Record<string, unknown>)?.property as Record<string, unknown>)?.accessInstructions as string}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Scheduled Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-green-900">
                      {((bookingData as Record<string, unknown>)?.dateTime as Record<string, unknown>)?.formattedDate as string}
                    </div>
                    <div className="text-green-700">
                      {((bookingData as Record<string, unknown>)?.dateTime as Record<string, unknown>)?.formattedTime as string}
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-600">
                  Confirmed
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <p className="text-gray-600">
                    {((bookingData as Record<string, unknown>)?.contact as Record<string, unknown>)?.firstName as string} {((bookingData as Record<string, unknown>)?.contact as Record<string, unknown>)?.lastName as string}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <p className="text-gray-600">{((bookingData as Record<string, unknown>)?.contact as Record<string, unknown>)?.phone as string}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <p className="text-gray-600">{((bookingData as Record<string, unknown>)?.contact as Record<string, unknown>)?.email as string}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Preferred Contact:</span>
                  <p className="text-gray-600 capitalize">{((bookingData as Record<string, unknown>)?.contact as Record<string, unknown>)?.preferredContact as string}</p>
                </div>
              </div>

              {Boolean(((bookingData as Record<string, unknown>)?.contact as Record<string, unknown>)?.specialRequests) && (
                <div>
                  <span className="font-medium text-gray-700">Special Requests:</span>
                  <p className="text-gray-600">{((bookingData as Record<string, unknown>)?.contact as Record<string, unknown>)?.specialRequests as string}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Pricing Summary */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Pricing Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service</span>
                  <span className="font-medium">AED {basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (5%)</span>
                  <span className="font-medium">AED {vat}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">AED {totalPrice}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">What&apos;s Included</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Professional service guarantee</li>
                  <li>• All equipment and materials</li>
                  <li>• Post-service quality check</li>
                  <li>• 30-day service warranty</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Payment Options</h4>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>• Credit/Debit Cards</li>
                  <li>• Cash on Service</li>
                  <li>• Bank Transfer</li>
                  <li>• Digital Wallets</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Terms and Conditions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              defaultChecked
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              . I confirm that all information provided is accurate and I authorize Pro Clean AC to perform the scheduled service.
            </label>
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
          Back to Contact
        </Button>

        <Button
          onClick={onNext}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          <CreditCard className="w-4 h-4" />
          Proceed to Payment
        </Button>
      </div>
    </motion.div>
  );
}