import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Shield,
  Award,
  Star
} from "lucide-react";

export function Footer() {
  const currentYear = 2025;

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 bg-gradient-to-r from-blue-600 to-blue-800 px-3 py-1 rounded-lg flex items-center">
                <img
                  src="/images/logo/pro-clean-ac-logo.png"
                  alt="Pro Clean AC Logo"
                  className="h-8 w-auto"
                />
              </div>
              <Badge variant="secondary" className="ml-2 text-xs">
                Demo
              </Badge>
            </div>

            <p className="text-gray-300 mb-6">
              Professional air conditioning services you can trust. Licensed, insured, and
              committed to keeping you comfortable year-round.
            </p>

            {/* Trust Badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">BBB Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm">5-Star Google Rating</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/maintenance" className="text-gray-300 hover:text-white transition-colors">
                  AC Maintenance
                </Link>
              </li>
              <li>
                <Link href="/services/repair" className="text-gray-300 hover:text-white transition-colors">
                  AC Repair
                </Link>
              </li>
              <li>
                <Link href="/services/installation" className="text-gray-300 hover:text-white transition-colors">
                  AC Installation
                </Link>
              </li>
              <li>
                <Link href="/services/emergency" className="text-gray-300 hover:text-white transition-colors">
                  Emergency Service
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-400 hover:text-blue-300 transition-colors">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className="text-gray-300 hover:text-white transition-colors">
                  Service Areas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Emergency Hotline</div>
                  <a href="tel:+97141234567" className="text-blue-400 hover:text-blue-300">
                    +971 4 123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Email Us</div>
                  <a href="mailto:info@procleanac.com" className="text-blue-400 hover:text-blue-300">
                    info@procleanac.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Service Area</div>
                  <div className="text-gray-300">Dubai, Sharjah & Northern Emirates</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Business Hours</div>
                  <div className="text-gray-300">
                    Mon-Fri: 7AM-7PM<br />
                    Sat-Sun: 8AM-6PM<br />
                    <span className="text-green-400 font-semibold">24/7 Emergency</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency CTA */}
            <div className="mt-6 p-4 bg-orange-600 rounded-lg">
              <div className="text-sm font-semibold mb-2">Need Emergency Service?</div>
              <Button asChild variant="secondary" size="sm" className="w-full">
                <Link href="/booking?emergency=true">
                  Book Emergency Service
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links & Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Follow us:</span>
              <div className="flex gap-3">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>

          {/* Copyright & Demo Notice */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <div className="text-gray-400 text-sm mb-4">
              © {currentYear} Pro Clean AC. All rights reserved.
            </div>
            <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-4 max-w-2xl mx-auto">
              <div className="text-blue-300 text-sm">
                <strong>Demo Website Notice:</strong> This is a demonstration website created to showcase
                AI consultancy capabilities. All services, pricing, and company information are fictional.
                <br />
                <span className="text-blue-400">
                  🤖 Built with AI by Peter Jamieson
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}