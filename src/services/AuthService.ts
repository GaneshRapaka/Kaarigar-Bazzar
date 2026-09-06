import { ArtisanProfile } from '../types';
import { INITIAL_PROFILE } from '../data/mockData';

interface OtpSession {
  phone: string;
  expectedCode: string; // In production this is kept only on backend server
  createdAt: number;
  expiresAt: number;
  attempts: number;
  resendCooldownUntil: number;
}

export class AuthService {
  private static sessions: Map<string, OtpSession> = new Map();
  private static rateLimitMap: Map<string, { count: number; windowStart: number }> = new Map();

  // Known registered users database simulation
  private static registeredUsers: Map<string, ArtisanProfile> = new Map([
    [
      '9848022338',
      {
        ...INITIAL_PROFILE,
        id: 'artisan-lakshmi-01',
        phone: '+91 98480 22338',
        kycStatus: 'VERIFIED',
        verificationRecord: {
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
      },
    ],
    [
      '9876543210',
      {
        id: 'artisan-ramesh-02',
        name: 'Ramesh Kumar',
        initial: 'R',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        title: 'Terracotta Potter',
        location: 'Warangal, Telangana',
        language: 'తెలుగు (Telugu)',
        teluguLanguage: 'భాష',
        phone: '+91 98765 43210',
        voiceFeedbackEnabled: true,
        craftSpecialization: 'Traditional Terracotta Pottery & Clay Murals',
        kycStatus: 'VERIFIED',
        verificationRecord: {
          id: 'kyc-rec-ramesh-02',
          sellerId: 'artisan-ramesh-02',
          status: 'VERIFIED',
          provider: 'digilocker',
          verificationReference: 'DL-TS-77211-RAMESH',
          maskedIdentifier: 'Govt Artisan Card ending in 3210',
          verifiedAt: '2025-10-02T14:20:00Z',
          createdAt: '2025-10-02T14:00:00Z',
          updatedAt: '2025-10-02T14:20:00Z',
        },
      },
    ],
  ]);

  private static cleanDigits(phone: string): string {
    return phone.replace(/\D/g, '').slice(-10);
  }

  /**
   * Validates Indian 10-digit mobile number
   */
  static isValidPhone(phone: string): boolean {
    const digits = this.cleanDigits(phone);
    return digits.length === 10 && /^[6-9]\d{9}$/.test(digits);
  }

  /**
   * Sends OTP with expiration time (120s), resend cooldown (45s), and rate limiting
   */
  static sendOtp(phone: string): {
    success: boolean;
    cooldownSeconds: number;
    errorKey?: string;
  } {
    const digits = this.cleanDigits(phone);
    const now = Date.now();

    // 1. Check rate limit (max 5 requests per 10 minutes)
    const rateLimit = this.rateLimitMap.get(digits) || { count: 0, windowStart: now };
    if (now - rateLimit.windowStart > 10 * 60 * 1000) {
      rateLimit.count = 0;
      rateLimit.windowStart = now;
    }
    if (rateLimit.count >= 5) {
      return { success: false, cooldownSeconds: 60, errorKey: 'rateLimitError' };
    }

    // 2. Check active cooldown
    const existing = this.sessions.get(digits);
    if (existing && now < existing.resendCooldownUntil) {
      const remainingCooldown = Math.ceil((existing.resendCooldownUntil - now) / 1000);
      return { success: false, cooldownSeconds: remainingCooldown, errorKey: 'resendCooldown' };
    }

    // 3. Create or refresh session
    const cooldownPeriod = 45 * 1000; // 45 seconds cooldown
    const expiryPeriod = 120 * 1000; // 120 seconds (2 minutes) expiry
    const demoCode = '4281'; // Deterministic test code for prototype

    rateLimit.count += 1;
    this.rateLimitMap.set(digits, rateLimit);

    this.sessions.set(digits, {
      phone: digits,
      expectedCode: demoCode,
      createdAt: now,
      expiresAt: now + expiryPeriod,
      attempts: 0,
      resendCooldownUntil: now + cooldownPeriod,
    });

    return {
      success: true,
      cooldownSeconds: 45,
    };
  }

  /**
   * Verifies the entered OTP
   */
  static verifyOtp(
    phone: string,
    inputCode: string
  ): {
    success: boolean;
    isNewUser: boolean;
    profile?: ArtisanProfile;
    errorKey?: string;
  } {
    const digits = this.cleanDigits(phone);
    const now = Date.now();
    const session = this.sessions.get(digits);

    // If no session exists, create a default session for seamless testing
    const activeSession =
      session || {
        phone: digits,
        expectedCode: '4281',
        createdAt: now,
        expiresAt: now + 120 * 1000,
        attempts: 0,
        resendCooldownUntil: now + 45 * 1000,
      };

    // 1. Check expiration
    if (now > activeSession.expiresAt) {
      return { success: false, isNewUser: false, errorKey: 'expiredOtpError' };
    }

    // 2. Check maximum verification attempts (max 5)
    if (activeSession.attempts >= 5) {
      return { success: false, isNewUser: false, errorKey: 'rateLimitError' };
    }

    // 3. Check code match (supports demo code '4281' or auto-detected code)
    if (inputCode !== activeSession.expectedCode && inputCode !== '4281') {
      activeSession.attempts += 1;
      this.sessions.set(digits, activeSession);
      return { success: false, isNewUser: false, errorKey: 'invalidOtpError' };
    }

    // 4. Success: check if user exists or is new
    const existingProfile = this.registeredUsers.get(digits);
    if (existingProfile) {
      return {
        success: true,
        isNewUser: false,
        profile: existingProfile,
      };
    }

    // New artisan registering for the first time
    const newProfile: ArtisanProfile = {
      id: `artisan-new-${digits.slice(-4)}`,
      name: '',
      initial: 'A',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      title: 'Craft Artisan',
      location: 'Telangana',
      language: 'English',
      teluguLanguage: 'భాష',
      phone: `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`,
      voiceFeedbackEnabled: true,
      craftSpecialization: 'Traditional Handloom & Craft',
      isNewUser: true,
      kycStatus: 'NOT_VERIFIED',
    };

    return {
      success: true,
      isNewUser: true,
      profile: newProfile,
    };
  }

  /**
   * Registers a newly onboarded user into state
   */
  static registerNewUser(profile: ArtisanProfile): ArtisanProfile {
    const digits = this.cleanDigits(profile.phone);
    const updated = {
      ...profile,
      isNewUser: false,
      kycStatus: profile.kycStatus || ('NOT_VERIFIED' as const),
    };
    this.registeredUsers.set(digits, updated);
    return updated;
  }

  /**
   * Updates an existing profile
   */
  static updateProfile(phone: string, updates: Partial<ArtisanProfile>): ArtisanProfile | null {
    const digits = this.cleanDigits(phone);
    const current = this.registeredUsers.get(digits);
    if (!current) return null;
    const updated = { ...current, ...updates };
    this.registeredUsers.set(digits, updated);
    return updated;
  }

  /**
   * Gets remaining seconds until OTP expires
   */
  static getRemainingExpiry(phone: string): number {
    const digits = this.cleanDigits(phone);
    const session = this.sessions.get(digits);
    if (!session) return 120;
    return Math.max(0, Math.ceil((session.expiresAt - Date.now()) / 1000));
  }

  /**
   * Gets remaining seconds of resend cooldown
   */
  static getRemainingCooldown(phone: string): number {
    const digits = this.cleanDigits(phone);
    const session = this.sessions.get(digits);
    if (!session) return 0;
    return Math.max(0, Math.ceil((session.resendCooldownUntil - Date.now()) / 1000));
  }

  /**
   * Returns demo code for effortless prototype inspection
   */
  static getDemoOtp(): string {
    return '4281';
  }
}
