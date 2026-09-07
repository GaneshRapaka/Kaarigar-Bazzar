import React, { useState } from 'react';
import {
  Globe,
  Phone,
  Mic,
  Award,
  ExternalLink,
  Users,
  ChevronRight,
  Check,
  X,
  ShieldCheck,
} from 'lucide-react';
import { ArtisanProfile, TrustedCircleMember, SellerVerificationRecord } from '../../types';
import { useLanguage } from '../../services/i18n';
import { SUPPORTED_LANGUAGES, LanguageCode } from '../../config/languages';
import { TrustedCircleModal } from '../common/TrustedCircleModal';
import { SellerVerificationModal } from '../common/SellerVerificationModal';

interface ProfileScreenProps {
  profile: ArtisanProfile;
  trustedMembers?: TrustedCircleMember[];
  onUpdateProfile?: (updated: Partial<ArtisanProfile>) => void;
  onViewStorefront?: () => void;
  onChangeLanguage?: () => void;
  onKycVerified?: (record: SellerVerificationRecord) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  trustedMembers = [],
  onViewStorefront,
  onKycVerified,
}) => {
  const { currentLanguage, languageConfig, setLanguage, t } = useLanguage();
  const [voiceAssistantActive, setVoiceAssistantActive] = useState(
    profile.voiceFeedbackEnabled
  );
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showTrustedModal, setShowTrustedModal] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);

  const isVerified = profile.kycStatus === 'VERIFIED';
  const isPending = profile.kycStatus === 'PENDING';

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setShowLanguageModal(false);
  };

  const handleVerificationDone = (record: SellerVerificationRecord) => {
    if (onKycVerified) {
      onKycVerified(record);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-artisan-bg overflow-y-auto select-none space-y-4">
      <div className="space-y-4">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-4 border border-artisan-border shadow-soft flex items-center gap-3.5">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-artisan-border shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-terracotta text-white text-[10px] font-bold flex items-center justify-center border border-white">
              {profile.initial}
            </div>
          </div>

          <div>
            <h1 className="text-lg font-extrabold text-artisan-text">{profile.name}</h1>
            <p className="text-xs text-artisan-muted font-medium">
              {profile.title} • {profile.location}
            </p>
          </div>
        </div>

        {/* Dedicated Seller Verification Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-artisan-muted uppercase tracking-wider">
              {t('sellerVerification.sectionTitle')}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-4 border border-artisan-border shadow-soft space-y-3">
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 border ${
                  isVerified
                    ? 'bg-forest-light text-forest border-forest/30'
                    : isPending
                    ? 'bg-amber-50 text-amber-600 border-amber-200'
                    : 'bg-terracotta/10 text-terracotta border-terracotta/20'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1 flex-1">
                <span className="text-xs font-bold text-artisan-text block">
                  {isVerified
                    ? t('sellerVerification.statusVerified')
                    : isPending
                    ? t('sellerVerification.statusPending')
                    : t('sellerVerification.statusNotVerified')}
                </span>
                <p className="text-[11px] text-artisan-muted leading-relaxed">
                  {isVerified
                    ? profile.verificationRecord?.maskedIdentifier || 'Government digital credentials verified.'
                    : isPending
                    ? 'Your verification documents are under review. Typically verified within 24 hours.'
                    : t('sellerVerification.sectionSubtitle')}
                </p>
              </div>
            </div>

            <div className="pt-0.5">
              <button
                onClick={() => setShowKycModal(true)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  isVerified
                    ? 'bg-neutral-100 hover:bg-neutral-200 text-artisan-text border border-artisan-border'
                    : 'bg-terracotta hover:bg-terracotta-hover text-white shadow-craft'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {isVerified
                    ? t('sellerVerification.manageBtn')
                    : isPending
                    ? t('sellerVerification.checkStatusBtn')
                    : t('sellerVerification.verifyIdentityBtn')}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Account Preferences Section */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-artisan-muted uppercase tracking-wider px-1">
            {t('profile.preferencesTitle')}
          </h2>

          <div className="bg-white rounded-3xl border border-artisan-border shadow-soft divide-y divide-artisan-border/70 overflow-hidden">
            {/* 1. App Language */}
            <div className="p-3.5 flex items-center justify-between hover:bg-[#FFFDFB] transition">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-artisan-muted uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5 text-terracotta" />
                  <span>{t('profile.languageLabel')}</span>
                </div>
                <div className="text-xs font-bold text-artisan-text flex items-center gap-1.5">
                  <span>{languageConfig.native}</span>
                  <span className="text-artisan-muted font-normal">({languageConfig.name})</span>
                </div>
              </div>

              <button
                onClick={() => setShowLanguageModal(true)}
                className="text-xs font-bold text-terracotta hover:underline px-2.5 py-1 bg-terracotta/10 rounded-lg"
              >
                {t('common.edit')}
              </button>
            </div>

            {/* 2. Registered WhatsApp Number */}
            <div className="p-3.5 flex items-center justify-between hover:bg-[#FFFDFB] transition">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-artisan-muted uppercase tracking-wider">
                  <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>{t('profile.whatsappLabel')}</span>
                </div>
                <div className="text-xs font-bold text-artisan-text">
                  {profile.phone}
                </div>
              </div>

              <span className="text-[10px] font-bold text-forest bg-forest-light border border-forest/30 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>

            {/* 3. Kaarigar Voice Assistant */}
            <div className="p-3.5 flex items-center justify-between hover:bg-[#FFFDFB] transition">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-artisan-muted uppercase tracking-wider">
                  <Mic className="w-3.5 h-3.5 text-mustard" />
                  <span>{t('profile.voiceAssistantLabel')}</span>
                </div>
                <div className="text-xs text-artisan-muted font-medium">
                  {t('profile.voiceAssistantDesc')} ({languageConfig.native})
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

            {/* 4. Trusted Circle (Shop Helpers) */}
            <div className="p-3.5 flex items-center justify-between hover:bg-[#FFFDFB] transition">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-artisan-muted uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-terracotta" />
                  <span>{t('profile.trustedCircleLabel')}</span>
                </div>
                <div className="text-xs text-artisan-muted font-medium">
                  {t('profile.trustedCircleDesc')}
                </div>
              </div>

              <button
                onClick={() => setShowTrustedModal(true)}
                className="text-xs font-bold text-terracotta hover:underline px-2.5 py-1 bg-terracotta/10 rounded-lg flex items-center gap-0.5"
              >
                <span>View</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* 5. Craft Specialization */}
            <div className="p-3.5 flex items-center justify-between hover:bg-[#FFFDFB] transition">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-artisan-muted uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-indigo-dye" />
                  <span>{t('profile.craftSpecializationLabel')}</span>
                </div>
                <div className="text-xs font-bold text-artisan-text">
                  {profile.craftSpecialization}
                </div>
              </div>
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
          <span>{t('profile.viewStorefrontBtn')}</span>
        </button>
      </div>

      {/* In-Place Language Switcher Modal */}
      {showLanguageModal && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center p-3 animate-fadeIn">
          <div className="w-full max-h-[85vh] bg-artisan-bg rounded-3xl p-5 border border-artisan-border shadow-2xl space-y-4 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-artisan-border">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-terracotta" />
                <h3 className="text-xs font-bold text-artisan-text">
                  Change App Language
                </h3>
              </div>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="w-7 h-7 rounded-full bg-white hover:bg-neutral-100 border border-artisan-border flex items-center justify-center text-neutral-500 hover:text-artisan-text transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[50vh]">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = currentLanguage === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => handleSelectLanguage(lang.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition text-left ${
                      isSelected
                        ? 'border-terracotta bg-[#FFF8F5] ring-1 ring-terracotta/40 shadow-soft'
                        : 'border-artisan-border bg-white hover:border-terracotta/40'
                    }`}
                  >
                    <div>
                      <span className="text-sm font-bold text-artisan-text block">
                        {lang.native}
                      </span>
                      <span className="text-[11px] text-artisan-muted">{lang.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-terracotta stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Trusted Circle Modal */}
      <TrustedCircleModal
        isOpen={showTrustedModal}
        onClose={() => setShowTrustedModal(false)}
        members={trustedMembers}
        pendingOrdersCount={2}
      />

      {/* Seller Verification Modal */}
      <SellerVerificationModal
        isOpen={showKycModal}
        sellerId={profile.id || 'artisan-current'}
        onClose={() => setShowKycModal(false)}
        onVerified={handleVerificationDone}
      />
    </div>
  );
};
