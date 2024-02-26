const Role = require("../models/role");
const User = require("../models/user");

async function createRole(role) {
  // Create the new user with the hashed password
  const newRole = await Role.createRole(role);

  return newRole;
}

async function roleExists(role) {
  const existingRole = await Role.findRole(role);
  if (existingRole) {
    return true;
  } else {
    return false;
  }
}

async function findRole(role) {
  return Role.findRole(role || "user"); // Default role to "user" if not provided
}

async function deleteRole(role) {
  const deletedRole = await Role.deleteRole(role);

  return deletedRole;
}

module.exports = {
  createRole,
  deleteRole,
  roleExists,
  findRole,
};
