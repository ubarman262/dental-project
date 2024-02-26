const tokenBlacklist = new Set();

function addToBlacklist(token) {
  tokenBlacklist.add(token);
}

function removeFromBlacklist(token) {
  tokenBlacklist.delete(token);
}

function isTokenBlacklisted(token) {
  return tokenBlacklist.has(token);
}

module.exports = { addToBlacklist, removeFromBlacklist, isTokenBlacklisted };
