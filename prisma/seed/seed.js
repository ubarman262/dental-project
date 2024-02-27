const { insertUserData } = require("./data/insertAdmin");
const { insertRoleData } = require("./data/insertRole");

async function main() {
  await insertRoleData();
  await insertUserData();
}

main();
