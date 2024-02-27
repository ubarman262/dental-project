const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Data to insert
const roles = [{ role: "admin" }, { role: "user" }];

async function insertRoleData() {
  try {
    // Loop through each role and insert into the table
    for (let i = 0; i < roles.length; i++) {
      const { role } = roles[i];
      await prisma.role.create({
        data: {
          role: role,
        },
      });
    }
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}

module.exports = { insertRoleData };
