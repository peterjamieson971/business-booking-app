"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, CreditCard, Shield, Wifi } from "lucide-react";

interface PaymentProcessingOverlayProps {
  isVisible: boolean;
  currentStep: number;
  steps: string[];
  amount: number;
}

export function PaymentProcessingOverlay({
  isVisible,
  currentStep,
  steps,
  amount
}: PaymentProcessingOverlayProps) {
  const isComplete = currentStep >= steps.length - 1;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
          >
            <div className="text-center">
              {/* Processing Animation */}
              <div className="mb-6">
                {isComplete ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"
                  />
                )}
              </div>

              {/* Status Text */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {isComplete ? "Payment Successful!" : "Processing Payment"}
                </h3>
                <p className="text-gray-600">
                  {isComplete
                    ? `AED ${amount} has been charged successfully`
                    : steps[currentStep] || "Processing your payment..."
                  }
                </p>
              </div>

              {/* Progress Steps */}
              {!isComplete && (
                <div className="space-y-3 mb-6">
                  {steps.slice(0, -1).map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: index <= currentStep ? 1 : 0.3,
                        x: 0
                      }}
                      className="flex items-center gap-3"
                    >
                      {index < currentStep ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : index === currentStep ? (
                        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                      )}
                      <span className={`text-sm ${
                        index <= currentStep ? "text-gray-900" : "text-gray-500"
                      }`}>
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Security Indicators */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Secured</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-4 h-4 text-green-600" />
                    <span>256-bit SSL</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-4 h-4 text-green-600" />
                    <span>PCI Compliant</span>
                  </div>
                </div>
              </div>

              {/* Completion Message */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-sm text-gray-600"
                >
                  A confirmation email will be sent to you shortly.
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}