import jwt from "jsonwebtoken";

const secret = "mySuperCC";
const payload = { userId: 1234, role: "admin" };

const token = jwt.sign(payload, secret, {
  algorithm: "HS256",
  expiresIn: "1h",
});

console.log("HS256 JWT:", token);

try {
  const decoded = jwt.verify(token, secret, { algorithms: ["HS256"] });
  console.log("HS256 Decoded:", decoded);
} catch (err) {
  console.error("HS256 Invalid:", err.message);
}
