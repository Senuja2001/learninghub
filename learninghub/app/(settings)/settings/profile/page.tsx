"use client";

import { useState } from "react";
import { Camera, ExternalLink, ChevronDown } from "lucide-react";
import { toast } from "sonner";

export default function ProfileSettingsPage() {
  const [formData, setFormData] = useState({
    fullName: "User123",
    email: "john.doe@kaishiinnovations.com",
    jobRole: "Software Engineer",
    department: "Engineering",
    phoneNumber: "+94 77 885 0895",
    location: "Piliyandala, Sri Lanka",
    bio: "Passionate about building innovative solutions and continuously learning new technologies.",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    toast.success("Profile settings saved successfully!");
  };

  return (
    <div className="max-w-[720px]">
      <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Profile Settings</h2>
            <p className="text-[12px] font-medium text-slate-500 mt-1">Update your personal information and profile details.</p>
          </div>
          <button className="hidden sm:flex shrink-0 h-8 items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3.5 text-[11px] font-bold text-violet-700 transition hover:bg-violet-100">
            View Profile <ExternalLink className="size-3" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4 shrink-0 w-full md:w-[140px]">
            <div className="relative group">
              <img 
                src="https://ui-avatars.com/api/?name=John+Doe&background=e0e7ff&color=4f46e5&rounded=true&size=128" 
                alt="Profile" 
                className="size-[100px] rounded-full object-cover shadow-sm border-[5px] border-slate-50"
              />
              <button className="absolute bottom-0 right-0 grid size-[26px] place-items-center rounded-full border-[3px] border-white bg-violet-600 text-white shadow-sm hover:bg-violet-700 transition">
                <Camera className="size-3" />
              </button>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-medium text-slate-400 leading-tight">JPG, PNG or GIF.<br/>Max size 2MB.</p>
              <button className="mt-4 w-full h-[34px] flex items-center justify-center rounded-lg border border-violet-200 bg-white px-3 text-[12px] font-bold text-violet-700 shadow-sm transition hover:bg-violet-50">
                Change Photo
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex-1 space-y-5">
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-700">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-medium text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-700">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-medium text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-50"
                />
              </div>
              <div className="space-y-1.5 relative">
                <label className="text-[12px] font-bold text-slate-700">Job Role</label>
                <div className="relative">
                  <select 
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleInputChange}
                    className="w-full h-10 appearance-none rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-medium text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-50 pr-10"
                  >
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Designer">Designer</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5 relative">
                <label className="text-[12px] font-bold text-slate-700">Department</label>
                <div className="relative">
                  <select 
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full h-10 appearance-none rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-medium text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-50 pr-10"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-700">Phone Number</label>
                <input 
                  type="text" 
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-medium text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-700">Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-medium text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-50"
                />
              </div>
            </div>
            
            <div className="space-y-1.5 pt-1">
              <label className="text-[12px] font-bold text-slate-700">Bio</label>
              <textarea 
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-[13px] font-medium text-slate-600 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-50 leading-relaxed"
              />
            </div>

            <div className="flex justify-end pt-3">
              <button 
                onClick={handleSave}
                className="flex h-10 items-center justify-center rounded-lg bg-violet-600 px-6 text-[13px] font-bold text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.98]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
