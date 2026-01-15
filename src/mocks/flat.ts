/**
 * Flat JSON structure for AI to generate
 * Arrays stay as arrays, but no nested objects inside them
 * All object properties are flattened to primitives
 *
 * STRUCTURE: Fields are grouped by screen with "needed" flag at the start of each group
 * If you cannot populate the fields in a screen section, set its "needed" flag to false
 */

export interface FlatAnalysisData {
  // ========================================
  // METADATA (always required)
  // ========================================
  periodStart: string;
  periodEnd: string;
  daysAnalyzed: number;
  analysisDate: string;
  statementBank: string;
  accountType: string;
  currency: string;
  perceivedCountry: string;

  // ========================================
  // SCREEN: Overview
  // ========================================
  overviewNeeded: boolean;  // Set false if you can't populate fields below
  totalInflow: number;
  totalInflowCurrency: string;
  totalOutflow: number;
  totalOutflowCurrency: string;
  netCashflow: number;
  netCashflowCurrency: string;
  openingBalance: number;
  openingBalanceCurrency: string;
  closingBalance: number;
  closingBalanceCurrency: string;
  healthScore: number;
  healthRating: 'critical' | 'poor' | 'fair' | 'good' | 'excellent';

  // ========================================
  // SCREEN: Analysis Summary
  // ========================================
  analysisSummaryNeeded: boolean;  // Set false if you can't populate fields below
  totalTransactions: number;
  uniqueMerchants: number;
  totalSpending: number;

  // ========================================
  // SCREEN: Personality
  // ========================================
  personalityScreenNeeded: boolean;  // Set false if you can't populate fields below
  personalityArchetype: string;
  traits: string[]; // ["GENEROUS", "SOCIAL", "TECH-FORWARD", "IMPULSIVE"]
  traitLevels: string[]; // ["high", "high", "medium", "high"]
  moneyPhilosophy: string;
  personalityInsights: Array<{
    type: 'transfer' | 'merchant' | 'time';
    title: string;
    percentage?: number;
    description?: string;
    subtitle?: string;
    value?: number;
    timeWindow?: string;
  }>;

  // ========================================
  // SCREEN: Financial Health
  // ========================================
  financialHealthNeeded: boolean;  // Set false if you can't populate fields below
  monthlyGrade: string;
  nigerianAvgHealthScore: number;

  // ========================================
  // SCREEN: Financial Report
  // ========================================
  financialReportNeeded: boolean;  // Set false if you can't populate fields below
  // Uses: healthScore, healthRating, monthlyGrade, primaryConcern fields

  // ========================================
  // SCREEN: Financial Challenge / Primary Concern
  // ========================================
  financialChallengeNeeded: boolean;  // Set false if you can't populate fields below
  primaryConcernTitle: string;
  primaryConcernMonthlyCost: number;
  primaryConcernMonthlyCostCurrency: string;
  primaryConcernAnnualCost: number;
  primaryConcernAnnualCostCurrency: string;

  // ========================================
  // SCREEN: Spender Personality
  // ========================================
  spenderPersonalityNeeded: boolean;  // Set false if you can't populate fields below
  spenderDescriptions: Array<{
    text: string;
    highlighted: string;
    suffix: string;
  }>;

  // ========================================
  // SCREEN: The Big Picture (Cash Flow)
  // ========================================
  theBigPictureNeeded: boolean;  // Set false if you can't populate fields below
  moneyInTopContributorLabel: string;
  moneyInTopContributorPercentage: number;
  moneyOutTopContributorLabel: string;
  moneyOutTopContributorPercentage: number;
  cashFlowInsightMessage: string;
  cashFlowRecommendation: string;

  // ========================================
  // SCREEN: Spending Breakdown
  // ========================================
  spendingBreakdownNeeded: boolean;  // Set false if you can't populate fields below
  spendingCategories: Array<{
    name: string;
    amount: number;
    currency: string;
    percentage: number;
    count: number;
  }>;

