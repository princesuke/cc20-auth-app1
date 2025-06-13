import bcrypt from "bcryptjs";

const password = "my123456";
const saltRounds = 12;

console.time("hash");
const hash = await bcrypt.hash(password, saltRounds);
console.timeEnd("hash");

console.log(hash);

const inputPassword = "my123456";
const isMatch = await bcrypt.compare(inputPassword, hash);

console.log("Password match?", isMatch);
