"use client";

import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Shield
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    service: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    toast.success("Thank you! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      service: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Leave us a Message",
      description: "Interested in Pro Clean AC? Just leave us a message and our team will get back to you as quickly as possible.",
      actions: [
        { label: "Online Form", action: "form" },
        { label: "WhatsApp", action: "whatsapp", link: "https://wa.me/971556382341?text=Hi!%20I'd%20like%20to%20know%20more%20about%20your%20AC%20cleaning%20service." }
      ],
      image: "/images/optimized/contact-chat-29.svg"
    },
    {
      icon: Phone,
      title: "Give us a Call",
      description: "Want to speak directly with Pro Clean AC? Just pick up the phone to chat with our team directly.",
      actions: [
        { label: "+971 55 638 2341", action: "call", link: "tel:+971556382341" },
        { label: "+971 4 372 1198", action: "call", link: "tel:+97143721198" }
      ],
      image: "/images/optimized/contact-phone-30.svg"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "9:00 AM - 5:00 PM" },
    { day: "Emergency Service", hours: "24/7 Available", emergency: true }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/hero/woman-using-ac-remote-1920w.webp"
              alt="Woman using AC remote control"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/75 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left lg:max-w-3xl text-white"
            >
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                Contact Us
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Get in touch
              </h1>
              <p className="text-xl text-blue-50">
                Want to get in touch with Pro Clean AC? We&apos;d love to hear from you. Here&apos;s how you can reach us.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-10 h-10 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {method.title}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {method.description}
                    </p>
                    <div className="space-y-3">
                      {method.actions.map((action, actionIndex) => (
                        <div key={actionIndex}>
                          {action.link ? (
                            <Button
                              asChild
                              variant={action.action === "whatsapp" ? "default" : "outline"}
                              size="lg"
                              className={action.action === "whatsapp" ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                              <a href={action.link} target="_blank" rel="noopener noreferrer">
                                {action.label}
                              </a>
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="lg"
                              onClick={() => {
                                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              {action.label}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                Request A Quotation
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Fill in the form below and our team will be in touch to discuss your AC Cleaning quote.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Enter your location"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="service">Service Required</Label>
                  <Textarea
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="Describe the AC cleaning service you need"
                    rows={4}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>We don&apos;t share your data.</span>
                    <a href="/privacy-policy" className="text-blue-600 hover:underline">
                      View Privacy Policy
                    </a>
                  </div>
                  <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Submit Form
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Office Information */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How to find us
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Office Details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Pro Clean AC - Dubai Office
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Address</p>
                        <p className="text-gray-600">
                          9th Floor, The H Office,<br />
                          1 Sheikh Zayed Road, Dubai
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Phone Numbers</p>
                        <div className="space-y-1">
                          <a href="tel:+971556382341" className="block text-blue-600 hover:underline">
                            +971 55 638 2341
                          </a>
                          <a href="tel:+97143721198" className="block text-blue-600 hover:underline">
                            +971 4 372 1198
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Email</p>
                        <a href="mailto:info@proclean-ac.com" className="text-blue-600 hover:underline">
                          info@proclean-ac.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Business Hours
                  </h4>
                  <div className="space-y-3">
                    {businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className={`font-medium ${schedule.emergency ? 'text-orange-600' : 'text-gray-700'}`}>
                          {schedule.day}
                        </span>
                        <span className={`${schedule.emergency ? 'text-orange-600 font-semibold' : 'text-gray-600'}`}>
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center"
              >
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Interactive Map</p>
                  <p className="text-sm text-gray-500">
                    9th Floor, The H Office<br />
                    1 Sheikh Zayed Road, Dubai
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-4"
                  >
                    <a
                      href="https://maps.google.com/?q=9th+Floor+The+H+Office+1+Sheikh+Zayed+Road+Dubai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-16 bg-orange-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need Emergency AC Service?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Available 24/7 for urgent AC repairs and emergencies
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                  <a href="tel:+971556382341">
                    Call Emergency Line
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  <a href="https://wa.me/971556382341?text=Emergency%20AC%20service%20needed!" target="_blank" rel="noopener noreferrer">
                    WhatsApp Emergency
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}