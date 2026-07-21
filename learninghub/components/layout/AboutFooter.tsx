import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

/**
 * AboutFooter — dark navy footer matching the About Us page reference screenshot.
 * Shows LearningHub branding, contact info, and legal links.
 */
export function AboutFooter() {
  return (
    <footer className="bg-[#1a1f36] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Left: Logo + tagline */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-violet-600">
              <BookOpen className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-white leading-tight">
                LearningHub
              </div>
              <div className="text-[10.5px] text-slate-400 leading-tight">
                Powered by Kaishi Innovations
              </div>
            </div>
          </div>

          {/* Center: Contact details */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-slate-500" />
              {/* TODO: Replace with real email */}
              <span>info@kaishiinnovations.com</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-slate-500" />
              {/* TODO: Replace with real phone */}
              <span>+94 77 885 0895</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-slate-500" />
              {/* TODO: Replace with real location */}
              <span>Pitiyandala, Sri Lanka</span>
            </div>
          </div>

          {/* Right: Legal links */}
          <div className="flex items-center gap-5 text-[12px] text-slate-400">
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-10 border-t border-white/6 pt-4 text-center text-[11.5px] text-slate-500">
          © {new Date().getFullYear()} Kaishi Innovations. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
