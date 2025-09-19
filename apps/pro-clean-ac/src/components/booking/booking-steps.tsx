"use client";

import { CheckCircle } from "lucide-react";

interface BookingStepsProps {
  currentStep: number;
  totalSteps: number;
}

export function BookingSteps({ currentStep, totalSteps }: BookingStepsProps) {
  const steps = [
    { id: 1, name: "Service", description: "Choose your service" },
    { id: 2, name: "Property", description: "Property details" },
    { id: 3, name: "Schedule", description: "Date & time" },
    { id: 4, name: "Contact", description: "Your information" },
    { id: 5, name: "Summary", description: "Review booking" },
    { id: 6, name: "Payment", description: "Secure payment" }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                  ${currentStep > step.id
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentStep === step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                  }
                `}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>

              {/* Step Info */}
              <div className="mt-2 text-center">
                <div
                  className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </div>
                <div
                  className={`text-xs ${
                    currentStep >= step.id ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {step.description}
                </div>
              </div>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  h-0.5 w-16 mx-4 transition-all duration-200
                  ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'}
                `}
              />
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-8 w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}