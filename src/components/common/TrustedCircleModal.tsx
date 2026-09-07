import React, { useState } from 'react';
import { Users, X, Lock, CheckCircle2, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../services/i18n';
import { TrustedCircleMember } from '../../types';
import { TrustedCircleService } from '../../services/TrustedCircleService';

interface TrustedCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: TrustedCircleMember[];
  pendingOrdersCount: number;
}

export const TrustedCircleModal: React.FC<TrustedCircleModalProps> = ({
  isOpen,
  onClose,
  members,
  pendingOrdersCount,
}) => {
  const { t } = useLanguage();
  const [notifiedMessage, setNotifiedMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleNotifyHelper = (memberId: string) => {
    const res = TrustedCircleService.notifyHelperToPack(memberId, pendingOrdersCount);
    setNotifiedMessage(res.message);
    setTimeout(() => {
      setNotifiedMessage(null);
    }, 4000);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center p-3 animate-fadeIn">
      <div className="w-full max-h-[90vh] bg-artisan-bg rounded-3xl p-5 border border-artisan-border shadow-2xl space-y-4 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-artisan-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-artisan-text">
                {t('trustedCircle.title')}
              </h3>
              <p className="text-[10px] text-artisan-muted">
                {t('trustedCircle.subtitle')}
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

        {/* Member Cards */}
        <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white p-4 rounded-2xl border border-artisan-border shadow-soft space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta font-bold text-sm border border-terracotta/20">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-artisan-text">{member.name}</h4>
                    <p className="text-[11px] text-artisan-muted">{member.relation}</p>
                    <span className="text-[10px] text-forest font-semibold">{member.lastActive}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] bg-forest-light border border-forest/30 text-forest px-2 py-0.5 rounded-full font-bold">
                    Active Helper
                  </span>
                </div>
              </div>

              {/* Permissions Checklist */}
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-artisan-border space-y-1.5 text-xs">
                <span className="text-[10px] font-bold text-artisan-muted uppercase tracking-wider block">
                  {t('trustedCircle.permissionsHeader')}
                </span>

                <div className="flex items-center gap-2 text-forest text-[11px] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('trustedCircle.packOrdersPermission')}</span>
                </div>

                <div className="flex items-center gap-2 text-forest text-[11px] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('trustedCircle.inventoryPermission')}</span>
                </div>

                <div className="flex items-center gap-2 text-amber-700 text-[11px] font-medium pt-1 border-t border-artisan-border">
                  <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{t('trustedCircle.financeProtected')}</span>
                </div>
              </div>

              {/* Action: Ask helper to pack orders */}
              <button
                onClick={() => handleNotifyHelper(member.id)}
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 px-3 rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5 active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>{t('trustedCircle.notifyHelperBtn')} ({pendingOrdersCount})</span>
              </button>
            </div>
          ))}
        </div>

        {/* Notified Banner */}
        {notifiedMessage && (
          <div className="p-3 rounded-xl bg-forest-light border border-forest/30 text-forest text-xs font-medium animate-fadeIn">
            {notifiedMessage}
          </div>
        )}

        <div className="pt-1">
          <button
            onClick={onClose}
            className="w-full bg-white hover:bg-neutral-100 border border-artisan-border text-artisan-text py-3 rounded-2xl font-bold text-xs transition"
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
