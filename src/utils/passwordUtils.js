const bcrypt = require("bcrypt");

const saltRounds = 10; // Number of salt rounds (work factor)

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

async function comparePassword(password, hash) {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    throw new Error("Error comparing password");
  }
}

module.exports = { hashPassword, comparePassword };
