import React, { useState } from 'react';
import {
  ShieldCheck,
  X,
  CreditCard,
  Award,
  FileCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { useLanguage } from '../../services/i18n';
import { KYCService } from '../../services/KYCService';
import { SellerVerificationRecord } from '../../types';

interface SellerVerificationModalProps {
  isOpen: boolean;
  sellerId: string;
  onClose: () => void;
  onVerified: (record: SellerVerificationRecord) => void;
}

export const SellerVerificationModal: React.FC<SellerVerificationModalProps> = ({
  isOpen,
  sellerId,
  onClose,
  onVerified,
}) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<'why' | 'consent' | 'verifying' | 'success'>('why');
  const [consentGranted, setConsentGranted] = useState(true);
  const [verificationRecord, setVerificationRecord] = useState<SellerVerificationRecord | null>(null);

  if (!isOpen) return null;

  const handleStartVerification = async () => {
    setStep('consent');
  };

  const handleExecuteVerification = async () => {
    setStep('verifying');
    try {
      const init = await KYCService.initiateVerification(sellerId, 'digilocker');
      const result = await KYCService.submitVerificationStep(sellerId, init.referenceId, consentGranted);
      setVerificationRecord(result);
      if (result.status === 'VERIFIED') {
        setStep('success');
        onVerified(result);
      } else {
        setStep('why');
      }
    } catch {
      setStep('why');
    }
  };

  const handleFinish = () => {
    setStep('why');
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center p-3 animate-fadeIn">
      <div className="w-full max-h-[90vh] bg-artisan-bg rounded-3xl p-5 border border-artisan-border shadow-2xl space-y-4 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-artisan-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-forest-light border border-forest/30 flex items-center justify-center text-forest">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-artisan-text">
                {t('sellerVerification.modalTitle')}
              </h3>
              <p className="text-[10px] text-artisan-muted font-medium">
                {t('sellerVerification.modalSubtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white hover:bg-neutral-100 border border-artisan-border flex items-center justify-center text-neutral-500 hover:text-artisan-text transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Why Verify? Clear Vernacular Explanation */}
        {step === 'why' && (
          <div className="space-y-3.5">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-artisan-text">
                {t('sellerVerification.whyTitle')}
              </h4>
              <p className="text-[11px] text-artisan-muted leading-relaxed">
                {t('sellerVerification.whyDesc')}
              </p>
            </div>

            {/* 3 Core Benefits */}
            <div className="space-y-2">
              {/* Benefit 1: Direct Bank Payouts */}
              <div className="bg-white p-3 rounded-2xl border border-artisan-border shadow-soft flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta shrink-0 mt-0.5">
                  <CreditCard className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-artisan-text">
                    {t('sellerVerification.benefitPayoutsTitle')}
                  </h5>
                  <p className="text-[10px] text-artisan-muted leading-relaxed">
                    {t('sellerVerification.benefitPayoutsDesc')}
                  </p>
                </div>
              </div>

              {/* Benefit 2: Verified Artisan Trust Badge */}
              <div className="bg-white p-3 rounded-2xl border border-artisan-border shadow-soft flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-artisan-text">
                    {t('sellerVerification.benefitBadgeTitle')}
                  </h5>
                  <p className="text-[10px] text-artisan-muted leading-relaxed">
                    {t('sellerVerification.benefitBadgeDesc')}
                  </p>
                </div>
              </div>

              {/* Benefit 3: Artisan Rights Protection */}
              <div className="bg-white p-3 rounded-2xl border border-artisan-border shadow-soft flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-forest-light border border-forest/30 flex items-center justify-center text-forest shrink-0 mt-0.5">
                  <FileCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-artisan-text">
                    {t('sellerVerification.benefitGovtTitle')}
                  </h5>
                  <p className="text-[10px] text-artisan-muted leading-relaxed">
                    {t('sellerVerification.benefitGovtDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Guarantee Pill */}
            <div className="bg-[#FFF9F6] border border-terracotta/20 rounded-2xl p-2.5 flex items-center gap-2 text-[10px] text-terracotta">
              <Lock className="w-3.5 h-3.5 shrink-0 text-terracotta" />
              <span>{t('sellerVerification.privacyGuarantee')}</span>
            </div>

            <button
              onClick={handleStartVerification}
              className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-3.5 px-4 rounded-2xl font-bold text-xs shadow-craft transition flex items-center justify-center gap-2"
            >
              <span>{t('sellerVerification.startKycBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Authorized Consent Verification */}
        {step === 'consent' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-artisan-border shadow-soft space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta font-bold text-xs">
                  🏛️
                </div>
                <div>
                  <h4 className="text-xs font-bold text-artisan-text">
                    Authorized Government e-KYC / DigiLocker
                  </h4>
                  <p className="text-[10px] text-artisan-muted">
                    Instant paperless verification via digital credentials
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF7F2] rounded-xl p-3 border border-artisan-border text-[11px] text-artisan-muted leading-relaxed">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentGranted}
                    onChange={(e) => setConsentGranted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-artisan-border accent-terracotta"
                  />
                  <span className="text-artisan-text font-medium">{t('sellerVerification.consentCheckbox')}</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleExecuteVerification}
                disabled={!consentGranted}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                  consentGranted
                    ? 'bg-terracotta hover:bg-terracotta-hover text-white shadow-craft'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm & Verify Securely</span>
              </button>

              <button
                onClick={() => setStep('why')}
                className="w-full text-center text-xs font-bold text-artisan-muted hover:text-artisan-text py-1"
              >
                {t('common.back')}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Verifying Spinner */}
        {step === 'verifying' && (
          <div className="py-8 flex flex-col items-center justify-center space-y-3 text-center">
            <Loader2 className="w-10 h-10 text-terracotta animate-spin" />
            <div>
              <h4 className="text-sm font-bold text-artisan-text">
                {t('sellerVerification.verifyingTitle')}
              </h4>
              <p className="text-xs text-artisan-muted mt-1">
                {t('sellerVerification.verifyingDesc')}
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Verification Success Result */}
        {step === 'success' && (
          <div className="space-y-4 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-forest-light border border-forest/30 text-forest flex items-center justify-center mx-auto animate-scaleUp">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-forest">
                {t('sellerVerification.successTitle')}
              </h4>
              <p className="text-xs text-artisan-muted leading-relaxed px-2">
                {t('sellerVerification.successDesc')}
              </p>
            </div>

            {/* Verification Receipt Card */}
            {verificationRecord && (
              <div className="bg-white rounded-2xl p-3.5 border border-forest/30 shadow-soft text-left space-y-1.5 text-xs">
                <div className="flex justify-between text-[11px] text-artisan-muted">
                  <span>Reference ID:</span>
                  <span className="font-bold text-artisan-text">
                    {verificationRecord.verificationReference}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-artisan-muted">
                  <span>Masked Identifier:</span>
                  <span className="font-bold text-forest">
                    {verificationRecord.maskedIdentifier}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-artisan-muted">
                  <span>Status:</span>
                  <span className="font-bold text-forest uppercase">
                    ✓ {verificationRecord.status}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleFinish}
              className="w-full bg-forest hover:bg-forest/90 text-white py-3.5 px-4 rounded-2xl font-bold text-xs shadow-soft transition"
            >
              {t('sellerVerification.doneBtn')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
