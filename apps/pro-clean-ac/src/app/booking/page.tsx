"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { BookingSteps } from "@/components/booking/booking-steps";
import { ServiceSelection } from "@/components/booking/service-selection";
import { PropertyDetails } from "@/components/booking/property-details";
import { DateTimeSelection } from "@/components/booking/date-time-selection";
import { ContactDetails } from "@/components/booking/contact-details";
import { BookingSummary } from "@/components/booking/booking-summary";
import { PaymentDetails } from "@/components/booking/payment-details";
import { BookingConfirmation } from "@/components/booking/booking-confirmation";

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: "",
    serviceDetails: {},
    property: {},
    dateTime: {},
    contact: {},
    payment: {}
  });

  const totalSteps = 7;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBookingData = (step: string, data: any) => {
    setBookingData(prev => ({
      ...prev,
      [step]: data
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            data={bookingData.serviceDetails}
            onNext={(data) => {
              updateBookingData('serviceDetails', data);
              nextStep();
            }}
          />
        );
      case 2:
        return (
          <PropertyDetails
            data={bookingData.property}
            onNext={(data) => {
              updateBookingData('property', data);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <DateTimeSelection
            data={bookingData.dateTime}
            onNext={(data) => {
              updateBookingData('dateTime', data);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <ContactDetails
            data={bookingData.contact}
            onNext={(data) => {
              updateBookingData('contact', data);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <BookingSummary
            bookingData={bookingData}
            onNext={() => nextStep()}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <PaymentDetails
            bookingData={bookingData}
            onNext={(data) => {
              updateBookingData('payment', data);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 7:
        return (
          <BookingConfirmation
            bookingData={bookingData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Book Your AC Service
            </h1>
            <p className="text-lg text-gray-600">
              Professional AC cleaning and maintenance in Dubai
            </p>
          </div>

          {/* Progress Steps */}
          {currentStep <= 6 && (
            <BookingSteps
              currentStep={currentStep}
              totalSteps={6}
            />
          )}

          {/* Step Content */}
          <div className="mt-8">
            {renderStep()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}