export const TIER_LIMITS = {
  free: {
    analysisLimit: 2,
    name: 'Free Tier',
    price: 0,
  },
  pro: {
    analysisLimit: 50,
    name: 'Pro Tier',
    price: 9.99,
  },
  enterprise: {
    analysisLimit: -1, // Unlimited
    name: 'Enterprise Tier',
    price: 49.99,
  },
} as const;

export type TierType = keyof typeof TIER_LIMITS;

export const getTierLimit = (tier: TierType): number => {
  return TIER_LIMITS[tier].analysisLimit;
};

export const getTierName = (tier: TierType): string => {
  return TIER_LIMITS[tier].name;
};

export const getTierPrice = (tier: TierType): number => {
  return TIER_LIMITS[tier].price;
};
