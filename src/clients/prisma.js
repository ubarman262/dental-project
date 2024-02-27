const { PrismaClient } = require("@prisma/client");

let prismaInstance;

function getPrismaInstance() {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient(
    //   {
    //   log: ['query'],
    // }
    );
  }
  return prismaInstance;
}

module.exports = { getPrismaInstance };
