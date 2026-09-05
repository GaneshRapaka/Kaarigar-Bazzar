import React, { useState } from 'react';
import { User, Phone, Globe, Mic, Award, ExternalLink, ChevronRight, Check } from 'lucide-react';
import { ArtisanProfile } from '../../types';

interface ProfileScreenProps {
  profile: ArtisanProfile;
  onUpdateProfile?: (updated: Partial<ArtisanProfile>) => void;
  onViewStorefront?: () => void;
  onChangeLanguage?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  onUpdateProfile,
  onViewStorefront,
  onChangeLanguage,
}) => {
  const [voiceAssistantActive, setVoiceAssistantActive] = useState(
    profile.voiceFeedbackEnabled
  );

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-artisan-bg overflow-y-auto select-none space-y-4">
      <div className="space-y-4">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-4 border border-artisan-border shadow-soft flex items-center gap-3.5">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-terracotta/40 shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-terracotta text-white text-[10px] font-bold flex items-center justify-center border border-white">
              {profile.initial}
            </div>
          </div>

          <div>
            <h1 className="text-lg font-extrabold text-artisan-text">{profile.name}</h1>
            <p className="text-xs text-artisan-muted font-medium">
              {profile.title} from {profile.location}
            </p>
            <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Verified Telangana Master Artisan
            </span>
          </div>
        </div>

        {/* Account Preferences Section */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-artisan-text uppercase tracking-wider px-1">
            Account Preferences
          </h2>

          <div className="bg-white rounded-3xl border border-artisan-border shadow-soft divide-y divide-artisan-border/60 overflow-hidden">
            {/* 1. App Language */}
            <div className="p-3.5 flex items-center justify-between hover:bg-[#FFFDFB] transition">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-artisan-muted uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5 text-terracotta" />
                  <span>App Language / భాష</span>
                </div>
                <div className="text-xs font-bold text-artisan-text font-telugu">
                  {profile.language}
                </div>
              </div>

              <button
                onClick={onChangeLanguage}
                className="text-xs font-bold text-terracotta hover:underline px-2 py-1"
              >
                Edit
              </button>
            </div>

            {/* 2. Registered WhatsApp Number */}
            <div className="p-3.5 flex items-center justify-between hover:bg-[#FFFDFB] transition">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-artisan-muted uppercase tracking-wider">
                  <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Registered WhatsApp Number</span>
                </div>
                <div className="text-xs font-bold text-artisan-text">
                  {profile.phone}
                </div>
              </div>

              <button className="text-xs font-bold text-terracotta hover:underline px-2 py-1">
                Edit
              </button>
            </div>

            {/* 3. Kaarigar Voice Assistant */}
            <div className="p-3.5 flex items-center justify-between hover:bg-[#FFFDFB] transition">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-artisan-muted uppercase tracking-wider">
                  <Mic className="w-3.5 h-3.5 text-mustard" />
                  <span>Kaarigar Voice Assistant</span>
                </div>
                <div className="text-xs text-artisan-text font-medium">
                  Use Telugu & Hindi speech feedback
                </div>
              </div>

              {/* Toggle switch */}
              <button
                onClick={() => setVoiceAssistantActive(!voiceAssistantActive)}
                className={`w-10 h-5.5 rounded-full transition-colors relative p-0.5 ${
                  voiceAssistantActive ? 'bg-forest' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform ${
                    voiceAssistantActive ? 'translate-x-4.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 4. Craft Specialization */}
            <div className="p-3.5 flex items-center justify-between hover:bg-[#FFFDFB] transition">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-artisan-muted uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-indigo-dye" />
                  <span>Craft Specialization</span>
                </div>
                <div className="text-xs font-bold text-artisan-text">
                  {profile.craftSpecialization}
                </div>
              </div>

              <button className="text-xs font-bold text-terracotta hover:underline px-2 py-1">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Bazaar Storefront Button */}
      <div className="pt-2 pb-1">
        <button
          onClick={onViewStorefront}
          className="w-full bg-white hover:bg-neutral-50 text-artisan-text border-2 border-terracotta/40 py-3.5 px-4 rounded-2xl font-bold text-xs shadow-soft transition flex items-center justify-center gap-2 group"
        >
          <ExternalLink className="w-4 h-4 text-terracotta group-hover:scale-110 transition" />
          <span>View Bazaar Storefront</span>
        </button>
      </div>
    </div>
  );
};
