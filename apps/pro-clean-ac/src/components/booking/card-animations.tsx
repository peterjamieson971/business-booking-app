"use client";

import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

interface CreditCardDisplayProps {
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  cardType: string;
  isActive?: boolean;
}

export function CreditCardDisplay({
  cardNumber,
  cardholderName,
  expiryMonth,
  expiryYear,
  cardType,
  isActive = false
}: CreditCardDisplayProps) {
  const displayNumber = cardNumber || "•••• •••• •••• ••••";
  const displayName = cardholderName || "YOUR NAME";
  const displayExpiry = (expiryMonth && expiryYear) ? `${expiryMonth}/${expiryYear}` : "••/••";

  const getCardGradient = (type: string) => {
    switch (type) {
      case 'visa':
        return 'from-blue-600 to-blue-800';
      case 'mastercard':
        return 'from-red-600 to-red-800';
      case 'amex':
        return 'from-green-600 to-green-800';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  const getCardLogo = (type: string) => {
    switch (type) {
      case 'visa':
        return (
          <div className="text-white font-bold text-lg tracking-wider">
            VISA
          </div>
        );
      case 'mastercard':
        return (
          <div className="flex gap-1">
            <div className="w-8 h-8 bg-red-500 rounded-full opacity-80" />
            <div className="w-8 h-8 bg-yellow-500 rounded-full opacity-80 -ml-4" />
          </div>
        );
      case 'amex':
        return (
          <div className="text-white font-bold text-sm tracking-wider">
            AMERICAN<br />EXPRESS
          </div>
        );
      default:
        return <CreditCard className="w-8 h-8 text-white opacity-50" />;
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{
        scale: isActive ? 1.02 : 1,
        opacity: 1,
        rotateY: isActive ? 5 : 0
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className={`relative w-full max-w-sm h-56 rounded-2xl p-6 text-white shadow-2xl bg-gradient-to-br ${getCardGradient(cardType)}`}
      style={{
        perspective: "1000px"
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 rounded-2xl opacity-10">
        <div className="absolute top-4 right-4 w-16 h-16 border border-white rounded-full" />
        <div className="absolute top-8 right-8 w-8 h-8 border border-white rounded-full" />
        <div className="absolute bottom-4 left-4 w-20 h-20 border border-white rounded-full" />
      </div>

      {/* Card Logo */}
      <div className="absolute top-6 right-6">
        {getCardLogo(cardType)}
      </div>

      {/* Chip */}
      <div className="mt-8 mb-6">
        <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md border border-yellow-500 relative">
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm" />
          <div className="absolute inset-2 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-sm grid grid-cols-3 gap-px">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-yellow-300 rounded-sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Card Number */}
      <motion.div
        key={displayNumber}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-mono tracking-wider mb-6"
      >
        {displayNumber}
      </motion.div>

      {/* Card Details */}
      <div className="flex justify-between items-end">
        <div>
          <div className="text-xs opacity-70 uppercase tracking-wide mb-1">
            Card Holder
          </div>
          <motion.div
            key={displayName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold tracking-wide uppercase"
          >
            {displayName}
          </motion.div>
        </div>
        <div className="text-right">
          <div className="text-xs opacity-70 uppercase tracking-wide mb-1">
            Expires
          </div>
          <motion.div
            key={displayExpiry}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-mono tracking-wider"
          >
            {displayExpiry}
          </motion.div>
        </div>
      </div>

      {/* Security Pattern */}
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>
    </motion.div>
  );
}

interface PaymentSecurityBadgesProps {
  isProcessing?: boolean;
}

export function PaymentSecurityBadges({ isProcessing = false }: PaymentSecurityBadgesProps) {
  const badges = [
    { name: "256-bit SSL", color: "green" },
    { name: "PCI DSS", color: "blue" },
    { name: "Verified", color: "purple" }
  ];

  return (
    <div className="flex items-center gap-2">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`
            px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1
            ${badge.color === 'green' ? 'bg-green-100 text-green-800' :
              badge.color === 'blue' ? 'bg-blue-100 text-blue-800' :
              'bg-purple-100 text-purple-800'
            }
            ${isProcessing ? 'animate-pulse' : ''}
          `}
        >
          <div className={`w-2 h-2 rounded-full ${
            badge.color === 'green' ? 'bg-green-500' :
            badge.color === 'blue' ? 'bg-blue-500' :
            'bg-purple-500'
          }`} />
          {badge.name}
        </motion.div>
      ))}
    </div>
  );
}