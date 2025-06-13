import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";

export async function createUser(email, password) {
  const hash = await bcrypt.hash(password, 10);
  const result = prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });

  return result;
}

export async function verifyUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
}

export function generateToken(userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });

  return token;
}

export async function getMe(id) {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
}

export async function findUserByEmail(email) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}

export async function updateUserPassword(userId, newPassword) {
  const hash = await bcrypt.hash(newPassword, 10);
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hash,
    },
  });
  return user;
}
