const jwt = require("jsonwebtoken");
const cacheService = require("./cacheService");
function generateUserToken(existingUser) {
  return jwt.sign(
    {
      id: existingUser.id,
      username: existingUser.username,
      role: existingUser.role.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

async function checkActiveSession(username) {
  const activeSession = await cacheService.getData(`${username}-token`);
  return activeSession;
}

module.exports = {
  generateUserToken,
  checkActiveSession
};