  // ========================================
  // SCREEN: Transfers to People
  // ========================================
  transfersToPeopleNeeded: boolean;  // Set false if no person-to-person transfers
  transfersTotal: number;
  transfersTotalCurrency: string;
  transfersPercentage: number;
  transfersCount: number;
  transfersAvgAmount: number;
  transfersAvgAmountCurrency: string;
  uniqueRecipients: number;
  transferFrequency: 'daily' | 'weekly' | 'monthly';
  transferInsightTitle: string;
  transferInsightMessage: string;

  // ========================================
  // SCREEN: Daily Burn Rate
  // ========================================
  dailyBurnRateNeeded: boolean;  // Set false if you can't populate fields below
  dailyBurnRate: number;
  dailyBurnRateCurrency: string;
  hourlyBurnRate: number;
  hourlyBurnRateCurrency: string;
  minuteBurnRate: number;
  minuteBurnRateCurrency: string;
  sleepBurnRate: number;
  sleepBurnRateCurrency: string;
  burnPerspectiveMessage: string;

  // ========================================
  // SCREEN: Your People Stat
  // ========================================
  yourPeopleStatNeeded: boolean;  // Set false if no transfer data
  peopleStatValue: number;
  peopleStatDescription: string;
  peopleStatSubtitle: string;
  totalSentToPeople: number;
  totalSentToPeopleCurrency: string;
  avgPerPerson: number;
  avgPerPersonCurrency: string;
  peoplePerDay: number;
  achievementBadge: string;
  realityCheckMessage: string;

  // ========================================
  // SCREEN: Top Recipient
  // ========================================
  topRecipientNeeded: boolean;  // Set false if no clear top recipient
  topRecipientName: string;
  topRecipientInitials: string;
  topRecipientAmount: number;
  topRecipientAmountCurrency: string;
  topRecipientCount: number;
  topRecipientRelationship: string;
  topRecipientQuote: string;
  topRecipientDates: string[];
  topRecipientPattern: string;

  // ========================================
  // SCREEN: The Regular Recipient
  // ========================================
  theRegularRecipientNeeded: boolean;  // Set false if no regular recurring recipient
  regularRecipientName: string;
  regularRecipientRelationship: string;
  regularRecipientAmount: number;
  regularRecipientAmountCurrency: string;
  regularRecipientFrequency: number;
  regularRecipientCount: number;
  regularRecipientConsistency: number;
  regularRecipientRecentTransfers: Array<{
    date: string;
    time: string;
    amount: number;
    currency: string;
  }>;
  regularRecipientInsightTitle: string;
  regularRecipientInsightMessage: string;

  // ========================================
  // SCREEN: The Loan Suspects
  // ========================================
  theLoanSuspectsNeeded: boolean;  // Set false if no large one-time transfers
  totalUntrackedTransfers: number;
  totalUntrackedTransfersCurrency: string;
  loanSuspectCount: number;
  loanSuspects: Array<{
    name: string;
    date: string;
    amount: number;
    currency: string;
  }>;
  loanSuspectsMoreCount: number;

  // ========================================
  // SCREEN: Favorite Spot (Restaurant)
  // ========================================
  favoriteSpotNeeded: boolean;  // Set false if no restaurant/merchant transactions
  favoriteRestaurantName: string;
  favoriteRestaurantVisits: number;
  favoriteRestaurantTotal: number;
  favoriteRestaurantTotalCurrency: string;
  favoriteRestaurantAvgBill: number;
  favoriteRestaurantAvgBillCurrency: string;
  favoriteRestaurantLoyaltyScore: number;
  favoriteRestaurantQuote: string;
  favoriteRestaurantInsightTitle: string;
  favoriteRestaurantInsightMessage: string;

  // ========================================
  // SCREEN: You vs World One (Restaurant Spending)
  // ========================================
  youVsWorldOneNeeded: boolean;  // Set false if no restaurant spending
  restaurantSpendingAmount: number;
  restaurantSpendingAmountCurrency: string;
  restaurantSpendingPercentile: number;
  restaurantSpendingNigerianAvg: number;
  restaurantSpendingNigerianAvgCurrency: string;
  restaurantSpendingMultiplier: number;
  restaurantSpendingAlert: string;

