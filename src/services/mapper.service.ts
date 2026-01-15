/**
 * Mapper Service
 * Converts flat AI-generated JSON to structured better-output.json format
 */

import { FlatAnalysisData } from '../mocks/flat';

/**
 * Exhaustive currency symbol map
 */
const CURRENCY_SYMBOLS: Record<string, string> = {
  // African currencies
  NGN: '₦',    // Nigerian Naira
  GHS: '₵',    // Ghanaian Cedi
  KES: 'KSh',  // Kenyan Shilling
  ZAR: 'R',    // South African Rand
  EGP: 'E£',   // Egyptian Pound
  TZS: 'TSh',  // Tanzanian Shilling
  UGX: 'USh',  // Ugandan Shilling
  MAD: 'DH',   // Moroccan Dirham
  XOF: 'CFA',  // West African CFA Franc
  XAF: 'FCFA', // Central African CFA Franc
  ETB: 'Br',   // Ethiopian Birr
  BWP: 'P',    // Botswana Pula
  MUR: '₨',    // Mauritian Rupee

  // Major global currencies
  USD: '$',    // US Dollar
  EUR: '€',    // Euro
  GBP: '£',    // British Pound
  JPY: '¥',    // Japanese Yen
  CNY: '¥',    // Chinese Yuan
  CHF: 'Fr',   // Swiss Franc
  CAD: 'C$',   // Canadian Dollar
  AUD: 'A$',   // Australian Dollar
  NZD: 'NZ$',  // New Zealand Dollar

  // Asian currencies
  INR: '₹',    // Indian Rupee
  PKR: '₨',    // Pakistani Rupee
  BDT: '৳',    // Bangladeshi Taka
  SGD: 'S$',   // Singapore Dollar
  HKD: 'HK$',  // Hong Kong Dollar
  MYR: 'RM',   // Malaysian Ringgit
  THB: '฿',    // Thai Baht
  IDR: 'Rp',   // Indonesian Rupiah
  PHP: '₱',    // Philippine Peso
  VND: '₫',    // Vietnamese Dong
  KRW: '₩',    // South Korean Won

  // Middle Eastern currencies
  AED: 'د.إ',  // UAE Dirham
  SAR: '﷼',    // Saudi Riyal
  QAR: '﷼',    // Qatari Riyal
  KWD: 'د.ك',  // Kuwaiti Dinar
  BHD: 'د.ب',  // Bahraini Dinar
  OMR: '﷼',    // Omani Rial
  JOD: 'د.ا',  // Jordanian Dinar
  ILS: '₪',    // Israeli Shekel

  // Latin American currencies
  BRL: 'R$',   // Brazilian Real
  MXN: 'MX$',  // Mexican Peso
  ARS: 'AR$',  // Argentine Peso
  CLP: 'CL$',  // Chilean Peso
  COP: 'CO$',  // Colombian Peso
  PEN: 'S/',   // Peruvian Sol

  // Eastern European currencies
  RUB: '₽',    // Russian Ruble
  PLN: 'zł',   // Polish Zloty
  CZK: 'Kč',   // Czech Koruna
  HUF: 'Ft',   // Hungarian Forint
  RON: 'lei',  // Romanian Leu
  TRY: '₺',    // Turkish Lira
};

/**
 * Get currency symbol from currency code
 */
const getCurrencySymbol = (currencyCode: string): string => {
  return CURRENCY_SYMBOLS[currencyCode] || currencyCode;
};

/**
 * Validation functions to check if screens have sufficient data
 * Returns true if the screen can be displayed (has required fields populated)
 */

const isValidNumber = (value: any): boolean => {
  return typeof value === 'number' && !isNaN(value) && value !== 0;
};

const isValidString = (value: any): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};

const isValidArray = (value: any, minLength: number = 1): boolean => {
  return Array.isArray(value) && value.length >= minLength;
};

const validateOverviewScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidNumber(flat.totalInflow) &&
    isValidNumber(flat.totalOutflow) &&
    isValidNumber(flat.healthScore) &&
    isValidString(flat.healthRating)
  );
};

const validateAnalysisSummaryScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidNumber(flat.totalTransactions) &&
    isValidNumber(flat.uniqueMerchants) &&
    isValidNumber(flat.totalSpending)
  );
};

const validatePersonalityScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidString(flat.personalityArchetype) &&
    isValidArray(flat.traits, 3) &&
    isValidArray(flat.traitLevels, 3) &&
    isValidString(flat.moneyPhilosophy)
  );
};

const validateFinancialHealthScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidNumber(flat.healthScore) &&
    isValidString(flat.healthRating) &&
    isValidString(flat.monthlyGrade)
  );
};

const validateFinancialReportScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidNumber(flat.healthScore) &&
    isValidString(flat.healthRating) &&
    isValidString(flat.monthlyGrade)
  );
};

const validateFinancialChallengeScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidString(flat.primaryConcernTitle) &&
    isValidNumber(flat.primaryConcernMonthlyCost) &&
    isValidNumber(flat.primaryConcernAnnualCost)
  );
};

const validateSpenderPersonalityScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidString(flat.personalityArchetype) &&
    isValidArray(flat.spenderDescriptions, 1) &&
    isValidArray(flat.traits, 1)
  );
};

const validateTheBigPictureScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidNumber(flat.totalInflow) &&
    isValidNumber(flat.totalOutflow) &&
    isValidNumber(flat.netCashflow) &&
    isValidString(flat.moneyInTopContributorLabel) &&
    isValidString(flat.moneyOutTopContributorLabel)
  );
};

const validateSpendingBreakdownScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidNumber(flat.totalSpending) &&
    isValidArray(flat.spendingCategories, 1)
  );
};

const validateTransfersToPeopleScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidNumber(flat.transfersTotal) &&
    isValidNumber(flat.transfersCount) &&
    isValidNumber(flat.uniqueRecipients) &&
    flat.transfersTotal > 0
  );
};

const validateDailyBurnRateScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidNumber(flat.dailyBurnRate) &&
    isValidNumber(flat.hourlyBurnRate) &&
    isValidNumber(flat.minuteBurnRate) &&
    isValidNumber(flat.sleepBurnRate)
  );
};

const validateYourPeopleStatScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidNumber(flat.peopleStatValue) &&
    isValidNumber(flat.totalSentToPeople) &&
    isValidNumber(flat.uniqueRecipients) &&
    flat.peopleStatValue > 0
  );
};

const validateTopRecipientScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidString(flat.topRecipientName) &&
    isValidNumber(flat.topRecipientAmount) &&
    isValidNumber(flat.topRecipientCount) &&
    flat.topRecipientAmount > 0
  );
};

const validateTheRegularRecipientScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidString(flat.regularRecipientName) &&
    isValidNumber(flat.regularRecipientAmount) &&
    isValidNumber(flat.regularRecipientCount) &&
    isValidNumber(flat.regularRecipientFrequency) &&
    flat.regularRecipientCount >= 3  // Need at least 3 transfers to be "regular"
  );
};

const validateTheLoanSuspectsScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidNumber(flat.totalUntrackedTransfers) &&
    isValidNumber(flat.loanSuspectCount) &&
    isValidArray(flat.loanSuspects, 1) &&
    flat.loanSuspectCount > 0
  );
};

const validateFavoriteSpotScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidString(flat.favoriteRestaurantName) &&
    isValidNumber(flat.favoriteRestaurantVisits) &&
    isValidNumber(flat.favoriteRestaurantTotal) &&
    flat.favoriteRestaurantVisits >= 3  // Need at least 3 visits to be "favorite"
  );
};

const validateYouVsWorldOneScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidNumber(flat.restaurantSpendingAmount) &&
    isValidNumber(flat.restaurantSpendingPercentile) &&
    isValidNumber(flat.restaurantSpendingNigerianAvg) &&
    flat.restaurantSpendingAmount > 0
  );
};

const validateYouVsTheWorldRankScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidNumber(flat.savingsRankPercentile) &&
    isValidArray(flat.categoryComparisons, 1) &&
    isValidArray(flat.keyTakeaways, 1)
  );
};

const validateYourBiggestThreatScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidNumber(flat.overdraftDays) &&
    isValidNumber(flat.overdraftInterestPaid) &&
    isValidNumber(flat.overdraftTotalDays) &&
    flat.overdraftDays > 0  // Only show if there were overdraft days
  );
};

const validateYourBiggestWinsScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidArray(flat.biggestWins, 1) &&
    isValidNumber(flat.combinedProtectionValue)
  );
};

const validateThePathForwardScreen = (flat: FlatAnalysisData): boolean => {
  return (
    isValidArray(flat.actionSteps, 1) &&
    isValidNumber(flat.totalMonthlySavingsPotential) &&
    isValidNumber(flat.startBalance) &&
    isValidNumber(flat.targetBalance)
  );
};

/**
 * Helper function to format currency
 */
const formatCurrency = (amount: number, currencyCode: string): string => {
  const symbol = getCurrencySymbol(currencyCode);
  const absAmount = Math.abs(amount);

  if (absAmount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(2)}M`;
  } else if (absAmount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(0)}k`;
  } else {
    return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
};

/**
 * Helper function to format currency with commas
 */
