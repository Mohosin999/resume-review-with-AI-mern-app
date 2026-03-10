import bcrypt from "bcryptjs";
import { User } from "../../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../config/jwt";

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    preferences: {
      theme: "system",
      notifications: true,
    },
    subscription: {
      plan: "free",
      credits: 100,
    },
  });

  return user;
};

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email: email.toLowerCase() });
};

export const findUserById = async (userId: string) => {
  return User.findById(userId).select("-__v");
};

export const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const createTokens = (userId: string, email: string) => {
  const accessToken = generateAccessToken({
    userId,
    email,
  });

  const refreshToken = generateRefreshToken({
    userId,
    email,
  });

  return { accessToken, refreshToken };
};

export const verifyRefreshTokenAndGetUserId = (refreshToken: string) => {
  return verifyRefreshToken(refreshToken);
};

export const generateNewAccessToken = (userId: string, email: string) => {
  return generateAccessToken({ userId, email });
};
