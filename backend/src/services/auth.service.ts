import { authRepository } from '../repositories/auth.repository';
import { AppError } from '../utils/AppError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthService {
  async register(data: any) {
    const existingUser = await authRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new AppError('Email is already in use', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const user = await authRepository.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'Owner',
    });

    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  async login(data: any) {
    const user = await authRepository.findUserByEmail(data.email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }
}

export const authService = new AuthService();