  // ========================================
  // SCREEN: You vs The World Rank
  // ========================================
  youVsTheWorldRankNeeded: boolean;  // Set false if insufficient comparison data
  savingsRankPercentile: number;
  subscriptionsRankPercentile: number;
  investmentRankPercentile: number;
  utilitiesRankPercentile: number;
  categoryComparisons: Array<{
    name: string;
    yourAmount: number;
    currency: string;
    average: number;
    status: 'above_average' | 'below_average' | 'average';
  }>;
  keyTakeaways: string[];
  rankingsBottomLine: string;

  // ========================================
  // SCREEN: Your Biggest Threat (Overdraft)
  // ========================================
  yourBiggestThreatNeeded: boolean;  // Set false if account was never in overdraft
  overdraftDays: number;
  overdraftInterestPaid: number;
  overdraftInterestPaidCurrency: string;
  overdraftClosingBalance: number;
  overdraftClosingBalanceCurrency: string;
  overdraftAnnualCost: number;
  overdraftAnnualCostCurrency: string;
  overdraftTotalDays: number;
  overdraftDaysPositive: number;
  overdraftViciousCycleSteps: Array<{
    title: string;
    description: string;
  }>;
  overdraftSeverityMessage: string;

  // ========================================
  // SCREEN: Your Biggest Wins
  // ========================================
  yourBiggestWinsNeeded: boolean;  // Set false if you can't populate fields below
  biggestWins: Array<{
    title: string;
    description: string;
    value?: number;
    currency?: string;
    percentile?: number;
  }>;
  combinedProtectionValue: number;
  combinedProtectionValueCurrency: string;

  // ========================================
  // SCREEN: The Path Forward
  // ========================================
  thePathForwardNeeded: boolean;  // Set false if you can't populate fields below
  actionSteps: Array<{
    title: string;
    description: string;
    savings: number;
    currency: string;
  }>;
  totalMonthlySavingsPotential: number;
  totalMonthlySavingsPotentialCurrency: string;
  currentPathValue: number;
  currentPathValueCurrency: string;
  newPathValue: number;
  newPathValueCurrency: string;
  pathDifference: number;
  pathDifferenceCurrency: string;
  startBalance: number;
  startBalanceCurrency: string;
  targetBalance: number;
  targetBalanceCurrency: string;
}

