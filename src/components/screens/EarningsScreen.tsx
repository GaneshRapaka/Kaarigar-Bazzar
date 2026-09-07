import React, { useState } from 'react';
import { MessageSquare, TrendingUp, ShieldCheck, CheckCheck, AlertTriangle, ArrowRight, Lock } from 'lucide-react';
import { EarningsAnalytics } from './EarningsAnalytics';
import { useLanguage } from '../../services/i18n';
import { ArtisanProfile } from '../../types';
import { AuthorizationService } from '../../services/AuthorizationService';

interface EarningsScreenProps {
  profile?: ArtisanProfile;
  onWithdraw?: () => void;
  onOpenVerificationModal?: () => void;
}

export const EarningsScreen: React.FC<EarningsScreenProps> = ({
  profile,
  onWithdraw: _onWithdraw,
  onOpenVerificationModal,
}) => {
  const { t, currentLanguage } = useLanguage();
  const [reportSent, setReportSent] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const authResult = AuthorizationService.canWithdrawEarnings(profile?.kycStatus || 'NOT_VERIFIED');
  const isKycVerified = authResult.allowed;

  // Localized WhatsApp chat snippet
  const whatsAppSnippets: Record<string, { title: string; orders: string; best: string }> = {
    te: {
      title: 'వారపు వ్యాపార నివేదిక',
      orders: 'ఈ వారం: 7 ఆర్డర్లు, ₹4,280 సంపాదన.',
      best: 'ఎక్కువ అమ్ముడైనది: ఇండిగో కుషన్ కవర్లు.',
    },
    hi: {
      title: 'साप्ताहिक व्यापार रिपोर्ट',
      orders: 'इस सप्ताह: 7 ऑर्डर्स, ₹4,280 की कमाई।',
      best: 'सबसे लोकप्रिय सामान: इंडिगो कुशन कवर।',
    },
    en: {
      title: 'Weekly Business Report',
      orders: 'This week: 7 orders, ₹4,280 earned.',
      best: 'Your best seller: Indigo cushion covers.',
    },
    ta: {
      title: 'வாராந்திர வணிக அறிக்கை',
      orders: 'இந்த வாரம்: 7 ஆர்டர்கள், ₹4,280 வருமானம்.',
      best: 'அதிகம் விற்றது: இண்டிகோ குஷன் கவர்கள்.',
    },
    kn: {
      title: 'ವಾರದ ವ್ಯಾಪಾರ ವರದಿ',
      orders: 'ಈ ವಾರ: 7 ಆರ್ಡರ್‌ಗಳು, ₹4,280 ಗಳಿಕೆ.',
      best: 'ಅತಿ ಹೆಚ್ಚು ಮಾರಾಟವಾದದ್ದು: ಕುಶನ್ ಕವರ್‌ಗಳು.',
    },
    ml: {
      title: 'പ്രതിവാര ബിസിനസ്സ് റിപ്പോർട്ട്',
      orders: 'ഈ ആഴ്ച: 7 ഓർഡറുകൾ, ₹4,280 വരുമാനം.',
      best: 'കൂടുതൽ വിറ്റത്: കുഷൻ കവറുകൾ.',
    },
    mr: {
      title: 'साप्ताहिक व्यवसाय अहवाल',
      orders: 'या आठवड्यात: 7 ऑर्डर्स, ₹4,280 कमाई.',
      best: 'सर्वाधिक विक्री: कुशन कव्हर्स.',
    },
    bn: {
      title: 'সাপ্তাহিক ব্যবসা রিপোর্ট',
      orders: 'এই সপ্তাহে: 7টি অর্ডার, ₹4,280 উপার্জন।',
      best: 'সর্বাধিক বিক্রীত: কুশন কভার।',
    },
  };

  const snippet = whatsAppSnippets[currentLanguage] || whatsAppSnippets.en;

  return (
    <div className="flex-1 flex flex-col p-4 bg-artisan-bg text-artisan-text overflow-y-auto select-none space-y-4">
      {/* Lifetime Earnings Banner */}
      <div className="bg-gradient-to-br from-terracotta to-[#A04523] rounded-3xl p-5 text-white shadow-craft space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-widest uppercase opacity-85 block">
            {t('earnings.totalLifetime')}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-white/20 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3" />
            +18.4%
          </span>
        </div>
        <div className="text-3xl font-black tracking-tight">
          ₹24,680
        </div>
      </div>

      {/* Metrics 3-Item Breakdown Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* This Week */}
        <div className="bg-white p-3 rounded-2xl border border-artisan-border shadow-soft space-y-1">
          <span className="text-[10px] font-bold text-artisan-muted block leading-tight">
            {t('earnings.thisWeek')}
          </span>
          <span className="text-base font-extrabold text-artisan-text block">
            ₹4,280
          </span>
        </div>

        {/* This Month */}
        <div className="bg-white p-3 rounded-2xl border border-artisan-border shadow-soft space-y-1">
          <span className="text-[10px] font-bold text-artisan-muted block leading-tight">
            {t('earnings.thisMonth')}
          </span>
          <span className="text-base font-extrabold text-artisan-text block">
            ₹12,350
          </span>
        </div>

        {/* Pending Payout */}
        <div className="bg-white p-3 rounded-2xl border border-terracotta/30 bg-[#FFF9F6] shadow-soft space-y-1">
          <span className="text-[10px] font-bold text-terracotta block leading-tight">
            {t('earnings.pendingPayout')}
          </span>
          <span className="text-base font-extrabold text-terracotta block">
            ₹3,200
          </span>
        </div>
      </div>

      {/* Guarded Payout / Verification Status Card */}
      {isKycVerified ? (
        <div className="bg-white rounded-2xl p-3 border border-forest/30 shadow-soft flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
            <span className="text-[11px] font-semibold text-artisan-text">
              {t('earnings.bankStatus')}:{' '}
              <span className="text-forest font-bold">
                {profile?.verificationRecord?.maskedIdentifier || t('earnings.whatsappVerified')}
              </span>
            </span>
          </div>

          <button
            onClick={() => setWithdrawSuccess(true)}
            className="text-[11px] font-bold text-white bg-forest hover:bg-forest/90 px-3 py-1.5 rounded-xl shadow-sm transition active:scale-95 shrink-0"
          >
            {withdrawSuccess ? '✓ Transferred' : 'Withdraw ₹3,200'}
          </button>
        </div>
      ) : (
        <div className="bg-white border border-amber-300 rounded-2xl p-3.5 shadow-soft space-y-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-artisan-text block">
                {t('sellerVerification.statusRequired')}
              </span>
              <p className="text-[11px] text-artisan-muted leading-relaxed">
                {t('sellerVerification.payoutRestrictedNotice')}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenVerificationModal}
            className="w-full bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-craft transition flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{t('sellerVerification.verifyToWithdrawBtn')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Analytical Graph & Artisan Performance Analytics */}
      <EarningsAnalytics />

      {/* Full Sales Report on WhatsApp Section */}
      <div className="space-y-2 pt-1">
        <div className="bg-white rounded-3xl p-4 border border-artisan-border shadow-soft space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
              <MessageSquare className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-artisan-text">
                {t('earnings.fullReportTitle')}
              </h3>
              <p className="text-[11px] text-artisan-muted leading-relaxed mt-0.5">
                {t('earnings.fullReportDesc')}
              </p>
            </div>
          </div>

          {/* Simulated Localized WhatsApp Chat Bubble */}
          <div className="bg-[#EFEAE2] p-3 rounded-2xl space-y-1 border border-[#E0D9CD]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-neutral-600">
                Kaarigar Assistant
              </span>
              <span className="text-[9px] text-neutral-400">8:01 PM</span>
            </div>

            <div className="bg-white rounded-xl p-2.5 shadow-sm text-xs text-neutral-800 space-y-1 relative">
              <p className="font-bold text-[11px] text-terracotta">
                {snippet.title}
              </p>
              <p className="text-[11px] leading-relaxed">
                {snippet.orders}
              </p>
              <p className="text-[11px] text-neutral-600">
                {snippet.best}
              </p>

              <div className="flex justify-end items-center gap-1 text-[9px] text-neutral-400 pt-0.5">
                <span>8:01 PM</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />
              </div>
            </div>
          </div>

          <button
            onClick={() => setReportSent(true)}
            className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>
              {reportSent ? t('earnings.reportSentBtn') : t('earnings.sendReportBtn')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
