import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

/* ── Social icon SVGs ────────────────────────────────────────────────────────── */
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const socialLinks = [
  { name: "Facebook", handle: "@kaishiinnovations", icon: FacebookIcon, color: "text-[#1877F2]" },
  { name: "LinkedIn", handle: "Kaishi Innovations", icon: LinkedinIcon, color: "text-[#0A66C2]" },
  { name: "YouTube", handle: "@kaishiinnovations", icon: YoutubeIcon, color: "text-[#FF0000]" },
  { name: "GitHub", handle: "kaishiinnovations", icon: GithubIcon, color: "text-slate-800" },
  { name: "Instagram", handle: "@kaishi.innovations", icon: InstagramIcon, color: "text-[#E4405F]" },
];

/**
 * AboutFooter — dark navy footer matching the reference screenshots.
 * Shows a "Connect With Us" social band, then the LearningHub branding row.
 */
export function AboutFooter() {
  return (
    <footer className="bg-[#1a1f36]">
      {/* ── Connect With Us Band ─────────────────────────────────────────── */}
      <div className="border-b border-white/8 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            {/* Left: heading */}
            <div className="shrink-0 lg:w-52">
              <p className="text-[14px] font-bold text-white">Connect With Us</p>
              <p className="mt-1 text-[11.5px] leading-[1.65] text-slate-400">
                Follow us on our social media platforms to stay updated with our latest news,
                projects, and insights.
              </p>
            </div>

            {/* Right: social cards */}
            <div className="flex flex-wrap gap-3 lg:flex-1 lg:justify-end">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href="#"
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 transition-all hover:bg-white/10 hover:-translate-y-0.5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <Icon className={`h-4 w-4 ${social.color}`} />
                    </div>
                    <div>
                      <div className="text-[12.5px] font-bold text-white">{social.name}</div>
                      <div className="text-[10px] text-slate-400">{social.handle}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row ──────────────────────────────────────────────────────── */}
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Logo + tagline */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-violet-600">
                <BookOpen className="h-4.5 w-4.5 text-white" />
              </div>
              <div>
                <div className="text-[15px] font-bold text-white leading-tight">LearningHub</div>
                <div className="text-[10.5px] text-slate-400 leading-tight">
                  Powered by Kaishi Innovations
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11.5px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-500" />
                <span>info@kaishiinnovations.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-500" />
                <span>+94 77 885 0895</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-500" />
                <span>Piliyandala, Sri Lanka</span>
              </div>
            </div>

            {/* Legal links */}
            <div className="flex items-center gap-4 text-[11.5px] text-slate-400">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-5 border-t border-white/6 pt-4 text-center text-[11px] text-slate-500">
            © {new Date().getFullYear()} Learning Hub. Powered by Kaishi Innovations. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
