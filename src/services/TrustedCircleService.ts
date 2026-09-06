import { TrustedCircleMember } from '../types';

export const INITIAL_TRUSTED_MEMBERS: TrustedCircleMember[] = [
  {
    id: 'helper-1',
    name: 'Ramesh',
    relation: 'Son & Packaging Assistant',
    phone: '+91 94401 55221',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    permissions: {
      canPackOrders: true,
      canViewInventory: true,
      canViewEarnings: false,
      canWithdrawFunds: false, // Strictly false: Protected bank details
    },
    lastActive: 'Active 1 hour ago',
  },
];

export class TrustedCircleService {
  private static members: TrustedCircleMember[] = [...INITIAL_TRUSTED_MEMBERS];

  static getMembers(): TrustedCircleMember[] {
    return [...this.members];
  }

  static getMember(id: string): TrustedCircleMember | undefined {
    return this.members.find((m) => m.id === id);
  }

  /**
   * Server-side permission check enforcement
   */
  static verifyPermission(
    memberId: string,
    action: 'pack_orders' | 'view_inventory' | 'view_finances' | 'withdraw_funds'
  ): { allowed: boolean; reason?: string } {
    const member = this.getMember(memberId);
    if (!member) {
      return { allowed: false, reason: 'Member not found in Trusted Circle.' };
    }

    if (action === 'withdraw_funds' || action === 'view_finances') {
      return {
        allowed: false,
        reason: 'Protected action: Financial credentials and payouts cannot be accessed by Trusted Circle members.',
      };
    }

    if (action === 'pack_orders' && member.permissions.canPackOrders) {
      return { allowed: true };
    }

    if (action === 'view_inventory' && member.permissions.canViewInventory) {
      return { allowed: true };
    }

    return { allowed: false, reason: 'Permission not granted for this action.' };
  }

  /**
   * Send WhatsApp notification to helper requesting packaging help
   */
  static notifyHelperToPack(
    memberId: string,
    orderCount: number
  ): { success: boolean; message: string } {
    const member = this.getMember(memberId) || this.members[0];
    return {
      success: true,
      message: `WhatsApp message dispatched to ${member.name} (${member.phone}): "Namaste Ramesh, Lakshmi needs help packing ${orderCount} new orders on Kaarigar Bazaar."`,
    };
  }
}
