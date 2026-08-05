"use client";

import { useState } from "react";
import { 
  Check, 
  Filter, 
  Play, 
  CheckCircle2, 
  Shield, 
  Calendar, 
  BookOpen, 
  Megaphone, 
  Users, 
  Settings, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Headphones,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  
  const [preferences, setPreferences] = useState({
    courseUpdates: true,
    assignments: true,
    certificates: true,
    learningPath: true,
    community: true,
    system: true,
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "course",
      title: "New course recommendation for you",
      desc: "We found new courses that match your role as Software Engineer.",
      time: "2 minutes ago",
      icon: Play,
      iconBg: "bg-violet-100 text-violet-600",
      unread: true,
    },
    {
      id: 2,
      type: "completed",
      title: "You completed \"React Basics Quiz\"",
      desc: "Great job! You scored 85% and completed the quiz.",
      time: "1 hour ago",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100 text-emerald-600",
      badge: { text: "Completed", color: "text-emerald-700 bg-emerald-50" },
      unread: false,
    },
    {
      id: 3,
      type: "certificate",
      title: "Certificate earned!",
      desc: "You earned a certificate for \"AWS Cloud Practitioner Essentials\".",
      time: "3 hours ago",
      icon: Shield,
      iconBg: "bg-amber-100 text-amber-500",
      badge: { text: "Certificate", color: "text-amber-600 bg-amber-50" },
      unread: false,
    },
    {
      id: 4,
      type: "reminder",
      title: "Upcoming deadline reminder",
      desc: "\"Project 1 Submission\" is due in 2 days. Don't forget to submit your assignment.",
      time: "5 hours ago",
      icon: Calendar,
      iconBg: "bg-blue-100 text-blue-500",
      badge: { text: "Reminder", color: "text-violet-600 bg-violet-50" },
      unread: false,
    },
    {
      id: 5,
      type: "learning_path",
      title: "New content in your learning path",
      desc: "2 new courses have been added to your \"Software Engineer\" learning path.",
      time: "Yesterday",
      icon: BookOpen,
      iconBg: "bg-blue-100 text-blue-500",
      badge: { text: "Learning Path", color: "text-blue-600 bg-blue-50" },
      unread: false,
    },
    {
      id: 6,
      type: "webinar",
      title: "Webinar reminder",
      desc: "Don't miss \"Career Growth in Tech\" webinar tomorrow at 7:00 PM (IST).",
      time: "Yesterday",
      icon: Megaphone,
      iconBg: "bg-pink-100 text-pink-500",
      badge: { text: "Webinar", color: "text-violet-600 bg-violet-50" },
      unread: false,
    },
    {
      id: 7,
      type: "community",
      title: "New reply in discussion",
      desc: "Sarah Lee replied to your post in \"React Learning\" discussion.",
      time: "2 days ago",
      icon: Users,
      iconBg: "bg-blue-100 text-blue-500",
      badge: { text: "Community", color: "text-blue-600 bg-blue-50" },
      unread: false,
    },
    {
      id: 8,
      type: "system",
      title: "System maintenance notice",
      desc: "Scheduled maintenance on May 20, 2026 from 01:00 AM to 03:00 AM (IST).",
      time: "3 days ago",
      icon: Settings,
      iconBg: "bg-slate-100 text-slate-500",
      badge: { text: "System", color: "text-slate-600 bg-slate-50" },
      unread: false,
    }
  ]);

  const tabs = [
    { name: "All", count: "8" },
    { name: "Unread", count: "3" },
    { name: "Courses", count: "3" },
    { name: "Certificates", count: "1" },
    { name: "System", count: "1" },
    { name: "Community", count: "0" },
  ];

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    toast.success("All notifications marked as read");
  };

  return (
    <div className="pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[26px] font-black tracking-tight text-slate-900">Notifications</h1>
          <p className="mt-1.5 text-[13px] text-slate-500 font-medium tracking-wide">Stay updated with your learning activities and important updates.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={markAllAsRead}
            className="flex h-9 items-center gap-2 rounded-lg px-3 text-[12px] font-bold text-violet-700 transition hover:bg-violet-50"
          >
            <Check className="size-4" />
            Mark all as read
          </button>
          <button className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[12px] font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
            <Filter className="size-3.5" />
            Filter
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 min-w-0">
        
        {/* Left Column - Main Content */}
        <div className="flex-1 min-w-0">
          
          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-slate-200 overflow-x-auto hide-scrollbar mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 border-b-2 pb-3 pt-1 text-[13px] font-bold transition-colors shrink-0 ${
                  activeTab === tab.name
                    ? "border-violet-600 text-violet-700"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.name}
                <span className={`grid h-5 min-w-[20px] place-items-center rounded-full px-1.5 text-[10px] ${
                  activeTab === tab.name ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-500"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="rounded-2xl bg-white shadow-sm border border-slate-200/60 overflow-hidden divide-y divide-slate-100">
            {notifications.map((item) => (
              <div key={item.id} className={`flex items-start gap-4 p-5 md:p-6 transition hover:bg-slate-50/50 ${item.unread ? 'bg-violet-50/10' : ''}`}>
                <div className={`grid size-12 shrink-0 place-items-center rounded-xl ${item.iconBg}`}>
                  <item.icon className="size-5" />
                </div>
                
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className={`text-[14px] truncate pr-4 ${item.unread ? 'font-bold text-slate-900' : 'font-semibold text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-slate-500 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                    {item.time}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 shrink-0 pt-1">
                  {item.badge && (
                    <span className={`hidden sm:inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${item.badge.color}`}>
                      {item.badge.text}
                    </span>
                  )}
                  {item.unread && (
                    <div className="size-2 rounded-full bg-violet-600" />
                  )}
                  <button className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">
                    <MoreVertical className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button className="grid size-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:bg-slate-50 hover:text-slate-600">
              <ChevronLeft className="size-4" />
            </button>
            <button className="grid size-8 place-items-center rounded-lg bg-violet-600 text-[13px] font-bold text-white shadow-sm transition hover:bg-violet-700">
              1
            </button>
            <button className="grid size-8 place-items-center rounded-lg bg-transparent text-[13px] font-bold text-slate-600 transition hover:bg-slate-100">
              2
            </button>
            <button className="grid size-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:bg-slate-50 hover:text-slate-600">
              <ChevronRight className="size-4" />
            </button>
          </div>

        </div>

        {/* Right Column - Sidebars */}
        <div className="w-full xl:w-[320px] shrink-0 space-y-6">
          
          {/* Notification Preferences */}
          <div className="rounded-2xl bg-white p-5 md:p-7 shadow-sm border border-slate-200/60">
            <div className="mb-6">
              <h2 className="text-[16px] font-bold text-slate-900 tracking-tight">Notification Preferences</h2>
              <p className="text-[12px] font-medium text-slate-500 mt-1">Choose what you want to be notified about.</p>
            </div>

            <div className="space-y-6">
              {[
                { id: "courseUpdates", title: "Course Updates", desc: "New courses, content updates", icon: BookOpen, color: "text-violet-600 bg-violet-50" },
                { id: "assignments", title: "Assignments & Deadlines", desc: "Due dates, submissions, reminders", icon: Calendar, color: "text-blue-500 bg-blue-50" },
                { id: "certificates", title: "Certificates & Achievements", desc: "Certificate earned, achievements", icon: Shield, color: "text-amber-500 bg-amber-50" },
                { id: "learningPath", title: "Learning Path Updates", desc: "Progress updates, new content", icon: Play, color: "text-teal-600 bg-teal-50" },
                { id: "community", title: "Community Activity", desc: "Replies, likes, mentions", icon: Users, color: "text-indigo-500 bg-indigo-50" },
                { id: "system", title: "System Updates", desc: "Maintenance, new features", icon: Settings, color: "text-slate-500 bg-slate-50" },
              ].map((pref) => (
                <div key={pref.id} className="flex items-start gap-4">
                  <div className={`grid size-9 shrink-0 place-items-center rounded-lg ${pref.color}`}>
                    <pref.icon className="size-4" />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-[13px] font-bold text-slate-900">{pref.title}</p>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">{pref.desc}</p>
                  </div>
                  <button 
                    onClick={() => handleToggle(pref.id as keyof typeof preferences)}
                    className={`relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${preferences[pref.id as keyof typeof preferences] ? 'bg-violet-600' : 'bg-slate-200'}`}
                  >
                    <span className={`pointer-events-none inline-block size-[14px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${preferences[pref.id as keyof typeof preferences] ? 'translate-x-[16px]' : 'translate-x-[2px]'}`} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/settings/notifications" className="inline-flex items-center gap-1.5 text-[12px] font-bold text-violet-700 transition hover:text-violet-800">
                Manage Preferences <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Need Help Card */}
          <div className="rounded-2xl bg-white p-5 md:p-7 shadow-sm border border-slate-200/60 relative overflow-hidden">
            <h2 className="text-[16px] font-bold text-slate-900 tracking-tight">Need Help?</h2>
            <p className="text-[12px] font-medium text-slate-500 mt-1 max-w-[180px] leading-relaxed">
              Visit our Help Center for guides and support articles.
            </p>
            <div className="mt-6">
              <Link href="/help-support" className="inline-flex items-center gap-1.5 text-[12px] font-bold text-violet-700 transition hover:text-violet-800">
                Go to Help Center <ArrowRight className="size-3.5" />
              </Link>
            </div>
            
            <div className="absolute -right-4 bottom-4">
              <div className="relative grid size-[60px] place-items-center rounded-2xl bg-violet-100 text-violet-600 rotate-12">
                <Headphones className="size-8" />
                <div className="absolute top-0 right-0 size-3 rounded-full bg-white p-0.5 shadow-sm">
                  <div className="size-full rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="rounded-2xl bg-white p-5 md:p-7 shadow-sm border border-slate-200/60">
            <h2 className="text-[16px] font-bold text-slate-900 tracking-tight mb-4">Tips</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="size-4 text-violet-600 shrink-0 mt-0.5" />
                <p className="text-[12px] font-medium text-slate-600 leading-relaxed">Enable email notifications to stay updated outside the platform.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="size-4 text-violet-600 shrink-0 mt-0.5" />
                <p className="text-[12px] font-medium text-slate-600 leading-relaxed">You can customize your preferences anytime.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="size-4 text-violet-600 shrink-0 mt-0.5" />
                <p className="text-[12px] font-medium text-slate-600 leading-relaxed">Mark important notifications to revisit them later.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
