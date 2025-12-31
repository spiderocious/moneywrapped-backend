import jwt, { SignOptions } from 'jsonwebtoken';
import { jwtConfig } from '@configs';

export class JWTUtil {
  /**
   * Generate JWT token
   */
  public static generateToken(payload: object): string {
    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn as string,
    } as SignOptions);
  }

  /**
   * Verify JWT token
   */
  public static verifyToken<T = any>(token: string): T | null {
    try {
      const decoded = jwt.verify(token, jwtConfig.secret) as T;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  /**
   * Decode JWT token without verification
   */
  public static decodeToken<T = any>(token: string): T | null {
    try {
      return jwt.decode(token) as T;
    } catch (error) {
      return null;
    }
  }
}
