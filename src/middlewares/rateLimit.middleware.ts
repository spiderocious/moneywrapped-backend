import rateLimit from 'express-rate-limit';
import { rateLimitConfig, authRateLimitConfig } from '@configs';

export const rateLimiter = rateLimit({
  windowMs: rateLimitConfig.windowMs,
  max: rateLimitConfig.maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests, please try again later',
  },
});

export const authRateLimiter = rateLimit({
  windowMs: authRateLimitConfig.windowMs,
  max: authRateLimitConfig.maxRequests,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many authentication attempts, please try again later',
  },
});
