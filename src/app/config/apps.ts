import type { LucideIcon } from "lucide-react";

import {
  Chrome,
  Github,
  Mail,
  Linkedin,
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  Slack,
  MessageCircle,
  Calendar,
  Clock,
  FileText,
  Cloud,
  MapPin,
  ShoppingCart,
  CreditCard,
  Music,
  Video,
  Camera,
  BookOpen,
  Code,
  Terminal,
  Settings,
  User,
} from "lucide-react";

export type AppConfig = {
  name: string;
  icon: LucideIcon;
  url: string;
};

export const apps: AppConfig[] = [
  // --- Core ---
  { name: "Browser", icon: Chrome, url: "https://www.google.com" },
  { name: "GitHub", icon: Github, url: "https://github.com" },
  { name: "Mail", icon: Mail, url: "https://mail.google.com" },
  { name: "Profile", icon: User, url: "https://www.linkedin.com" },
  { name: "Settings", icon: Settings, url: "https://example.com" },

  // --- Social ---
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
  { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com" },

  // --- Work & Communication ---
  { name: "Slack", icon: Slack, url: "https://slack.com" },
  { name: "Chat", icon: MessageCircle, url: "https://web.whatsapp.com" },
  { name: "Calendar", icon: Calendar, url: "https://calendar.google.com" },
  { name: "Clock", icon: Clock, url: "https://time.is" },
  { name: "Docs", icon: FileText, url: "https://docs.google.com" },

  // --- Utilities ---
  { name: "Cloud", icon: Cloud, url: "https://drive.google.com" },
  { name: "Maps", icon: MapPin, url: "https://maps.google.com" },
  { name: "Shop", icon: ShoppingCart, url: "https://amazon.in" },
  { name: "Payments", icon: CreditCard, url: "https://pay.google.com" },

  // --- Media ---
  { name: "Music", icon: Music, url: "https://open.spotify.com" },
  { name: "Videos", icon: Video, url: "https://netflix.com" },
  { name: "Camera", icon: Camera, url: "https://photos.google.com" },

  // --- Developer ---
  { name: "Books", icon: BookOpen, url: "https://developer.mozilla.org" },
  { name: "Code", icon: Code, url: "https://codesandbox.io" },
  { name: "Terminal", icon: Terminal, url: "https://replit.com" },
];
