import crypto from "crypto";
import bcrypt from "bcrypt";

function hashPassword(password, salt) {
  return crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
}

const password = "123456";
const salt1 = "a1b2";
const salt2 = "z9y8";

// console.log("Alice:", hashPassword(password, salt1));
// console.log("Bob:", hashPassword(password, salt2));

async function run() {
  const password = "123456";

  const hash1 = await bcrypt.hash(password, 20);
  //   const hash2 = await bcrypt.hash(password, 20);

  console.log("Hash 1:", hash1);
  //   console.log("Hash 2:", hash2);
}

// run();

// Hash1 $2b$08$FkH8ESCEivMynQEUoiSKuuvBNJaeex5hR0sOAHV7/jm0DIxfS.RzG
// Hash2 $2b$07$25cOe4i7/g2Q8VigSU4K5ebWzNfp8YJjWECtEHxzH.jY/.rNAX4C.

function generateSalt(length = 8) {
  return crypto.randomBytes(length).toString("hex");
}

const randomSalt = generateSalt(5);
console.log("Random Salt:", randomSalt);
console.log("Hash:", hashPassword(password, randomSalt));
