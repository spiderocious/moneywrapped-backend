import { UserModel } from '@models';
import { ServiceResult, ServiceSuccess, ServiceError } from '@shared/types';
import { MESSAGE_KEYS } from '@shared/constants';
import { logger, generateId } from '@utils';
import { IUser, CreateUserDTO, UpdateUserDTO, AuthResponse, SignupDTO } from '@shared/types';
import bcrypt from 'bcrypt';
import { JWTUtil } from '@utils';

export class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async signup(data: SignupDTO): Promise<ServiceResult<AuthResponse>> {
    try {
      const existingUsername = await UserModel.findOne({
        username: data.username.toLowerCase(),
      });

      if (existingUsername) {
        return new ServiceError('Username already taken', MESSAGE_KEYS.USERNAME_TAKEN);
      }

      const existingEmail = await UserModel.findOne({
        email: data.email.toLowerCase(),
      });

      if (existingEmail) {
        return new ServiceError('Email already in use', MESSAGE_KEYS.EMAIL_TAKEN);
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await UserModel.create({
        id: generateId(16, 'USR'),
        username: data.username.toLowerCase(),
        email: data.email.toLowerCase(),
        password: hashedPassword,
        role: 'user',
      });

      const token = JWTUtil.generateToken({
        userId: user.id,
        role: user.role,
      });

      const userObj = user.toObject();
      delete (userObj as any).password;

      return new ServiceSuccess(
        { token, user: userObj },
        MESSAGE_KEYS.USER_CREATED
      );
    } catch (error: any) {
      logger.error('Signup error', error);
      return new ServiceError(error.message, MESSAGE_KEYS.SIGNUP_FAILED);
    }
  }

  async login(email: string, password: string): Promise<ServiceResult<AuthResponse>> {
    try {
      const user = await UserModel.findOne({
        email: email.toLowerCase(),
      }).select('+password');

      if (!user || !user.password) {
        return new ServiceError('Invalid credentials', MESSAGE_KEYS.INVALID_CREDENTIALS);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return new ServiceError('Invalid credentials', MESSAGE_KEYS.INVALID_CREDENTIALS);
      }

      const token = JWTUtil.generateToken({
        userId: user.id,
        role: user.role,
      });

      const userObj = user.toObject();
      delete (userObj as any).password;

      return new ServiceSuccess(
        { token, user: userObj },
        MESSAGE_KEYS.LOGIN_SUCCESS
      );
    } catch (error: any) {
      logger.error('Login error', error);
      return new ServiceError(error.message, MESSAGE_KEYS.LOGIN_FAILED);
    }
  }

  async getUserById(id: string): Promise<ServiceResult<IUser>> {
    try {
      const user = await UserModel.findOne({ id }).lean();

      if (!user) {
        return new ServiceError('User not found', MESSAGE_KEYS.USER_NOT_FOUND);
      }

      return new ServiceSuccess(user, MESSAGE_KEYS.USER_FETCHED);
    } catch (error: any) {
      logger.error('Get user by ID error', error);
      return new ServiceError(error.message, MESSAGE_KEYS.USER_FETCH_FAILED);
    }
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<ServiceResult<IUser>> {
    try {
      const user = await UserModel.findOneAndUpdate(
        { id },
        { $set: data },
        { new: true }
      ).lean();

      if (!user) {
        return new ServiceError('User not found', MESSAGE_KEYS.USER_NOT_FOUND);
      }

      return new ServiceSuccess(user, MESSAGE_KEYS.USER_UPDATED);
    } catch (error: any) {
      logger.error('Update user error', error);
      return new ServiceError(error.message, MESSAGE_KEYS.USER_UPDATE_FAILED);
    }
  }
}

export const userService = UserService.getInstance();
