import { UserModel } from '@models';
import {
  ServiceResult,
  ServiceSuccess,
  ServiceError,
  AdminUserListResponse,
  AdminUserDetailResponse,
  TierType,
} from '@shared/types';
import { MESSAGE_KEYS } from '@shared/constants';
import { logger } from '@utils';
import { getTierLimit } from '@configs';

export class AdminService {
  private static instance: AdminService;

  private constructor() {}

  public static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  async listUsers(
    page: number = 1,
    limit: number = 20
  ): Promise<ServiceResult<AdminUserListResponse>> {
    try {
      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
        UserModel.find()
          .select('id username email role tier analysisQuota createdAt lastLoginAt')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        UserModel.countDocuments(),
      ]);

      const userList = users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        tier: user.tier,
        quota: {
          limit: user.analysisQuota.limit,
          bonus: user.analysisQuota.bonus,
          used: user.analysisQuota.used,
          remaining:
            user.analysisQuota.limit === -1
              ? -1
              : user.analysisQuota.limit + user.analysisQuota.bonus - user.analysisQuota.used,
        },
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      }));

      const response: AdminUserListResponse = {
        users: userList,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };

      return new ServiceSuccess(response, MESSAGE_KEYS.USERS_FETCHED);
    } catch (error: any) {
      logger.error('Failed to list users', error);
      return new ServiceError(error.message, MESSAGE_KEYS.FAILED_TO_GET_USERS);
    }
  }

  async getUserDetail(userId: string): Promise<ServiceResult<AdminUserDetailResponse>> {
    try {
      const user = await UserModel.findOne({ id: userId })
        .select('-password')
        .lean();

      if (!user) {
        return new ServiceError('User not found', MESSAGE_KEYS.USER_NOT_FOUND);
      }

      const detail: AdminUserDetailResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        tier: user.tier,
        analysisQuota: {
          limit: user.analysisQuota.limit,
          bonus: user.analysisQuota.bonus,
          used: user.analysisQuota.used,
          remaining:
            user.analysisQuota.limit === -1
              ? -1
              : user.analysisQuota.limit + user.analysisQuota.bonus - user.analysisQuota.used,
        },
        isVerified: user.isVerified,
        isActive: user.isActive,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
        updatedAt: user.updatedAt,
        stats: {
          gamesPlayed: user.stats.gamesPlayed,
          gamesWon: user.stats.gamesWon,
          totalScore: user.stats.totalScore,
        },
      };

      return new ServiceSuccess(detail, MESSAGE_KEYS.USER_FETCHED);
    } catch (error: any) {
      logger.error('Failed to get user detail', error);
      return new ServiceError(error.message, MESSAGE_KEYS.USER_FETCH_FAILED);
    }
  }

  async addBonusQuota(userId: string, bonusToAdd: number): Promise<ServiceResult<{ message: string }>> {
    try {
      if (bonusToAdd <= 0) {
        return new ServiceError('Bonus must be a positive number', MESSAGE_KEYS.INVALID_REQUEST);
      }

      const user = await UserModel.findOneAndUpdate(
        { id: userId },
        { $inc: { 'analysisQuota.bonus': bonusToAdd } },
        { new: true }
      );

      if (!user) {
        return new ServiceError('User not found', MESSAGE_KEYS.USER_NOT_FOUND);
      }

      logger.info(`Admin added ${bonusToAdd} bonus quota to user ${userId}. New bonus: ${user.analysisQuota.bonus}`);

      return new ServiceSuccess(
        { message: `Successfully added ${bonusToAdd} bonus analyses. User now has ${user.analysisQuota.bonus} bonus.` },
        MESSAGE_KEYS.QUOTA_UPDATED
      );
    } catch (error: any) {
      logger.error('Failed to add bonus quota', error);
      return new ServiceError(error.message, MESSAGE_KEYS.QUOTA_UPDATE_FAILED);
    }
  }

  async updateUserTier(userId: string, tier: TierType): Promise<ServiceResult<{ message: string }>> {
    try {
      const newLimit = getTierLimit(tier);

      const user = await UserModel.findOneAndUpdate(
        { id: userId },
        {
          tier,
          'analysisQuota.limit': newLimit,
        },
        { new: true }
      );

      if (!user) {
        return new ServiceError('User not found', MESSAGE_KEYS.USER_NOT_FOUND);
      }

      logger.info(`Admin updated user ${userId} tier to ${tier}. New limit: ${newLimit}`);

      return new ServiceSuccess(
        { message: `Successfully upgraded user to ${tier} tier with ${newLimit === -1 ? 'unlimited' : newLimit} analyses.` },
        MESSAGE_KEYS.TIER_UPDATED
      );
    } catch (error: any) {
      logger.error('Failed to update user tier', error);
      return new ServiceError(error.message, MESSAGE_KEYS.TIER_UPDATE_FAILED);
    }
  }
}

export const adminService = AdminService.getInstance();
