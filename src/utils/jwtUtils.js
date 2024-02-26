const jwt = require("jsonwebtoken");

function getUsernameFromToken(token) {
  try {
    // Verify and decode the JWT token
    const decodedToken = jwt.decode(token, { json: true });

    // Extract the username from the decoded token
    const { username } = decodedToken;

    return username;
  } catch (error) {
    // Handle invalid or expired token
    console.error("Error decoding token:", error.message);
    return null;
  }
}

module.exports = {
  getUsernameFromToken,
};
