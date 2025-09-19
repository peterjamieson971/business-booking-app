import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ChatAssistant } from "@/components/chat/chat-assistant";
import { PasswordProtection } from "@/components/auth/password-protection";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pro Clean AC - Professional Air Conditioning Services",
  description: "Professional AC repair, installation, and maintenance services. 24/7 emergency service available. Licensed & insured technicians.",
  keywords: "AC repair, air conditioning, HVAC, emergency service, installation, maintenance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-white`}
      >
        <PasswordProtection>
          {children}
          <ChatAssistant />
          <Toaster />
        </PasswordProtection>
      </body>
    </html>
  );
}
