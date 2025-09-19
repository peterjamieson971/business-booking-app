"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Download,
  Share2,
  Home,
  CreditCard,
  MessageCircle
} from "lucide-react";
import Link from "next/link";

interface BookingConfirmationProps {
  bookingData: Record<string, unknown>;
}

export function BookingConfirmation({ bookingData }: BookingConfirmationProps) {
  const bookingReference = `PCA${Date.now().toString().slice(-6)}`;

  // Calculate totals
  const basePrice = (((bookingData as Record<string, unknown>)?.serviceDetails as Record<string, unknown>)?.packageDetails as Record<string, unknown>)?.price as number || 0;
  const vat = Math.round(basePrice * 0.05);
  const totalPrice = basePrice + vat;

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log("Downloading receipt...");
  };

  const handleShareBooking = () => {
    // In a real app, this would open share options
    if (navigator.share) {
      navigator.share({
        title: 'Pro Clean AC Booking Confirmation',
        text: `My AC service is booked for ${((bookingData as Record<string, unknown>)?.dateTime as Record<string, unknown>)?.formattedDate || 'soon'}`,
        url: window.location.href
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
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Booking Confirmed!
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Your AC service has been successfully scheduled
        </p>
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full">
          <span className="font-semibold">Booking Reference:</span>
          <span className="font-mono">{bookingReference}</span>
        </div>
      </motion.div>

      {/* Booking Details */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Service & Schedule */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Service Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-blue-900">
                    {((bookingData as Record<string, unknown>)?.dateTime as Record<string, unknown>)?.formattedDate || 'Date TBD'}
                  </div>
                  <Badge className="bg-blue-600">
                    Confirmed
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-blue-700">
                  <Clock className="w-4 h-4" />
                  <span>{bookingData.dateTime?.formattedTime}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Service Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{bookingData.serviceDetails?.serviceDetails?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package:</span>
                    <span className="font-medium">{bookingData.serviceDetails?.packageDetails?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{bookingData.serviceDetails?.serviceDetails?.duration}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Service Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium text-gray-900">
                  {bookingData.property?.address}
                </div>
                {bookingData.property?.building && (
                  <div className="text-gray-600">
                    {bookingData.property.building}
                    {bookingData.property?.floor && `, Floor ${bookingData.property.floor}`}
                    {bookingData.property?.apartment && `, Apt ${bookingData.property.apartment}`}
                  </div>
                )}
                <div className="text-gray-600">
                  {bookingData.property?.emirate}, UAE
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact & Payment */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-500" />
                <span>{bookingData.contact?.firstName} {bookingData.contact?.lastName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{bookingData.contact?.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{bookingData.contact?.email}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Service</span>
                <span>AED {basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT (5%)</span>
                <span>AED {vat}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total Paid</span>
                  <span className="text-green-600">AED {totalPrice}</span>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-800 font-medium">Payment Confirmed</span>
                </div>
                {bookingData.payment?.transactionId && (
                  <div className="text-sm text-green-700 mt-1">
                    Transaction ID: {bookingData.payment.transactionId}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* What Happens Next */}
      <Card>
        <CardHeader>
          <CardTitle>What Happens Next</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Confirmation</h4>
              <p className="text-sm text-gray-600">
                You&apos;ll receive a confirmation email and SMS with all booking details
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Day Before</h4>
              <p className="text-sm text-gray-600">
                Our team will call to confirm the appointment and arrival time
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Service Day</h4>
              <p className="text-sm text-gray-600">
                Professional technicians will arrive on time with all equipment
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-4">Need to Contact Us?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Emergency Contact</h4>
              <div className="space-y-1 text-blue-700">
                <div>Phone: +971 55 638 2341</div>
                <div>WhatsApp: +971 55 638 2341</div>
                <div>Available: 24/7</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">General Inquiries</h4>
              <div className="space-y-1 text-blue-700">
                <div>Email: info@proclean-ac.com</div>
                <div>Phone: +971 4 372 1198</div>
                <div>Hours: 8 AM - 8 PM</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleDownloadReceipt}
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Receipt
        </Button>

        <Button
          onClick={handleShareBooking}
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share Booking
        </Button>

        <Button
          asChild
          size="lg"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Link>
        </Button>
      </div>

      {/* Rating Request */}
      <Card className="text-center">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-2">
            Help Us Improve
          </h3>
          <p className="text-gray-600 mb-4">
            After your service, we&apos;d love to hear about your experience
          </p>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="w-8 h-8 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                ★
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}