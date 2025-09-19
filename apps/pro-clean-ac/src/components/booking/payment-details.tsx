"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCardDisplay, PaymentSecurityBadges } from "./card-animations";
import { PaymentProcessingOverlay } from "./payment-processing-overlay";
import {
  CreditCard,
  DollarSign,
  Smartphone,
  Building,
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
  Eye,
  EyeOff,
  Wifi
} from "lucide-react";

interface PaymentDetailsProps {
  bookingData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function PaymentDetails({ bookingData, onNext, onBack }: PaymentDetailsProps) {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [showCvv, setShowCvv] = useState(false);
  const [cardType, setCardType] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    saveCard: false
  });

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
      popular: true
    },
    {
      id: "cash",
      name: "Cash on Service",
      icon: DollarSign,
      description: "Pay our technician upon completion",
      popular: false
    },
    {
      id: "digital",
      name: "Digital Wallet",
      icon: Smartphone,
      description: "Apple Pay, Google Pay, Samsung Pay",
      popular: false
    },
    {
      id: "transfer",
      name: "Bank Transfer",
      icon: Building,
      description: "Direct bank transfer",
      popular: false
    }
  ];

  const processingSteps = [
    "Validating card details...",
    "Contacting payment gateway...",
    "Processing payment...",
    "Confirming transaction...",
    "Payment successful!"
  ];

  // Calculate totals
  const basePrice = bookingData.serviceDetails?.packageDetails?.price || 0;
  const vat = Math.round(basePrice * 0.05); // 5% VAT
  const totalPrice = basePrice + vat;

  // Card type detection
  const detectCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';
    return '';
  };

  // Real-time validation
  const validateField = (field: string, value: string) => {
    const errors: Record<string, string> = {};

    switch (field) {
      case 'cardNumber':
        const cleaned = value.replace(/\s/g, '');
        if (cleaned.length < 15) {
          errors.cardNumber = 'Card number must be at least 15 digits';
        }
        break;
      case 'expiryMonth':
      case 'expiryYear':
        if (!value) {
          errors[field] = 'Required';
        }
        break;
      case 'cvv':
        if (value.length < 3) {
          errors.cvv = 'CVV must be at least 3 digits';
        }
        break;
      case 'cardholderName':
        if (!value.trim()) {
          errors.cardholderName = 'Cardholder name is required';
        }
        break;
    }

    setValidationErrors(prev => ({
      ...prev,
      ...errors
    }));
  };

  useEffect(() => {
    const type = detectCardType(formData.cardNumber);
    setCardType(type);
  }, [formData.cardNumber]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (typeof value === 'string' && field !== 'billingAddress') {
      validateField(field, value);
    }

    // Clear error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    handleInputChange('cardNumber', formatted);
  };

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    setProcessingStep(0);

    // Simulate realistic payment processing with steps
    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingStep(i);
      await new Promise(resolve => setTimeout(resolve, i === processingSteps.length - 1 ? 1000 : 800));
    }

    setIsProcessing(false);
    onNext({
      method: selectedMethod,
      amount: totalPrice,
      transactionId: `TXN${Date.now()}`,
      status: "completed",
      cardType: cardType,
      ...(selectedMethod === "card" && {
        ...formData,
        cardNumber: `****-****-****-${formData.cardNumber.slice(-4)}`
      })
    });
  };

  const isCardFormValid = selectedMethod !== "card" || (
    formData.cardNumber.replace(/\s/g, '').length >= 15 &&
    formData.expiryMonth &&
    formData.expiryYear &&
    formData.cvv.length >= 3 &&
    formData.cardholderName.trim()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Details
        </h2>
        <p className="text-gray-600">
          Secure payment processing for your AC service booking
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Choose Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedMethod === method.id;

                return (
                  <div
                    key={method.id}
                    className={`
                      p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                      ${isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${
                          isSelected ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{method.name}</span>
                            {method.popular && (
                              <Badge className="bg-green-600 text-xs">Popular</Badge>
                            )}
                          </div>
                          <div className={`text-sm ${
                            isSelected ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {method.description}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Credit Card Preview */}
          {selectedMethod === "card" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center mb-6"
            >
              <CreditCardDisplay
                cardNumber={formData.cardNumber}
                cardholderName={formData.cardholderName}
                expiryMonth={formData.expiryMonth}
                expiryYear={formData.expiryYear}
                cardType={cardType}
                isActive={formData.cardNumber.length > 0}
              />
            </motion.div>
          )}

          {/* Payment Form */}
          {selectedMethod === "card" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Card Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        className={`mt-1 pr-16 ${
                          validationErrors.cardNumber ? 'border-red-500' : ''
                        }`}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                        {cardType && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center"
                          >
                            <div className={`w-6 h-4 rounded text-xs font-bold text-white flex items-center justify-center ${
                              cardType === 'visa' ? 'bg-blue-600' :
                              cardType === 'mastercard' ? 'bg-red-600' :
                              cardType === 'amex' ? 'bg-green-600' :
                              'bg-gray-600'
                            }`}>
                              {cardType.slice(0, 2).toUpperCase()}
                            </div>
                          </motion.div>
                        )}
                        <Lock className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    {validationErrors.cardNumber && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        {validationErrors.cardNumber}
                      </motion.p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="expiryMonth">Month</Label>
                      <select
                        id="expiryMonth"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.expiryMonth}
                        onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                      >
                        <option value="">MM</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                          <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="expiryYear">Year</Label>
                      <select
                        id="expiryYear"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.expiryYear}
                        onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                      >
                        <option value="">YYYY</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <div className="relative">
                        <Input
                          id="cvv"
                          placeholder="123"
                          type={showCvv ? "text" : "password"}
                          maxLength={4}
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                          className={`mt-1 pr-10 ${
                            validationErrors.cvv ? 'border-red-500' : ''
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCvv(!showCvv)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {validationErrors.cvv && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1"
                        >
                          {validationErrors.cvv}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      placeholder="John Doe"
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                      className={`mt-1 ${
                        validationErrors.cardholderName ? 'border-red-500' : ''
                      }`}
                    />
                    {validationErrors.cardholderName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        {validationErrors.cardholderName}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="billingAddress">Billing Address</Label>
                    <Input
                      id="billingAddress"
                      placeholder="Same as property address"
                      value={formData.billingAddress}
                      onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="saveCard"
                      checked={formData.saveCard}
                      onChange={(e) => handleInputChange('saveCard', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Label htmlFor="saveCard" className="text-sm">
                      Save this card for future bookings
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Alternative Payment Methods Info */}
          {selectedMethod === "cash" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">
                        Cash Payment Instructions
                      </h3>
                      <ul className="space-y-1 text-green-800 text-sm">
                        <li>• Payment is due upon completion of service</li>
                        <li>• Our technician will provide a receipt</li>
                        <li>• Exact change is appreciated</li>
                        <li>• Service guarantee still applies</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedMethod === "transfer" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Building className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">
                        Bank Transfer Details
                      </h3>
                      <div className="space-y-2 text-blue-800 text-sm">
                        <div><strong>Bank:</strong> Emirates NBD</div>
                        <div><strong>Account:</strong> Pro Clean AC Services LLC</div>
                        <div><strong>IBAN:</strong> AE070260001015555555555</div>
                        <div><strong>Swift:</strong> EBILAEAD</div>
                        <div className="mt-3 text-xs">
                          Please include your booking reference in the transfer description
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-900">
                    {bookingData.serviceDetails?.serviceDetails?.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {bookingData.serviceDetails?.packageDetails?.name}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Price</span>
                    <span>AED {basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">VAT (5%)</span>
                    <span>AED {vat}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-blue-600">AED {totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-gray-900">Secure Payment</span>
                  <div className="flex items-center gap-1 ml-auto">
                    <Wifi className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600 font-semibold">256-bit SSL</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
                <PaymentSecurityBadges isProcessing={isProcessing} />
              </div>

              <Button
                onClick={handleProcessPayment}
                disabled={!isCardFormValid || isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 relative overflow-hidden"
                size="lg"
              >
                <AnimatePresence mode="wait">
                  {isProcessing ? (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">{processingSteps[processingStep]}</span>
                      </div>
                      <div className="w-full bg-blue-500 rounded-full h-1 mt-1">
                        <motion.div
                          className="bg-white h-1 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${((processingStep + 1) / processingSteps.length) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="pay"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Pay AED {totalPrice}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              <p className="text-xs text-center text-gray-500">
                By clicking "Pay" you agree to our terms and authorize the payment
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
          disabled={isProcessing}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Summary
        </Button>
      </div>

      {/* Payment Processing Overlay */}
      <PaymentProcessingOverlay
        isVisible={isProcessing}
        currentStep={processingStep}
        steps={processingSteps}
        amount={totalPrice}
      />
    </motion.div>
  );
}