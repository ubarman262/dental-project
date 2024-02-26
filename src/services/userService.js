const User = require("../models/user");
const roleService = require("./roleService");
const { hashPassword } = require("../utils/passwordUtils");

async function createUser(username, password, role) {
  // Hash the password before storing it in the database
  const hashedPassword = await hashPassword(password);

  const roleObj = await roleService.findRole(role);

  // Create the new user with the hashed password
  const newUser = await User.createUser({
    username,
    password: hashedPassword,
    roleId: roleObj.id,
  });

  return newUser;
}

async function userExists(username) {
  const existingUser = await User.findUserByUsername(username);
  if (existingUser) {
    return true;
  } else {
    return false;
  }
}

async function deleteUser(username) {
  return User.deleteUserByUsername(username);
}

module.exports = {
  createUser,
  userExists,
  deleteUser,
};
