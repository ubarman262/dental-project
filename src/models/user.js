const { getPrismaInstance } = require("../clients/prisma");

const prisma = getPrismaInstance();

// Define the User model
const User = {
  // Function to create a new user
  async createUser(data) {
    try {
      const user = await prisma.user.create({
        data: {
          username: data.username,
          password: data.password,
          role: { connect: { role_id: data.role_id } }, // Connect the user to the specified role
        },
        include: {
          role: true, // Include the associated role in the returned user object
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Unable to create user: ${error}`);
    }
  },

  // Function to find a user by ID
  async findUserById(id) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Unable to find user: ${error}`);
    }
  },

  // Function to find a user by username
  async findUserByUsername(username) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
        include: {
          role: true, // Include the associated role
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Unable to find user: ${error}`);
    }
  },

  // Function to update a user by ID
  async updateUserById(id, data) {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data,
      });
      return updatedUser;
    } catch (error) {
      throw new Error(`Unable to update user: ${error}`);
    }
  },

  // Function to delete a user by ID
  async deleteUserById(id) {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id,
        },
      });
      return deletedUser;
    } catch (error) {
      throw new Error(`Unable to delete user: ${error}`);
    }
  },

  // Function to delete a user by username
  async deleteUserByUsername(username) {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          username,
        },
      });
      return deletedUser;
    } catch (error) {
      throw new Error(`Unable to delete user: ${error}`);
    }
  },
};

module.exports = User;