const formatCurrencyWithCommas = (amount: number, currencyCode: string): string => {
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

/**
 * Helper function to format date
 */
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

/**
 * Main mapper function
 * Takes flat AI data and returns structured better-output.json
 */
export function mapFlatDataToBetterOutput(flat: FlatAnalysisData) {
  if (!flat) return {};
  return {
    analysis_metadata: {
      period_start: flat.periodStart ?? '',
      period_end: flat.periodEnd ?? '',
      days_analyzed: flat.daysAnalyzed ?? 0,
      analysis_date: flat.analysisDate ?? '',
      statement_bank: flat.statementBank ?? '',
      account_type: flat.accountType ?? '',
      currency: flat.currency ?? 'NGN',
      perceived_country: flat.perceivedCountry ?? ''
    },

    overview: {
      screenNumber: 1,
      screenName: "overview",
      needed: validateOverviewScreen(flat),
      brandName: "FinanceWrapped",
      year: new Date(flat.periodEnd ?? new Date()).getFullYear().toString(),
      mainHeading: "Your Financial Story",
      periodSubtitle: `${new Date(flat.periodStart ?? new Date()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      totalIncome: {
        value: flat.totalInflow ?? 0,
        displayValue: formatCurrency(flat.totalInflow ?? 0, flat.totalInflowCurrency ?? flat.currency ?? 'NGN'),
        currencyCode: flat.totalInflowCurrency ?? flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.totalInflowCurrency ?? flat.currency ?? 'NGN')
      },
      totalOutflow: {
        value: flat.totalOutflow ?? 0,
        displayValue: formatCurrency(flat.totalOutflow ?? 0, flat.totalOutflowCurrency ?? flat.currency ?? 'NGN'),
        currencyCode: flat.totalOutflowCurrency ?? flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.totalOutflowCurrency ?? flat.currency ?? 'NGN')
      },
      healthScore: {
        value: flat.healthScore ?? 0,
        displayValue: `${flat.healthScore ?? 0}%`
      },
      metadata: {
        periodStart: flat.periodStart ?? '',
        periodEnd: flat.periodEnd ?? '',
        daysAnalyzed: flat.daysAnalyzed ?? 0,
        analysisDate: flat.analysisDate ?? '',
        source: "analysis_metadata"
      }
    },

    analysis_summary: {
      screenNumber: 2,
      screenName: "analysis_summary",
      needed: validateAnalysisSummaryScreen(flat),
      progressIndicator: "2 / 32",
      badge: "THE ANALYSIS",
      mainHeading: "We analyzed your",
      highlightedPeriod: new Date(flat.periodStart ?? new Date()).toLocaleDateString('en-US', { month: 'long' }),
      daysAnalyzed: {
        value: flat.daysAnalyzed ?? 0,
        displayValue: (flat.daysAnalyzed ?? 0).toString(),
        label: "DAYS ANALYZED"
      },
      totalTransactions: {
        value: flat.totalTransactions ?? 0,
        displayValue: (flat.totalTransactions ?? 0).toString(),
        label: "TRANSACTIONS"
      },
      totalSpent: {
        value: flat.totalSpending ?? 0,
        displayValue: formatCurrency(flat.totalSpending ?? 0, flat.currency ?? 'NGN'),
        currencyCode: flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.currency ?? 'NGN'),
        label: "TOTAL SPENT"
      },
      uniqueMerchants: {
        value: flat.uniqueMerchants ?? 0,
        displayValue: (flat.uniqueMerchants ?? 0).toString(),
        label: "UNIQUE MERCHANTS"
      }
    },

    personality_screen: {
      screenNumber: 3,
      screenName: "personality_screen",
      needed: validatePersonalityScreen(flat),
      progressIndicator: "3/32",
      personalityArchetype: {
        value: flat.personalityArchetype ?? '',
        displayValue: flat.personalityArchetype ?? '',
        traits: (flat.traits ?? []).slice(0, 3)
      },
      insights: (flat.personalityInsights ?? []).map((insight) => {
        if (insight.type === 'transfer') {
          return {
            title: insight.title ?? '',
            percentage: {
              value: insight.percentage ?? 0,
              displayValue: `${Math.round((insight.percentage ?? 0) * 100)}%`
            },
            description: insight.description ?? ''
          };
        } else if (insight.type === 'merchant') {
          return {
            title: insight.title ?? '',
            subtitle: insight.subtitle ?? '',
            visits: {
              value: insight.value ?? 0,
              displayValue: `${insight.value ?? 0} visits`
            },
            amount: {
              value: insight.percentage ?? 0,
              displayValue: formatCurrencyWithCommas(insight.percentage ?? 0, flat.currency ?? 'NGN'),
              currencyCode: flat.currency ?? 'NGN',
              currencySymbol: getCurrencySymbol(flat.currency ?? 'NGN')
            }
          };
        } else {
          return {
            title: insight.title ?? '',
            subtitle: insight.subtitle ?? '',
            timeWindow: insight.timeWindow ?? ''
          };
        }
      })
    },

    financial_health: {
      screenNumber: 4,
      screenName: "financial_health",
      needed: validateFinancialHealthScreen(flat),
      progressIndicator: "4 / 32",
      badge: "FINANCIAL HEALTH",
      healthScore: {
        value: flat.healthScore ?? 0,
        displayValue: (flat.healthScore ?? 0).toString(),
        maxValue: 100,
        displayText: "/100"
      },
      healthRating: {
        value: flat.healthRating ?? 'poor',
        displayValue: (flat.healthRating ?? 'poor').toUpperCase()
      },
      message: "Your finances need immediate attention.",
      comparison: {
        userScore: {
          value: flat.healthScore ?? 0,
          displayValue: `${flat.healthScore ?? 0}%`,
          label: "You"
        },
        nigerianAverage: {
          value: flat.nigerianAvgHealthScore ?? 0,
          displayValue: `${flat.nigerianAvgHealthScore ?? 0}%`,
          label: "Nigerian Average"
        }
      },
      ctaText: "Swipe to continue"
    },

    financial_report: {
      screenNumber: 5,
      screenName: "financial_report",
      needed: validateFinancialReportScreen(flat),
      progressIndicator: "5/32",
      badge: "YOUR GRADE",
      mainHeading: `Your ${new Date(flat.periodStart ?? new Date()).toLocaleDateString('en-US', { month: 'long' })} report card`,
      reportCard: {
        brandName: "FINANCEWRAPPED",
        reportDate: {
          label: "REPORT DATE",
          value: new Date(flat.periodEnd ?? new Date()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        },
        title: "MONTHLY FINANCIAL REPORT",
        grade: {
          value: flat.monthlyGrade ?? 'F',
          displayValue: flat.monthlyGrade ?? 'F'
        },
        status: {
          value: `${(flat.healthRating ?? 'poor').charAt(0).toUpperCase() + (flat.healthRating ?? 'poor').slice(1)} Status`,
          displayValue: `${(flat.healthRating ?? 'poor').charAt(0).toUpperCase() + (flat.healthRating ?? 'poor').slice(1)} Status`
        },
        healthScore: {
          label: "Health Score:",
          value: flat.healthScore ?? 0,
          maxValue: 100,
          displayValue: `${flat.healthScore ?? 0}/100`
        },
        primaryConcern: {
          label: "PRIMARY CONCERN:",
          title: `${flat.primaryConcernTitle ?? ''} costing`,
          amount: {
            value: flat.primaryConcernMonthlyCost ?? 0,
            displayValue: formatCurrency(flat.primaryConcernMonthlyCost ?? 0, flat.primaryConcernMonthlyCostCurrency ?? flat.currency ?? 'NGN'),
            currencyCode: flat.primaryConcernMonthlyCostCurrency ?? flat.currency ?? 'NGN',
            currencySymbol: getCurrencySymbol(flat.primaryConcernMonthlyCostCurrency ?? flat.currency ?? 'NGN')
          },
          suffix: "monthly."
        }
      },
      ctaText: "SWIPE FOR DETAILS"
    },

    financial_challenge: {
      screenNumber: 6,
      screenName: "financial_challenge",
      needed: validateFinancialChallengeScreen(flat),
      progressIndicator: "6/32",
      badge: "PRIMARY CONCERN",
      mainHeading: "Your Biggest",
      highlightedWord: "Challenge",
      problemStatement: {
        label: "PROBLEM STATEMENT",
        title: flat.primaryConcernTitle ?? ''
      },
      monthlyCost: {
        label: "Monthly Interest Cost",
        value: flat.primaryConcernMonthlyCost ?? 0,
        displayValue: formatCurrencyWithCommas(flat.primaryConcernMonthlyCost ?? 0, flat.primaryConcernMonthlyCostCurrency ?? flat.currency ?? 'NGN'),
        currencyCode: flat.primaryConcernMonthlyCostCurrency ?? flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.primaryConcernMonthlyCostCurrency ?? flat.currency ?? 'NGN')
      },
      projectedImpact: {
        label: "PROJECTED IMPACT (2026)",
        message: "You are on track to lose",
        amount: {
          value: flat.primaryConcernAnnualCost ?? 0,
          displayValue: formatCurrency(flat.primaryConcernAnnualCost ?? 0, flat.primaryConcernAnnualCostCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.primaryConcernAnnualCostCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.primaryConcernAnnualCostCurrency ?? flat.currency ?? 'NGN')
        },
        suffix: "to interest fees if left unchecked."
      },
      ctaText: "SWIPE TO CONTINUE"
    },

    spender_personality: {
      screenNumber: 7,
      screenName: "spender_personality",
      needed: validateSpenderPersonalityScreen(flat),
      progressIndicator: "7/32",
      badge: "YOUR PERSONALITY",
      mainHeading: (flat.personalityArchetype ?? '').split(' ').slice(0, 2).join(' '),
      highlightedText: (flat.personalityArchetype ?? '').split(' ').slice(2).join(' '),
      subtitle: "Your relationship with money",
      description: (flat.spenderDescriptions ?? []).map(desc => ({
        text: desc.text ?? '',
        highlighted: desc.highlighted ?? '',
        suffix: desc.suffix ?? ''
      })),
      traits: (flat.traits ?? []).map((trait, idx) => ({
        category: trait ?? '',
        value: ((flat.traitLevels ?? [])[idx] ?? 'medium').charAt(0).toUpperCase() + ((flat.traitLevels ?? [])[idx] ?? 'medium').slice(1),
        level: (flat.traitLevels ?? [])[idx] ?? 'medium'
      })),
      moneyPhilosophy: {
        label: "MONEY PHILOSOPHY",
        quote: flat.moneyPhilosophy ?? ''
      }
    },

    the_big_picture: {
      screenNumber: 8,
      screenName: "the_big_picture",
      needed: validateTheBigPictureScreen(flat),
      progressIndicator: "8/32",
      badge: "THE BIG PICTURE",
      mainHeading: "Your xxx cash flow",
      moneyIn: {
        label: "MONEY IN",
        value: flat.totalInflow ?? 0,
        displayValue: formatCurrency(flat.totalInflow ?? 0, flat.totalInflowCurrency ?? flat.currency ?? 'NGN'),
        currencyCode: flat.totalInflowCurrency ?? flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.totalInflowCurrency ?? flat.currency ?? 'NGN'),
        topContributor: {
          label: flat.moneyInTopContributorLabel ?? '',
          percentage: flat.moneyInTopContributorPercentage ?? 0
        }
      },
      moneyOut: {
        label: "MONEY OUT",
        value: flat.totalOutflow ?? 0,
        displayValue: formatCurrency(flat.totalOutflow ?? 0, flat.totalOutflowCurrency ?? flat.currency ?? 'NGN'),
        currencyCode: flat.totalOutflowCurrency ?? flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.totalOutflowCurrency ?? flat.currency ?? 'NGN'),
        topContributor: {
          label: flat.moneyOutTopContributorLabel ?? '',
          percentage: flat.moneyOutTopContributorPercentage ?? 0
        }
      },
      netResult: {
        label: "Net Result",
        status: (flat.netCashflow ?? 0) < 0 ? "DEFICIT" : "SURPLUS",
        calculation: "In - Out =",
        value: flat.netCashflow ?? 0,
        displayValue: formatCurrency(flat.netCashflow ?? 0, flat.netCashflowCurrency ?? flat.currency ?? 'NGN'),
        currencyCode: flat.netCashflowCurrency ?? flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.netCashflowCurrency ?? flat.currency ?? 'NGN')
      },
      insight: {
        message: flat.cashFlowInsightMessage ?? '',
        recommendation: flat.cashFlowRecommendation ?? ''
      }
    },

    spending_breakdown: {
      screenNumber: 9,
      screenName: "spending_breakdown",
      needed: validateSpendingBreakdownScreen(flat),
      progressIndicator: "9/32",
      badge: "SPENDING BREAKDOWN",
      totalSpent: {
        label: "TOTAL SPENT",
        value: flat.totalSpending ?? 0,
        displayValue: formatCurrency(flat.totalSpending ?? 0, flat.currency ?? 'NGN'),
        currencyCode: flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.currency ?? 'NGN')
      },
      categories: (flat.spendingCategories ?? []).map((cat, idx) => {
        const colors = ["purple", "pink", "teal", "orange", "gray"];
        return {
          name: cat.name ?? '',
          amount: {
            value: cat.amount ?? 0,
            displayValue: formatCurrency(cat.amount ?? 0, cat.currency ?? flat.currency ?? 'NGN'),
            currencyCode: cat.currency ?? flat.currency ?? 'NGN',
            currencySymbol: getCurrencySymbol(cat.currency ?? flat.currency ?? 'NGN')
          },
          percentage: {
            value: cat.percentage ?? 0,
            displayValue: `${Math.round((cat.percentage ?? 0) * 100)}%`
          },
          transactionCount: {
            value: cat.count ?? 0,
            displayValue: `${cat.count ?? 0} transactions`
          },
          color: colors[idx] || "gray"
        };
      })
    },

    transfers_to_people: {
      screenNumber: 10,
      screenName: "transfers_to_people",
      needed: validateTransfersToPeopleScreen(flat),
      progressIndicator: "10/32",
      badge: "#1 CATEGORY",
      mainHeading: "Transfers to People",
      subtitle: "Your money moves faster than you do.",
      totalAmount: {
        value: flat.transfersTotal ?? 0,
        displayValue: formatCurrencyWithCommas(flat.transfersTotal ?? 0, flat.transfersTotalCurrency ?? flat.currency ?? 'NGN'),
        currencyCode: flat.transfersTotalCurrency ?? flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.transfersTotalCurrency ?? flat.currency ?? 'NGN')
      },
      percentage: {
        value: flat.transfersPercentage ?? 0,
        displayValue: `${Math.round((flat.transfersPercentage ?? 0) * 100)}% of all spending`
      },
      stats: [
        {
          label: "TOTAL TRANSACTIONS",
          value: flat.transfersCount ?? 0,
          displayValue: (flat.transfersCount ?? 0).toString()
        },
        {
          label: "AVERAGE AMOUNT",
          value: flat.transfersAvgAmount ?? 0,
          displayValue: formatCurrencyWithCommas(flat.transfersAvgAmount ?? 0, flat.transfersAvgAmountCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.transfersAvgAmountCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.transfersAvgAmountCurrency ?? flat.currency ?? 'NGN')
        },
        {
          label: "REACH",
          value: flat.uniqueRecipients ?? 0,
          displayValue: `${flat.uniqueRecipients ?? 0} People`
        },
        {
          label: "FREQUENCY",
          value: flat.transferFrequency ?? 'monthly',
          displayValue: (flat.transferFrequency ?? 'monthly').charAt(0).toUpperCase() + (flat.transferFrequency ?? 'monthly').slice(1)
        }
      ],
      insight: {
        title: flat.transferInsightTitle ?? '',
        message: flat.transferInsightMessage ?? ''
      }
    },

    daily_burn_rate: {
      screenNumber: 12,
      screenName: "daily_burn_rate",
      needed: validateDailyBurnRateScreen(flat),
      progressIndicator: "12/32",
      badge: "BURN RATE",
      mainHeading: "Your daily burn rate",
      dailyBurnRate: {
        value: flat.dailyBurnRate ?? 0,
        displayValue: formatCurrencyWithCommas(flat.dailyBurnRate ?? 0, flat.dailyBurnRateCurrency ?? flat.currency ?? 'NGN'),
        currencyCode: flat.dailyBurnRateCurrency ?? flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.dailyBurnRateCurrency ?? flat.currency ?? 'NGN'),
        label: "per day"
      },
      breakdowns: [
        {
          label: "Per Hour",
          sublabel: "AVERAGE FLOW",
          value: flat.hourlyBurnRate ?? 0,
          displayValue: formatCurrencyWithCommas(flat.hourlyBurnRate ?? 0, flat.hourlyBurnRateCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.hourlyBurnRateCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.hourlyBurnRateCurrency ?? flat.currency ?? 'NGN')
        },
        {
          label: "Per Minute",
          sublabel: "HIGH INTENSITY",
          value: flat.minuteBurnRate ?? 0,
          displayValue: formatCurrencyWithCommas(flat.minuteBurnRate ?? 0, flat.minuteBurnRateCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.minuteBurnRateCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.minuteBurnRateCurrency ?? flat.currency ?? 'NGN')
        },
        {
          label: "While you sleep",
          sublabel: "8 HOURS TOTAL",
          value: flat.sleepBurnRate ?? 0,
          displayValue: formatCurrencyWithCommas(flat.sleepBurnRate ?? 0, flat.sleepBurnRateCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.sleepBurnRateCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.sleepBurnRateCurrency ?? flat.currency ?? 'NGN')
        }
      ],
      liveBurn: {
        label: "LIVE BURN",
        amount: {
          value: 15,
          displayValue: `${getCurrencySymbol(flat.currency ?? 'NGN')}15`,
          currencyCode: flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.currency ?? 'NGN')
        },
        message: "burned since opening"
      },
      perspective: {
        label: "PERSPECTIVE",
        message: flat.burnPerspectiveMessage ?? ''
      }
    },

    your_people_stat: {
      screenNumber: 13,
      screenName: "your_people_stat",
      needed: validateYourPeopleStatScreen(flat),
      progressIndicator: "13/32",
      badge: "YOUR PEOPLE",
      shockingStat: {
        label: "SHOCKING STAT",
        value: flat.peopleStatValue ?? 0,
        displayValue: (flat.peopleStatValue ?? 0).toString(),
        description: flat.peopleStatDescription ?? '',
        subtitle: flat.peopleStatSubtitle ?? ''
      },
      stats: [
        {
          label: "TOTAL SENT",
          value: flat.totalSentToPeople ?? 0,
          displayValue: formatCurrency(flat.totalSentToPeople ?? 0, flat.totalSentToPeopleCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.totalSentToPeopleCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.totalSentToPeopleCurrency ?? flat.currency ?? 'NGN')
        },
        {
          label: "AVG PER PERSON",
          value: flat.avgPerPerson ?? 0,
          displayValue: formatCurrencyWithCommas(flat.avgPerPerson ?? 0, flat.avgPerPersonCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.avgPerPersonCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.avgPerPersonCurrency ?? flat.currency ?? 'NGN')
        },
        {
          label: "PEOPLE PER DAY",
          value: flat.peoplePerDay ?? 0,
          displayValue: (flat.peoplePerDay ?? 0).toFixed(2)
        }
      ],
      achievement: {
        title: "Achievement Unlocked!",
        badge: flat.achievementBadge ?? '',
        cta: "View Badge"
      },
      realityCheck: {
        label: "REALITY CHECK",
        message: flat.realityCheckMessage ?? ''
      }
    },

    top_recipient: {
      screenNumber: 14,
      screenName: "top_recipient",
      needed: validateTopRecipientScreen(flat),
      progressIndicator: "14/32",
      badge: "TOP RECIPIENT",
      rank: 1,
      recipient: {
        name: flat.topRecipientName ?? '',
        initials: flat.topRecipientInitials ?? '',
        relationshipTypeEstimation: flat.topRecipientRelationship ?? '',
        quote: flat.topRecipientQuote ?? ''
      },
      totalSent: {
        label: "TOTAL SENT",
        value: flat.topRecipientAmount ?? 0,
        displayValue: formatCurrencyWithCommas(flat.topRecipientAmount ?? 0, flat.topRecipientAmountCurrency ?? flat.currency ?? 'NGN'),
        currencyCode: flat.topRecipientAmountCurrency ?? flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.topRecipientAmountCurrency ?? flat.currency ?? 'NGN')
      },
      transactionCount: {
        value: flat.topRecipientCount ?? 0,
        displayValue: `${flat.topRecipientCount ?? 0} TRANSACTIONS`
      },
      transferTimeline: {
        label: "TRANSFER TIMELINE",
        dates: (flat.topRecipientDates ?? []).map(date => ({
          date: date,
          displayValue: formatDate(date)
        }))
      },
      patternDetected: {
        label: "PATTERN DETECTED",
        message: flat.topRecipientPattern ?? ''
      }
    },

    the_regular_recipient: {
      screenNumber: 15,
      screenName: "the_regular_recipient",
      needed: validateTheRegularRecipientScreen(flat),
      progressIndicator: "15/32",
      badge: "THE REGULAR",
      recipient: {
        name: flat.regularRecipientName ?? '',
        relationshipTypeEstimation: flat.regularRecipientRelationship ?? '',
        photoPlaceholder: "user_photo"
      },
      consistencyFrequency: {
        label: "Consistency frequency",
        value: flat.regularRecipientFrequency ?? 0,
        displayValue: `Every ${(flat.regularRecipientFrequency ?? 0).toFixed(1)} Days`,
        subtitle: `${flat.regularRecipientCount ?? 0} transfers in total`
      },
      stats: [
        {
          label: "TOTAL SENT",
          value: flat.regularRecipientAmount ?? 0,
          displayValue: formatCurrencyWithCommas(flat.regularRecipientAmount ?? 0, flat.regularRecipientAmountCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.regularRecipientAmountCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.regularRecipientAmountCurrency ?? flat.currency ?? 'NGN')
        },
        {
          label: "CONSISTENCY",
          value: flat.regularRecipientConsistency ?? 0,
          displayValue: `${Math.round((flat.regularRecipientConsistency ?? 0) * 100)}% Score`
        }
      ],
      recentTransfers: {
        label: "RECENT TRANSFERS",
        transactions: (flat.regularRecipientRecentTransfers ?? []).map(t => ({
          date: t.date ?? '',
          time: t.time ?? '',
          amount: {
            value: t.amount ?? 0,
            displayValue: formatCurrencyWithCommas(t.amount ?? 0, t.currency ?? flat.currency ?? 'NGN'),
            currencyCode: t.currency ?? flat.currency ?? 'NGN',
            currencySymbol: getCurrencySymbol(t.currency ?? flat.currency ?? 'NGN')
          }
        }))
      },
      insight: {
        title: flat.regularRecipientInsightTitle ?? '',
        message: flat.regularRecipientInsightMessage ?? '',
        cta: "Automate Now"
      }
    },

    the_loan_suspects: {
      screenNumber: 16,
      screenName: "the_loan_suspects",
      needed: validateTheLoanSuspectsScreen(flat),
      progressIndicator: "16 / 32",
      badge: "LOAN SUSPECTS",
      mainHeading: "The Loan Suspects",
      subtitle: "We found large transfers that look like untracked loans.",
      totalUntrackedTransfers: {
        label: "TOTAL UNTRACKED TRANSFERS",
        value: flat.totalUntrackedTransfers ?? 0,
        displayValue: formatCurrencyWithCommas(flat.totalUntrackedTransfers ?? 0, flat.totalUntrackedTransfersCurrency ?? flat.currency ?? 'NGN'),
        currencyCode: flat.totalUntrackedTransfersCurrency ?? flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.totalUntrackedTransfersCurrency ?? flat.currency ?? 'NGN'),
        peopleCount: {
          value: flat.loanSuspectCount ?? 0,
          displayValue: `Across ${flat.loanSuspectCount ?? 0} people`
        }
      },
      suspects: (flat.loanSuspects ?? []).map(suspect => ({
        name: suspect.name ?? '',
        date: suspect.date ?? '',
        amount: {
          value: suspect.amount ?? 0,
          displayValue: formatCurrencyWithCommas(suspect.amount ?? 0, suspect.currency ?? flat.currency ?? 'NGN'),
          currencyCode: suspect.currency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(suspect.currency ?? flat.currency ?? 'NGN')
        },
        frequency: "ONE-TIME",
        avatar: "user_avatar"
      })),
      moreCount: {
        value: flat.loanSuspectsMoreCount ?? 0,
        displayValue: `+ ${flat.loanSuspectsMoreCount ?? 0} more suspects`
      }
    },

    favorite_spot: {
      screenNumber: 17,
      screenName: "favorite_spot",
      needed: validateFavoriteSpotScreen(flat),
      progressIndicator: "CARD 17 OF 32",
      badge: "YOUR FAVORITE SPOT",
      starIcon: "stars",
      loyaltyBadge: "LOYAL",
      merchant: {
        name: flat.favoriteRestaurantName ?? '',
        photo: "restaurant_photo",
        visits: {
          value: flat.favoriteRestaurantVisits ?? 0,
          displayValue: `${flat.favoriteRestaurantVisits ?? 0} visits this year`
        },
        quote: flat.favoriteRestaurantQuote ?? ''
      },
      stats: [
        {
          label: "TOTAL SPENT",
          value: flat.favoriteRestaurantTotal ?? 0,
          displayValue: formatCurrencyWithCommas(flat.favoriteRestaurantTotal ?? 0, flat.favoriteRestaurantTotalCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.favoriteRestaurantTotalCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.favoriteRestaurantTotalCurrency ?? flat.currency ?? 'NGN')
        },
        {
          label: "AVERAGE BILL",
          value: flat.favoriteRestaurantAvgBill ?? 0,
          displayValue: formatCurrencyWithCommas(flat.favoriteRestaurantAvgBill ?? 0, flat.favoriteRestaurantAvgBillCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.favoriteRestaurantAvgBillCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.favoriteRestaurantAvgBillCurrency ?? flat.currency ?? 'NGN')
        }
      ],
      visitFrequency: {
        label: "VISIT FREQUENCY",
        timeline: {
          startMonth: "JAN",
          endMonth: "DEC",
          dataPoints: flat.favoriteRestaurantVisits ?? 0
        }
      },
      loyaltyScore: {
        label: "LOYALTY SCORE",
        value: flat.favoriteRestaurantLoyaltyScore ?? 0,
        maxValue: 10,
        displayValue: `${flat.favoriteRestaurantLoyaltyScore ?? 0}/10`
      },
      insight: {
        icon: "house",
        title: flat.favoriteRestaurantInsightTitle ?? '',
        message: flat.favoriteRestaurantInsightMessage ?? ''
      }
    },

    you_vs_world_one: {
      screenNumber: 30,
      screenName: "you_vs_world_one",
      needed: validateYouVsWorldOneScreen(flat),
      progressIndicator: "30/32",
      badge: "Act 8: You vs The World",
      category: {
        label: "RESTAURANT SPENDING",
        value: "restaurant_spending"
      },
      percentile: {
        value: flat.restaurantSpendingPercentile ?? 0,
        displayValue: `${flat.restaurantSpendingPercentile ?? 0}nd percentile`
      },
      visualization: {
        label: "VISUALIZING THE CROWD",
        legend: "1 dot = 1% of Nigeria"
      },
      yourSpending: {
        label: "YOUR SPENDING",
        value: flat.restaurantSpendingAmount ?? 0,
        displayValue: formatCurrencyWithCommas(flat.restaurantSpendingAmount ?? 0, flat.restaurantSpendingAmountCurrency ?? flat.currency ?? 'NGN'),
        currencyCode: flat.restaurantSpendingAmountCurrency ?? flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.restaurantSpendingAmountCurrency ?? flat.currency ?? 'NGN'),
        multiplier: {
          value: flat.restaurantSpendingMultiplier ?? 0,
          displayValue: `${flat.restaurantSpendingMultiplier ?? 0}x`
        }
      },
      comparison: {
        you: {
          label: "YOU",
          value: flat.restaurantSpendingAmount ?? 0,
          currencyCode: flat.restaurantSpendingAmountCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.restaurantSpendingAmountCurrency ?? flat.currency ?? 'NGN')
        },
        nigerianAverage: {
          label: `NIGERIAN AVERAGE (${formatCurrencyWithCommas(flat.restaurantSpendingNigerianAvg ?? 0, flat.restaurantSpendingNigerianAvgCurrency ?? flat.currency ?? 'NGN')})`,
          value: flat.restaurantSpendingNigerianAvg ?? 0,
          displayValue: formatCurrencyWithCommas(flat.restaurantSpendingNigerianAvg ?? 0, flat.restaurantSpendingNigerianAvgCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.restaurantSpendingNigerianAvgCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.restaurantSpendingNigerianAvgCurrency ?? flat.currency ?? 'NGN')
        }
      },
      alert: {
        type: "Lifestyle Inflation Alert",
        message: flat.restaurantSpendingAlert ?? ''
      }
    },

    you_vs_the_world_rank: {
      screenNumber: 31,
      screenName: "you_vs_the_world_rank",
      needed: validateYouVsTheWorldRankScreen(flat),
      progressIndicator: "Card 31",
      badge: "Act 8: You vs The World",
      healthScore: {
        value: flat.healthScore ?? 0,
        displayValue: (flat.healthScore ?? 0).toString(),
        label: "HEALTH SCORE"
      },
      comparison: {
        title: "Below the Nigerian Average",
        subtitle: `Your financial health is currently lower than ${100 - (flat.healthScore ?? 0)}% of users in Nigeria.`
      },
      categoryByCategory: {
        title: "Category by Category",
        subtitle: "Monthly Avg",
        categories: (flat.categoryComparisons ?? []).map(cat => ({
          name: cat.name ?? '',
          yourValue: {
            value: cat.yourAmount ?? 0,
            displayValue: formatCurrency(cat.yourAmount ?? 0, cat.currency ?? flat.currency ?? 'NGN'),
            currencyCode: cat.currency ?? flat.currency ?? 'NGN',
            currencySymbol: getCurrencySymbol(cat.currency ?? flat.currency ?? 'NGN')
          },
          average: {
            value: cat.average ?? 0,
            displayValue: `${formatCurrency(cat.average ?? 0, cat.currency ?? flat.currency ?? 'NGN')} avg`,
            currencyCode: cat.currency ?? flat.currency ?? 'NGN',
            currencySymbol: getCurrencySymbol(cat.currency ?? flat.currency ?? 'NGN')
          },
          status: cat.status ?? 'average'
        }))
      },
      keyTakeaways: {
        title: "Key Takeaways",
        insights: (flat.keyTakeaways ?? []).map((takeaway, idx) => ({
          number: idx + 1,
          text: takeaway
        }))
      },
      whereYouRank: {
        title: "Where You Rank",
        rankings: [
          {
            category: "SAVINGS",
            rank: {
              value: 100 - (flat.savingsRankPercentile ?? 0),
              displayValue: `Top ${100 - (flat.savingsRankPercentile ?? 0)}%`,
              percentile: flat.savingsRankPercentile ?? 0
            },
            subtitle: "In your income bracket"
          },
          {
            category: "SUBSCRIPTIONS",
            rank: {
              value: 100 - (flat.subscriptionsRankPercentile ?? 0),
              displayValue: `Top ${100 - (flat.subscriptionsRankPercentile ?? 0)}%`,
              percentile: flat.subscriptionsRankPercentile ?? 0
            },
            subtitle: "Most efficient spend"
          },
          {
            category: "INVESTMENT",
            rank: {
              value: flat.investmentRankPercentile ?? 0,
              displayValue: `Bottom ${flat.investmentRankPercentile ?? 0}%`,
              percentile: flat.investmentRankPercentile ?? 0
            },
            subtitle: "Room for growth"
          },
          {
            category: "UTILITIES",
            rank: {
              value: 100 - (flat.utilitiesRankPercentile ?? 0),
              displayValue: `Top ${100 - (flat.utilitiesRankPercentile ?? 0)}%`,
              percentile: flat.utilitiesRankPercentile ?? 0
            },
            subtitle: "Right on the median"
          }
        ]
      },
      bottomLine: {
        title: "The Bottom Line",
        message: flat.rankingsBottomLine ?? '',
        cta: "Set a Saving Goal"
      },
      footer: {
        text: "Swipe for the Finale"
      }
    },

    your_biggest_threat: {
      screenNumber: 33,
      screenName: "your_biggest_threat",
      needed: validateYourBiggestThreatScreen(flat),
      progressIndicator: "33/32",
      badge: "BONUS",
      mainHeading: "Your Biggest Threat",
      threatType: {
        label: "THE OVERDRAFT TRAP",
        value: "overdraft_trap"
      },
      stats: [
        {
          label: "IN OVERDRAFT",
          value: flat.overdraftDays ?? 0,
          unit: "days",
          total: flat.overdraftTotalDays ?? 0,
          displayValue: `${flat.overdraftDays ?? 0}/${flat.overdraftTotalDays ?? 0} days`
        },
        {
          label: "INTEREST PAID",
          value: flat.overdraftInterestPaid ?? 0,
          displayValue: formatCurrency(flat.overdraftInterestPaid ?? 0, flat.overdraftInterestPaidCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.overdraftInterestPaidCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.overdraftInterestPaidCurrency ?? flat.currency ?? 'NGN')
        },
        {
          label: "CLOSING BAL",
          value: flat.overdraftClosingBalance ?? 0,
          displayValue: formatCurrency(flat.overdraftClosingBalance ?? 0, flat.overdraftClosingBalanceCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.overdraftClosingBalanceCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.overdraftClosingBalanceCurrency ?? flat.currency ?? 'NGN')
        },
        {
          label: "ANNUAL COST",
          value: flat.overdraftAnnualCost ?? 0,
          displayValue: formatCurrency(flat.overdraftAnnualCost ?? 0, flat.overdraftAnnualCostCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.overdraftAnnualCostCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.overdraftAnnualCostCurrency ?? flat.currency ?? 'NGN')
        }
      ],
      yourDecemberInRed: {
        title: "Your December in Red",
        subtitle: "Every single day was spent below zero.",
        calendar: {
          totalDays: flat.overdraftTotalDays ?? 0,
          daysInOverdraft: flat.overdraftDays ?? 0,
          daysPositive: flat.overdraftDaysPositive ?? 0
        }
      },
      theViciousCycle: {
        title: "The Vicious Cycle",
        steps: (flat.overdraftViciousCycleSteps ?? []).map((step, idx) => ({
          number: idx + 1,
          title: step.title ?? '',
          description: step.description ?? ''
        }))
      },
      severityLevel: {
        label: "SEVERITY LEVEL",
        value: "critical",
        displayValue: "CRITICAL",
        message: flat.overdraftSeverityMessage ?? ''
      },
      cta: {
        text: "Immediate Action Required",
        actionType: "urgent"
      },
      footer: {
        text: "FINANCIALLY WRAPPED 2024 • ADVISORY REPORT"
      }
    },

    your_biggest_wins: {
      screenNumber: 32,
      screenName: "your_biggest_wins",
      needed: validateYourBiggestWinsScreen(flat),
      progressIndicator: "FINAL",
      mainHeading: "Your Biggest Wins",
      subtitle: "You crushed your goals this year!",
      wins: (flat.biggestWins ?? []).map(win => {
        if (win.value !== undefined && win.currency !== undefined) {
          return {
            title: win.title ?? '',
            description: win.description ?? '',
            badge: {
              label: `SAVED ${formatCurrencyWithCommas(win.value, win.currency)}`,
              value: win.value,
              currencyCode: win.currency,
              currencySymbol: getCurrencySymbol(win.currency)
            },
            status: "completed"
          };
        } else if (win.percentile !== undefined) {
          return {
            title: win.title ?? '',
            description: win.description ?? '',
            badge: {
              label: `TOP ${100 - win.percentile}%`,
              percentile: win.percentile
            },
            status: "achievement"
          };
        } else {
          return {
            title: win.title ?? '',
            description: win.description ?? '',
            badge: {
              label: "HEALTHY",
              status: "healthy"
            },
            status: "completed"
          };
        }
      }),
      combinedProtection: {
        label: "COMBINED PROTECTION",
        value: flat.combinedProtectionValue ?? 0,
        displayValue: `${formatCurrency(flat.combinedProtectionValue ?? 0, flat.combinedProtectionValueCurrency ?? flat.currency ?? 'NGN')}+`,
        currencyCode: flat.combinedProtectionValueCurrency ?? flat.currency ?? 'NGN',
        currencySymbol: getCurrencySymbol(flat.combinedProtectionValueCurrency ?? flat.currency ?? 'NGN')
      },
      cta: {
        text: "SHARE MY JOURNEY",
        actionType: "share"
      }
    },

    the_path_forward: {
      screenNumber: 34,
      screenName: "the_path_forward",
      needed: validateThePathForwardScreen(flat),
      progressIndicator: "34/32",
      badge: "THE SOLUTION",
      mainHeading: "The Path Forward",
      your45DayPlan: {
        title: "Your 45-Day Plan",
        goal: "Net Zero Balance",
        currentDay: {
          label: "Day 0",
          value: 0
        },
        currentProgress: {
          startBalance: {
            value: flat.startBalance ?? 0,
            displayValue: formatCurrency(flat.startBalance ?? 0, flat.startBalanceCurrency ?? flat.currency ?? 'NGN'),
            currencyCode: flat.startBalanceCurrency ?? flat.currency ?? 'NGN',
            currencySymbol: getCurrencySymbol(flat.startBalanceCurrency ?? flat.currency ?? 'NGN')
          },
          targetBalance: {
            value: flat.targetBalance ?? 0,
            displayValue: formatCurrencyWithCommas(flat.targetBalance ?? 0, flat.targetBalanceCurrency ?? flat.currency ?? 'NGN'),
            currencyCode: flat.targetBalanceCurrency ?? flat.currency ?? 'NGN',
            currencySymbol: getCurrencySymbol(flat.targetBalanceCurrency ?? flat.currency ?? 'NGN')
          },
          label: "CURRENT PROGRESS"
        }
      },
      criticalActionSteps: {
        title: "Critical Action Steps",
        subtitle: `Follow these to unlock ${formatCurrency(flat.totalMonthlySavingsPotential ?? 0, flat.totalMonthlySavingsPotentialCurrency ?? flat.currency ?? 'NGN')} savings`,
        steps: (flat.actionSteps ?? []).map(step => ({
          title: step.title ?? '',
          description: step.description ?? '',
          potentialSavings: {
            value: step.savings ?? 0,
            displayValue: `Saves ${formatCurrencyWithCommas(step.savings ?? 0, step.currency ?? flat.currency ?? 'NGN')}`,
            currencyCode: step.currency ?? flat.currency ?? 'NGN',
            currencySymbol: getCurrencySymbol(step.currency ?? flat.currency ?? 'NGN')
          }
        }))
      },
      theMath: {
        label: "THE MATH",
        totalMonthlySavings: {
          value: flat.totalMonthlySavingsPotential ?? 0,
          displayValue: formatCurrencyWithCommas(flat.totalMonthlySavingsPotential ?? 0, flat.totalMonthlySavingsPotentialCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.totalMonthlySavingsPotentialCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.totalMonthlySavingsPotentialCurrency ?? flat.currency ?? 'NGN')
        },
        subtitle: "Total Monthly Potential"
      },
      futureProjection: {
        title: "FUTURE PROJECTION",
        currentPath: {
          label: "CURRENT PATH",
          value: flat.currentPathValue ?? 0,
          displayValue: formatCurrency(flat.currentPathValue ?? 0, flat.currentPathValueCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.currentPathValueCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.currentPathValueCurrency ?? flat.currency ?? 'NGN'),
          subtitle: "Next 12 months"
        },
        newPath: {
          label: "NEW PATH",
          value: flat.newPathValue ?? 0,
          displayValue: formatCurrency(flat.newPathValue ?? 0, flat.newPathValueCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.newPathValueCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.newPathValueCurrency ?? flat.currency ?? 'NGN'),
          subtitle: "Potential Gain"
        },
        difference: {
          value: flat.pathDifference ?? 0,
          displayValue: formatCurrency(flat.pathDifference ?? 0, flat.pathDifferenceCurrency ?? flat.currency ?? 'NGN'),
          currencyCode: flat.pathDifferenceCurrency ?? flat.currency ?? 'NGN',
          currencySymbol: getCurrencySymbol(flat.pathDifferenceCurrency ?? flat.currency ?? 'NGN'),
          message: `That's a ${formatCurrency(flat.pathDifference ?? 0, flat.pathDifferenceCurrency ?? flat.currency ?? 'NGN')} difference in 1 year.`
        }
      },
      challenge: {
        title: "30-DAY ZERO CASH CHALLENGE",
        cta: "Start Today"
      },
      footer: {
        text: "END OF YOUR FINANCIAL STORY"
      }
    }
  };
}
