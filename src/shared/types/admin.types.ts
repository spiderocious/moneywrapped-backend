import { TierType } from './user.types';

export interface AdminUserListItem {
  id: string;
  username: string;
  email: string;
  role: string;
  tier: TierType;
  quota: {
    limit: number;
    bonus: number;
    used: number;
    remaining: number;
  };
  createdAt: Date;
  lastLoginAt: Date;
}

export interface AdminUserListResponse {
  users: AdminUserListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminUserDetailResponse {
  id: string;
  username: string;
  email: string;
  role: string;
  tier: TierType;
  analysisQuota: {
    limit: number;
    bonus: number;
    used: number;
    remaining: number;
  };
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  lastLoginAt: Date;
  updatedAt: Date;
  stats: {
    gamesPlayed: number;
    gamesWon: number;
    totalScore: number;
  };
}

export interface UpdateUserQuotaDTO {
  bonusToAdd: number;
}

export interface UpdateUserTierDTO {
  tier: TierType;
}
