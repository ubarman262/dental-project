const jwt = require("jsonwebtoken");
const cacheService = require("./cacheService");

function generateUserToken(existingUser) {
  return jwt.sign(
    {
      id: existingUser.id,
      username: existingUser.username,
      role: existingUser.role.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRY), issuer: "ujjwalbarman.in", audience: existingUser.id }
  );
}

function generateRefreshToken(existingUser) {
  return jwt.sign(
    {
      id: existingUser.id,
      username: existingUser.username,
      role: existingUser.role.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRY), issuer: "ujjwalbarman.in", audience: existingUser.id }
  );
}

async function checkActiveSession(username) {
  const activeSession = await cacheService.getData(`${username}-token`);
  return activeSession;
}

async function verifyRefreshToken(refreshToken) {
  // Verify and decode the token
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw new Error("Invalid refresh token");
    }
    return decoded;
  });
}

module.exports = {
  generateUserToken,
  checkActiveSession,
  generateRefreshToken,
  verifyRefreshToken,
};
