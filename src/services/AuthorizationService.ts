import { SellerCapability, SellerKycStatus } from '../types';

export interface AuthorizationResult {
  allowed: boolean;
  reason?: string;
  requiredKycStatus?: SellerKycStatus;
  errorCode?: 'KYC_REQUIRED' | 'UNAUTHORIZED' | 'PERMISSION_DENIED';
}

export class AuthorizationService {
  /**
   * Configurable Capability Matrix: Defines what each verification tier can perform
   */
  private static CAPABILITY_RULES: Record<
    SellerCapability,
    { minStatus: SellerKycStatus; reasonIfDenied: string }
  > = {
    BASIC_APP_ACCESS: {
      minStatus: 'NOT_VERIFIED',
      reasonIfDenied: '',
    },
    VIEW_DASHBOARD: {
      minStatus: 'NOT_VERIFIED',
      reasonIfDenied: '',
    },
    ADD_PRODUCTS: {
      minStatus: 'NOT_VERIFIED',
      reasonIfDenied: '',
    },
    EXPLORE_AI: {
      minStatus: 'NOT_VERIFIED',
      reasonIfDenied: '',
    },
    WITHDRAW_PAYOUTS: {
      minStatus: 'VERIFIED',
      reasonIfDenied: 'Bank withdrawals require completed Seller Identity Verification.',
    },
    VERIFIED_SELLER_BADGE: {
      minStatus: 'VERIFIED',
      reasonIfDenied: 'Verified badge is only issued to verified master artisans.',
    },
    HIGH_VALUE_DISPATCH: {
      minStatus: 'VERIFIED',
      reasonIfDenied: 'High-value dispatches exceeding ₹20,000 require completed KYC.',
    },
  };

  /**
   * Evaluates if an artisan can execute a protected capability
   */
  static canPerform(
    _sellerId: string,
    capability: SellerCapability,
    currentStatus: SellerKycStatus = 'NOT_VERIFIED'
  ): AuthorizationResult {
    const rule = this.CAPABILITY_RULES[capability];
    if (!rule) {
      return { allowed: false, reason: 'Unknown capability requested.', errorCode: 'PERMISSION_DENIED' };
    }

    // If minimum required status is NOT_VERIFIED, allow everyone
    if (rule.minStatus === 'NOT_VERIFIED') {
      return { allowed: true };
    }

    // If VERIFIED is required, check if status is VERIFIED
    if (rule.minStatus === 'VERIFIED') {
      if (currentStatus === 'VERIFIED') {
        return { allowed: true };
      }

      return {
        allowed: false,
        reason: rule.reasonIfDenied,
        requiredKycStatus: 'VERIFIED',
        errorCode: 'KYC_REQUIRED',
      };
    }

    return { allowed: true };
  }

  /**
   * Helper to check payout capability directly
   */
  static canWithdrawEarnings(status: SellerKycStatus): AuthorizationResult {
    return this.canPerform('current-artisan', 'WITHDRAW_PAYOUTS', status);
  }
}
