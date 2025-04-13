import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (userId) => {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * 30 } // 30 days
    );
  };
  