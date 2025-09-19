"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Phone,
  Calendar,
  MapPin,
  Minimize2,
  Maximize2,
  ThumbsUp,
  ThumbsDown,
  Copy,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actions?: Array<{
    label: string;
    action: string;
    link?: string;
  }>;
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m Pro Clean AC\'s AI assistant. How can I help you today? I can assist with service bookings, pricing information, scheduling, and answer questions about our AC cleaning services.',
      timestamp: new Date(),
      suggestions: [
        'Book AC cleaning service',
        'Check service prices',
        'Schedule an appointment',
        'Service area coverage'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();

    // Service booking inquiries
    if (message.includes('book') || message.includes('appointment') || message.includes('schedule')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'I\'d be happy to help you book an AC cleaning service! We offer three main services: Duct Cleaning, Sanitization, and Complete AC Maintenance. Our booking system will guide you through selecting the right service for your needs.',
        timestamp: new Date(),
        actions: [
          { label: 'Start Booking', action: 'book', link: '/booking' },
          { label: 'View Services', action: 'services', link: '/services' }
        ],
        suggestions: ['What are your prices?', 'How long does cleaning take?', 'Do you service my area?']
      };
    }

    // Pricing inquiries
    if (message.includes('price') || message.includes('cost') || message.includes('expensive') || message.includes('cheap')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Our pricing depends on the service type and property size:\n\n• **Duct Cleaning**: AED 299-799 (1-5+ units)\n• **Sanitization**: AED 199-549 (1-5+ units)\n• **AC Maintenance**: AED 249-649 (1-5+ units)\n\nAll prices include VAT and come with a 30-day service warranty. Would you like a personalized quote?',
        timestamp: new Date(),
        actions: [
          { label: 'Get Quote', action: 'quote', link: '/booking' },
          { label: 'Call for Pricing', action: 'call', link: 'tel:+971556382341' }
        ],
        suggestions: ['What\'s included in the service?', 'Any discounts available?', 'Payment options']
      };
    }

    // Service area inquiries
    if (message.includes('area') || message.includes('location') || message.includes('dubai') || message.includes('service')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'We provide AC cleaning services throughout Dubai and the surrounding emirates:\n\n✅ **Primary Areas**: Dubai, Sharjah, Ajman\n✅ **Extended Coverage**: Abu Dhabi, RAK, Fujairah\n✅ **Emergency Service**: 24/7 across all areas\n\nOur team is British-trained and NADCA certified. Where is your property located?',
        timestamp: new Date(),
        actions: [
          { label: 'Check My Area', action: 'contact', link: '/contact' },
          { label: 'Emergency Service', action: 'emergency', link: 'tel:+971556382341' }
        ],
        suggestions: ['How quickly can you come?', 'Weekend availability?', 'Emergency service cost']
      };
    }

    // Service duration inquiries
    if (message.includes('long') || message.includes('time') || message.includes('duration') || message.includes('hours')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Service duration varies by type:\n\n🕐 **Duct Cleaning**: 2-4 hours\n🕐 **Sanitization**: 1-2 hours\n🕐 **AC Maintenance**: 2-3 hours\n\nThe actual time depends on your property size, number of units, and their condition. We\'ll provide an accurate estimate during booking.',
        timestamp: new Date(),
        suggestions: ['What equipment do you use?', 'Do I need to be present?', 'Preparation required?']
      };
    }

    // Emergency service inquiries
    if (message.includes('emergency') || message.includes('urgent') || message.includes('asap') || message.includes('today')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: '🚨 **Emergency AC Service Available 24/7**\n\nFor urgent AC issues, our emergency team can typically arrive within 2-4 hours. Emergency service includes:\n\n• Immediate diagnosis\n• Emergency repairs\n• Temporary cooling solutions\n• Priority scheduling\n\nWould you like me to connect you with our emergency team?',
        timestamp: new Date(),
        actions: [
          { label: 'Call Emergency Line', action: 'emergency', link: 'tel:+971556382341' },
          { label: 'WhatsApp Emergency', action: 'whatsapp', link: 'https://wa.me/971556382341?text=Emergency%20AC%20service%20needed!' }
        ],
        suggestions: ['What qualifies as emergency?', 'Emergency service cost?', 'Response time guarantee?']
      };
    }

    // Health and safety inquiries
    if (message.includes('health') || message.includes('safe') || message.includes('mold') || message.includes('bacteria')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'AC cleaning is crucial for health and safety! 🏥\n\n**Health Benefits:**\n• Removes mold, bacteria, and allergens\n• Improves indoor air quality\n• Reduces respiratory issues\n• Eliminates bad odors\n\n**Our Process:**\n• HEPA filtration systems\n• Antimicrobial treatments\n• Air quality testing\n• Health-safe sanitization',
        timestamp: new Date(),
        suggestions: ['NADCA certification?', 'Before/after testing?', 'Family safe products?']
      };
    }

    // Contact and support inquiries
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('speak')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Here are our contact details:\n\n📞 **Phone**: +971 55 638 2341 / +971 4 372 1198\n📧 **Email**: info@proclean-ac.com\n💬 **WhatsApp**: +971 55 638 2341\n🏢 **Office**: 9th Floor, The H Office, Sheikh Zayed Road, Dubai\n\n**Business Hours**: Mon-Fri 8AM-8PM, Sat-Sun 9AM-6PM\n**Emergency**: 24/7 Available',
        timestamp: new Date(),
        actions: [
          { label: 'Call Now', action: 'call', link: 'tel:+971556382341' },
          { label: 'Visit Office', action: 'location', link: '/contact' }
        ]
      };
    }

    // Default response with suggestions
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: 'I\'m here to help with any questions about Pro Clean AC services! I can assist with bookings, pricing, service information, scheduling, and more. What would you like to know?',
      timestamp: new Date(),
      suggestions: [
        'Service pricing information',
        'Book an appointment',
        'Emergency AC service',
        'Service area coverage',
        'Health benefits of cleaning',
        'Contact information'
      ]
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = generateResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleActionClick = (action: { label: string; action: string; link?: string }) => {
    if (action.link) {
      if (action.link.startsWith('tel:') || action.link.startsWith('https://wa.me/')) {
        window.open(action.link, '_blank');
      } else {
        // Internal link - could use Next.js router here
        window.open(action.link, '_blank');
      }
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>

        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">1</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Card className={`w-96 shadow-2xl transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}>
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-lg">Pro Clean AC Assistant</CardTitle>
              <div className="flex items-center gap-1 text-blue-100 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className={`max-w-[80%] ${
                      message.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="whitespace-pre-line text-sm">
                          {message.content}
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        {formatTime(message.timestamp)}
                      </div>

                      {/* Action buttons */}
                      {message.actions && (
                        <div className="mt-2 space-y-1">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleActionClick(action)}
                              className="mr-2 mb-1 text-xs"
                            >
                              {action.label}
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          ))}
                        </div>
                      )}

                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-2 space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="mr-2 mb-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about AC cleaning services..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!inputMessage.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="mt-2 text-center">
                <Badge variant="secondary" className="text-xs">
                  AI Assistant • Always Available
                </Badge>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}