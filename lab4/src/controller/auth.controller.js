import {
  createUser,
  verifyUser,
  generateToken,
  getMe,
  findUserByEmail,
  updateUserPassword,
} from "../services/auth.service.js";
import { signResetToken, verifyResetToken } from "../utils/jwt.js";

export async function register(req, res) {
  const { email, password } = req.body;
  const user = await createUser(email, password);
  res.status(201).json({ id: user.id, email: user.email });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await verifyUser(email, password);
  if (!user) return res.status(401).json({ err: "Invalid credentials" });
  const accessToken = generateToken(user.id);
  res.json({ accessToken });
}

export async function me(req, res) {
  const userId = req.userId;
  const user = await getMe(userId);
  res.json({ id: user.id, email: user.email });
}

export async function forgotPassword(req, res) {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = signResetToken(user.id);
  const link = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/reset-password/${token}`;
  res.json({ message: "Reset link generated", link });
}

export async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const payload = verifyResetToken(token);
    const userId = payload.userId;
    const user = await updateUserPassword(userId, password);
    res.json({
      message: "Password reset successful",
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expried token" });
  }
}
