"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import { format, addDays, isAfter, isSameDay } from "date-fns";
import {
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Sun,
  Moon
} from "lucide-react";
import "react-day-picker/dist/style.css";

interface DateTimeSelectionProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function DateTimeSelection({ data, onNext, onBack }: DateTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    data.date ? new Date(data.date) : undefined
  );
  const [selectedTime, setSelectedTime] = useState(data.time || "");
  const [selectedPeriod, setSelectedPeriod] = useState(data.period || "");

  // Available time slots
  const timeSlots = [
    { time: "08:00", period: "morning", label: "8:00 AM", available: true },
    { time: "09:00", period: "morning", label: "9:00 AM", available: true },
    { time: "10:00", period: "morning", label: "10:00 AM", available: true },
    { time: "11:00", period: "morning", label: "11:00 AM", available: true },
    { time: "14:00", period: "afternoon", label: "2:00 PM", available: true },
    { time: "15:00", period: "afternoon", label: "3:00 PM", available: true },
    { time: "16:00", period: "afternoon", label: "4:00 PM", available: true },
    { time: "17:00", period: "afternoon", label: "5:00 PM", available: true }
  ];

  const periods = [
    {
      id: "morning",
      name: "Morning",
      icon: Sun,
      time: "8:00 AM - 12:00 PM",
      description: "Start your day with fresh air",
      slots: timeSlots.filter(slot => slot.period === "morning")
    },
    {
      id: "afternoon",
      name: "Afternoon",
      icon: Moon,
      time: "2:00 PM - 6:00 PM",
      description: "Convenient afternoon service",
      slots: timeSlots.filter(slot => slot.period === "afternoon")
    }
  ];

  // Disable past dates and limit to next 30 days
  const disabledDays = {
    before: new Date(),
    after: addDays(new Date(), 30)
  };

  const handleNext = () => {
    if (selectedDate && selectedTime && selectedPeriod) {
      onNext({
        date: selectedDate.toISOString(),
        time: selectedTime,
        period: selectedPeriod,
        formattedDate: format(selectedDate, "EEEE, MMMM d, yyyy"),
        formattedTime: timeSlots.find(slot => slot.time === selectedTime)?.label || selectedTime
      });
    }
  };

  const isFormValid = selectedDate && selectedTime && selectedPeriod;

  // Mock unavailable dates (you would fetch this from your backend)
  const unavailableDates = [
    addDays(new Date(), 3),
    addDays(new Date(), 7),
    addDays(new Date(), 14)
  ];

  const isDayUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate =>
      isSameDay(date, unavailableDate)
    );
  };

  const modifiers = {
    unavailable: unavailableDates
  };

  const modifiersStyles = {
    unavailable: {
      color: '#ef4444',
      textDecoration: 'line-through'
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
          Schedule Your Service
        </h2>
        <p className="text-gray-600">
          Choose your preferred date and time for the AC service
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Select Date
              </h3>
            </div>

            <div className="flex justify-center">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={disabledDays}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                className="!font-sans"
                classNames={{
                  day_selected: "!bg-blue-600 !text-white rounded-md",
                  day_today: "!bg-gray-100 !text-gray-900 rounded-md",
                  day: "hover:bg-gray-100 rounded-md transition-colors"
                }}
              />
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-gray-600">Selected date</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">Unavailable</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Selection */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Select Time
              </h3>
            </div>

            {!selectedDate && (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p>Please select a date first</p>
              </div>
            )}

            {selectedDate && (
              <div className="space-y-6">
                {periods.map((period) => {
                  const Icon = period.icon;
                  const isPeriodSelected = selectedPeriod === period.id;

                  return (
                    <div key={period.id} className="space-y-3">
                      <div
                        className={`
                          p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                          ${isPeriodSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                        onClick={() => {
                          setSelectedPeriod(period.id);
                          setSelectedTime(""); // Reset time when period changes
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${
                            isPeriodSelected ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                          <div>
                            <div className="font-semibold text-gray-900">
                              {period.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {period.time}
                            </div>
                            <div className="text-xs text-gray-500">
                              {period.description}
                            </div>
                          </div>
                          {isPeriodSelected && (
                            <CheckCircle className="w-5 h-5 text-blue-600 ml-auto" />
                          )}
                        </div>
                      </div>

                      {/* Time Slots */}
                      {isPeriodSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-2 gap-2 ml-8"
                        >
                          {period.slots.map((slot) => {
                            const isSlotSelected = selectedTime === slot.time;
                            const isAvailable = slot.available;

                            return (
                              <button
                                key={slot.time}
                                disabled={!isAvailable}
                                onClick={() => setSelectedTime(slot.time)}
                                className={`
                                  p-3 text-sm font-medium rounded-lg border transition-all duration-200
                                  ${isSlotSelected
                                    ? 'border-blue-500 bg-blue-500 text-white'
                                    : isAvailable
                                    ? 'border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                                    : 'border-gray-200 text-gray-400 cursor-not-allowed'
                                  }
                                `}
                              >
                                {slot.label}
                                {!isAvailable && (
                                  <div className="text-xs mt-1">Booked</div>
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-900">
                      Service Scheduled
                    </div>
                    <div className="text-green-700">
                      {format(selectedDate, "EEEE, MMMM d, yyyy")} at{" "}
                      {timeSlots.find(slot => slot.time === selectedTime)?.label}
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-600">
                  Confirmed
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Property
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue to Contact
        </Button>
      </div>
    </motion.div>
  );
}