export const mockFlatData: FlatAnalysisData = {
  // ========================================
  // METADATA
  // ========================================
  periodStart: "2025-11-25",
  periodEnd: "2025-12-25",
  daysAnalyzed: 31,
  analysisDate: "2025-12-31",
  statementBank: "Kuda Microfinance Bank",
  accountType: "Personal Current Account with Smart Overdraft",
  currency: "NGN",
  perceivedCountry: "Nigeria",

  // ========================================
  // SCREEN: Overview
  // ========================================
  overviewNeeded: true,
  totalInflow: 2056653.00,
  totalInflowCurrency: "NGN",
  totalOutflow: 2106993.92,
  totalOutflowCurrency: "NGN",
  netCashflow: -50340.92,
  netCashflowCurrency: "NGN",
  openingBalance: -37613.87,
  openingBalanceCurrency: "NGN",
  closingBalance: -87954.79,
  closingBalanceCurrency: "NGN",
  healthScore: 38,
  healthRating: "critical",

  // ========================================
  // SCREEN: Analysis Summary
  // ========================================
  analysisSummaryNeeded: true,
  totalTransactions: 287,
  uniqueMerchants: 47,
  totalSpending: 2106993.92,

  // ========================================
  // SCREEN: Personality
  // ========================================
  personalityScreenNeeded: true,
  personalityArchetype: "The Social Overdraft Warrior",
  traits: ["GENEROUS", "SOCIAL", "TECH-FORWARD", "IMPULSIVE"],
  traitLevels: ["high", "high", "medium", "high"],
  moneyPhilosophy: "Money is meant to be shared, enjoyed, and sometimes regretted the next morning.",
  personalityInsights: [
    {
      type: "transfer",
      title: "34% of spending on direct transfers",
      percentage: 0.3393,
      description: "of spending on direct transfers"
    },
    {
      type: "merchant",
      title: "Chronicles Restaurant",
      subtitle: "8 visits • ₦58,940 spent",
      value: 8,
      percentage: 58940.00
    },
    {
      type: "time",
      title: "Evening Spender",
      subtitle: "Most active 18:00-24:00",
      timeWindow: "18:00-24:00"
    }
  ],

  // ========================================
  // SCREEN: Financial Health
  // ========================================
  financialHealthNeeded: true,
  monthlyGrade: "D",
  nigerianAvgHealthScore: 64,

  // ========================================
  // SCREEN: Financial Report
  // ========================================
  financialReportNeeded: true,

  // ========================================
  // SCREEN: Financial Challenge
  // ========================================
  financialChallengeNeeded: true,
  primaryConcernTitle: "Persistent overdraft position",
  primaryConcernMonthlyCost: 4995.81,
  primaryConcernMonthlyCostCurrency: "NGN",
  primaryConcernAnnualCost: 59949.72,
  primaryConcernAnnualCostCurrency: "NGN",

  // ========================================
  // SCREEN: Spender Personality
  // ========================================
  spenderPersonalityNeeded: true,
  spenderDescriptions: [
    {
      text: "You are the life of the party and your wallet agrees. You show",
      highlighted: "high generosity",
      suffix: "when out with friends, often covering tabs without hesitation."
    },
    {
      text: "However, you tend to struggle with",
      highlighted: "poor cash flow discipline",
      suffix: "between paychecks, leading to frequent overdrafts."
    }
  ],

  // ========================================
  // SCREEN: The Big Picture
  // ========================================
  theBigPictureNeeded: true,
  moneyInTopContributorLabel: "Salary 80%",
  moneyInTopContributorPercentage: 0.80,
  moneyOutTopContributorLabel: "Transfers 34%",
  moneyOutTopContributorPercentage: 0.34,
  cashFlowInsightMessage: "You spent more than you earned.",
  cashFlowRecommendation: "Try to reduce discretionary spending next month.",

  // ========================================
  // SCREEN: Spending Breakdown
  // ========================================
  spendingBreakdownNeeded: true,
  spendingCategories: [
    {
      name: "Transfers",
      amount: 714830.00,
      currency: "NGN",
      percentage: 0.3393,
      count: 88
    },
    {
      name: "Food & Dining",
      amount: 167125.00,
      currency: "NGN",
      percentage: 0.0793,
      count: 23
    },
    {
      name: "Shopping",
      amount: 240775.00,
      currency: "NGN",
      percentage: 0.1143,
      count: 27
    },
    {
      name: "Cash",
      amount: 500000.00,
      currency: "NGN",
      percentage: 0.2373,
      count: 5
    },
    {
      name: "Others",
      amount: 221883.97,
      currency: "NGN",
      percentage: 0.1053,
      count: 97
    }
  ],

  // ========================================
  // SCREEN: Transfers to People
  // ========================================
  transfersToPeopleNeeded: true,
  transfersTotal: 714830.00,
  transfersTotalCurrency: "NGN",
  transfersPercentage: 0.3393,
  transfersCount: 88,
  transfersAvgAmount: 8123.07,
  transfersAvgAmountCurrency: "NGN",
  uniqueRecipients: 48,
  transferFrequency: "daily",
  transferInsightTitle: "Community Bank Status",
  transferInsightMessage: "You're basically a Community Bank. Your friends definitely appreciate the support!",

  // ========================================
  // SCREEN: Daily Burn Rate
  // ========================================
  dailyBurnRateNeeded: true,
  dailyBurnRate: 67967.22,
  dailyBurnRateCurrency: "NGN",
  hourlyBurnRate: 2831.97,
  hourlyBurnRateCurrency: "NGN",
  minuteBurnRate: 47.20,
  minuteBurnRateCurrency: "NGN",
  sleepBurnRate: 22655.74,
  sleepBurnRateCurrency: "NGN",
  burnPerspectiveMessage: "That's roughly 2 bags of rice or 2 full tanks of fuel leaving your account daily.",

  // ========================================
  // SCREEN: Your People Stat
  // ========================================
  yourPeopleStatNeeded: true,
  peopleStatValue: 48,
  peopleStatDescription: "Different People",
  peopleStatSubtitle: "That's more than a whole classroom!",
  totalSentToPeople: 714830.00,
  totalSentToPeopleCurrency: "NGN",
  avgPerPerson: 14892.29,
  avgPerPersonCurrency: "NGN",
  peoplePerDay: 1.55,
  achievementBadge: "The Community Bank",
  realityCheckMessage: "Your heart (and wallet) are wide open. Supporting 48 people is no small feat—you're basically the neighborhood ATM, but with way more style.",

  // ========================================
  // SCREEN: Top Recipient
  // ========================================
  topRecipientNeeded: true,
  topRecipientName: "Oladipo Segun Babatu",
  topRecipientInitials: "OB",
  topRecipientAmount: 75010.00,
  topRecipientAmountCurrency: "NGN",
  topRecipientCount: 3,
  topRecipientRelationship: "Friend",
  topRecipientQuote: "You two are quite the pair.",
  topRecipientDates: ["2025-11-26", "2025-12-03", "2025-12-03"],
  topRecipientPattern: "These transfers look like you're settling up a loan. Keeping track pays off!",

  // ========================================
  // SCREEN: The Regular Recipient
  // ========================================
  theRegularRecipientNeeded: true,
  regularRecipientName: "Esther Funmilayo Ajibola",
  regularRecipientRelationship: "Family",
  regularRecipientAmount: 47190.00,
  regularRecipientAmountCurrency: "NGN",
  regularRecipientFrequency: 2.21,
  regularRecipientCount: 14,
  regularRecipientConsistency: 0.98,
  regularRecipientRecentTransfers: [
    {
      date: "2023-10-24",
      time: "12:45 PM",
      amount: 15000.00,
      currency: "NGN"
    },
    {
      date: "2023-10-22",
      time: "09:12 AM",
      amount: 15000.00,
      currency: "NGN"
    }
  ],
  regularRecipientInsightTitle: "Family Support Insight",
  regularRecipientInsightMessage: "You're incredibly consistent! Consider setting up an automated recurring transfer to save time each week.",

  // ========================================
  // SCREEN: The Loan Suspects
  // ========================================
  theLoanSuspectsNeeded: true,
  totalUntrackedTransfers: 164320.00,
  totalUntrackedTransfersCurrency: "NGN",
  loanSuspectCount: 5,
  loanSuspects: [
    {
      name: "Uchenna Nwafor",
      date: "Oct 12",
      amount: 41010.00,
      currency: "NGN"
    },
    {
      name: "Chidi Benson",
      date: "Sep 28",
      amount: 32500.00,
      currency: "NGN"
    },
    {
      name: "Adewale S.",
      date: "Aug 15",
      amount: 60000.00,
      currency: "NGN"
    }
  ],
  loanSuspectsMoreCount: 2,

  // ========================================
  // SCREEN: Favorite Spot
  // ========================================
  favoriteSpotNeeded: true,
  favoriteRestaurantName: "Chronicles Restaurant",
  favoriteRestaurantVisits: 8,
  favoriteRestaurantTotal: 58940.00,
  favoriteRestaurantTotalCurrency: "NGN",
  favoriteRestaurantAvgBill: 7367.50,
  favoriteRestaurantAvgBillCurrency: "NGN",
  favoriteRestaurantLoyaltyScore: 9.2,
  favoriteRestaurantQuote: "You're practically on the payroll.",
  favoriteRestaurantInsightTitle: "SECOND HOME",
  favoriteRestaurantInsightMessage: "You've spent 14 hours here. They should probably give you a key.",

  // ========================================
  // SCREEN: You vs World One
  // ========================================
  youVsWorldOneNeeded: true,
  restaurantSpendingAmount: 167125.00,
  restaurantSpendingAmountCurrency: "NGN",
  restaurantSpendingPercentile: 92,
  restaurantSpendingNigerianAvg: 25000.00,
  restaurantSpendingNigerianAvgCurrency: "NGN",
  restaurantSpendingMultiplier: 6.7,
  restaurantSpendingAlert: "You're spending significantly more on dining out than the average Nigerian. While you enjoy the fine life, consider if this matches your long-term savings goals.",

  // ========================================
  // SCREEN: You vs The World Rank
  // ========================================
  youVsTheWorldRankNeeded: true,
  savingsRankPercentile: 95,
  subscriptionsRankPercentile: 58,
  investmentRankPercentile: 20,
  utilitiesRankPercentile: 50,
  categoryComparisons: [
    {
      name: "Restaurants",
      yourAmount: 167125.00,
      currency: "NGN",
      average: 45000.00,
      status: "above_average"
    },
    {
      name: "Transfers",
      yourAmount: 714830.00,
      currency: "NGN",
      average: 200000.00,
      status: "below_average"
    },
    {
      name: "Shopping",
      yourAmount: 240775.00,
      currency: "NGN",
      average: 50000.00,
      status: "below_average"
    }
  ],
  keyTakeaways: [
    "You spend 40% more on Dining than the Lagos average.",
    "Your transfer frequency is in the top 15% nationally."
  ],
  rankingsBottomLine: "While your savings are impressive, high transfer fees and frequent restaurant visits are pulling down your overall health score. By automating ₦10k more into investments, you could reach the \"Healthy\" tier (60+) by March.",

  // ========================================
  // SCREEN: Your Biggest Threat
  // ========================================
  yourBiggestThreatNeeded: true,
  overdraftDays: 31,
  overdraftInterestPaid: 4995.81,
  overdraftInterestPaidCurrency: "NGN",
  overdraftClosingBalance: -87954.79,
  overdraftClosingBalanceCurrency: "NGN",
  overdraftAnnualCost: 59949.72,
  overdraftAnnualCostCurrency: "NGN",
  overdraftTotalDays: 31,
  overdraftDaysPositive: 0,
  overdraftViciousCycleSteps: [
    {
      title: "Salary Arrives",
      description: "Balance barely clears the debt."
    },
    {
      title: "Bills Auto-Pay",
      description: "Back to negative within 48 hours."
    },
    {
      title: "Interest Compounds",
      description: "Charges stack daily."
    },
    {
      title: "Emergency Spending",
      description: "Unexpected costs deepen the hole."
    },
    {
      title: "Repeat Next Month",
      description: "Cycle continues indefinitely."
    }
  ],
  overdraftSeverityMessage: "This pattern is costing you ₦5,000 every month just to exist.",

  // ========================================
  // SCREEN: Your Biggest Wins
  // ========================================
  yourBiggestWinsNeeded: true,
  biggestWins: [
    {
      title: "Zero Gambling",
      description: "Clean streak maintained",
      value: 17107.00,
      currency: "NGN"
    },
    {
      title: "Data Efficiency Master",
      description: "Optimized data cycles",
      percentile: 95
    },
    {
      title: "Avoided Debt Traps",
      description: "Zero high-interest loans"
    }
  ],
  combinedProtectionValue: 167000.00,
  combinedProtectionValueCurrency: "NGN",

  // ========================================
  // SCREEN: The Path Forward
  // ========================================
  thePathForwardNeeded: true,
  actionSteps: [
    {
      title: "Stop Cash",
      description: "No more ATM withdrawals",
      savings: 125000.00,
      currency: "NGN"
    },
    {
      title: "Cut Transfers",
      description: "Cap 3rd party payments",
      savings: 214449.00,
      currency: "NGN"
    },
    {
      title: "Unsubscribe",
      description: "Audit recurring billing",
      savings: 33500.00,
      currency: "NGN"
    }
  ],
  totalMonthlySavingsPotential: 185500.00,
  totalMonthlySavingsPotentialCurrency: "NGN",
  currentPathValue: -1200000.00,
  currentPathValueCurrency: "NGN",
  newPathValue: 2600000.00,
  newPathValueCurrency: "NGN",
  pathDifference: 3800000.00,
  pathDifferenceCurrency: "NGN",
  startBalance: -87954.79,
  startBalanceCurrency: "NGN",
  targetBalance: 0,
  targetBalanceCurrency: "NGN",
};
