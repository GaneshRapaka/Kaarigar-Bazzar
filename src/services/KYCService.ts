import { SellerKycStatus, SellerVerificationRecord } from '../types';

export interface KycInitiationResult {
  referenceId: string;
  provider: 'digilocker' | 'e_sign' | 'sandbox';
  consentUrl?: string;
  status: SellerKycStatus;
  expiresInSeconds: number;
}

export class KYCService {
  // In-memory verification records database simulation
  private static records: Map<string, SellerVerificationRecord> = new Map([
    [
      'artisan-lakshmi-01',
      {
        id: 'kyc-rec-lakshmi-01',
        sellerId: 'artisan-lakshmi-01',
        status: 'VERIFIED',
        provider: 'digilocker',
        verificationReference: 'DL-TS-88392-LAKSHMI',
        maskedIdentifier: 'Govt Handloom ID ending in 2338',
        verifiedAt: '2025-11-14T10:30:00Z',
        createdAt: '2025-11-14T10:15:00Z',
        updatedAt: '2025-11-14T10:30:00Z',
      },
    ],
  ]);

  /**
   * Retrieves the current seller verification record & status
   */
  static async getVerificationStatus(sellerId: string): Promise<SellerVerificationRecord> {
    const existing = this.records.get(sellerId);
    if (existing) {
      return existing;
    }

    const defaultRecord: SellerVerificationRecord = {
      id: `kyc-rec-${Date.now()}`,
      sellerId,
      status: 'NOT_VERIFIED',
      provider: 'digilocker',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.records.set(sellerId, defaultRecord);
    return defaultRecord;
  }

  /**
   * Step 1: Initiates verification session with an authorized provider (e.g. DigiLocker / sandbox)
   */
  static async initiateVerification(
    sellerId: string,
    provider: 'digilocker' | 'e_sign' | 'sandbox' = 'digilocker'
  ): Promise<KycInitiationResult> {
    const referenceId = `REF-${provider.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date().toISOString();

    const record: SellerVerificationRecord = {
      id: `kyc-${Date.now()}`,
      sellerId,
      status: 'PENDING',
      provider,
      verificationReference: referenceId,
      createdAt: now,
      updatedAt: now,
    };

    this.records.set(sellerId, record);

    return {
      referenceId,
      provider,
      status: 'PENDING',
      expiresInSeconds: 600, // 10 minutes session validity
    };
  }

  /**
   * Step 2: Submits consent & completes authorized verification
   * Data Privacy: No full Aadhaar or biometric data is ever collected or stored.
   */
  static async submitVerificationStep(
    sellerId: string,
    referenceId: string,
    consentGranted: boolean
  ): Promise<SellerVerificationRecord> {
    if (!consentGranted) {
      const failedRecord: SellerVerificationRecord = {
        id: `kyc-${Date.now()}`,
        sellerId,
        status: 'FAILED',
        provider: 'digilocker',
        verificationReference: referenceId,
        failureReason: 'Consent was declined by artisan.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.records.set(sellerId, failedRecord);
      return failedRecord;
    }

    // Simulate provider verification roundtrip (300ms)
    await new Promise((resolve) => setTimeout(resolve, 600));

    const now = new Date().toISOString();
    const verifiedRecord: SellerVerificationRecord = {
      id: `kyc-${Date.now()}`,
      sellerId,
      status: 'VERIFIED',
      provider: 'digilocker',
      verificationReference: referenceId,
      // Masked identifier only - compliant with UIDAI & data minimization principles
      maskedIdentifier: `Govt Artisan ID ending in ${Math.floor(1000 + Math.random() * 9000)}`,
      verifiedAt: now,
      createdAt: now,
      updatedAt: now,
    };

    this.records.set(sellerId, verifiedRecord);
    return verifiedRecord;
  }

  /**
   * Sets the verification record explicitly (for testing & reset purposes)
   */
  static setVerificationStatus(
    sellerId: string,
    status: SellerKycStatus,
    reason?: string
  ): SellerVerificationRecord {
    const now = new Date().toISOString();
    const record: SellerVerificationRecord = {
      id: `kyc-${Date.now()}`,
      sellerId,
      status,
      provider: 'digilocker',
      verificationReference: status === 'VERIFIED' ? `DL-TS-${Date.now().toString().slice(-6)}` : undefined,
      maskedIdentifier: status === 'VERIFIED' ? 'Govt Handloom ID ending in 2338' : undefined,
      verifiedAt: status === 'VERIFIED' ? now : undefined,
      failureReason: reason,
      createdAt: now,
      updatedAt: now,
    };
    this.records.set(sellerId, record);
    return record;
  }
}
