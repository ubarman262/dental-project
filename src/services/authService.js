const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { comparePassword } = require("../utils/passwordUtils");

async function handleUserLogin(username, password) {
  // Find user by username
  const user = await User.findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  console.log(user)

  // Compare hashed password with provided password
  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
}

module.exports = {
  handleUserLogin,
};
