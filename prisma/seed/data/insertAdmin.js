const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query"],
});

// Data for the user
const userData = {
  username: "admin",
  password: "$2b$10$Soh1jdElEeaN0eQj8CkNvutGoxoNu2/XT7sTy5cbsDjM9o15vBHli",
  roleName: "admin", // Role name for this user
};

async function insertUserData() {
  try {
    const { id, username, password, roleName } = userData;
    // Query the role_id based on the roleName
    const role = await prisma.role.findUnique({
      where: {
        role: roleName,
      },
    });
    if (!role) {
      throw new Error(`Role "${roleName}" not found`);
    }
    await prisma.user.create({
      data: {
        id,
        username,
        password,
        role: {
          connect: {
            role_id: role.role_id, // Connect the user to the corresponding role
          },
        },
      },
    });
    console.log("User data inserted successfully");
  } catch (error) {
    console.error("Error inserting user data:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}

module.exports = { insertUserData };
