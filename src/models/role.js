const { getPrismaInstance } = require("../clients/prisma");

const prisma = getPrismaInstance();

// Define the User model
const Role = {
  // Function to create a new role
  async createRole(newRole) {
    try {
      const role = await prisma.role.create({
        data: {
          role: newRole,
        },
      });
      return role;
    } catch (error) {
      throw new Error(`Unable to create role: ${error}`);
    }
  },
  // Function to find a role by role
  async findRole(data) {
    try {
      const role = await prisma.role.findUnique({
        where: {
          role: data,
        },
      });
      return role;
    } catch (error) {
      throw new Error(`Unable to find role: ${error}`);
    }
  },
  // Function to delete a role
  async deleteRole(role) {
    try {
      const deletedRole = await prisma.role.delete({
        where: {
          role,
        },
      });
      return deletedRole;
    } catch (error) {
      throw new Error(`Unable to delete role: ${error}`);
    }
  },
};

module.exports = Role;
