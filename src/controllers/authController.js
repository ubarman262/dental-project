const authService = require("../services/authService");
const userService = require("../services/userService");
const cacheService = require("../services/cacheService");
const { comparePassword } = require("../utils/passwordUtils");
const { getUsernameFromToken } = require("../utils/jwtUtils");
const { addToBlacklist } = require("../middleware/blacklistMiddleware");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await userService.userExists(username);
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await comparePassword(
      password,
      existingUser.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const activeToken = await authService.checkActiveSession(username);

    if (activeToken) {
      return res.status(401).json({ message: "Session already active" });
    }

    const token = authService.generateUserToken(existingUser);

    await cacheService.setData(`${username}-token`, token, 3600);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  const token = req.headers.authorization;

  const username = getUsernameFromToken(token);

  cacheService.removeData(`${username}-token`);

  addToBlacklist(token);

  res.json({ message: `User '${username}' logged out` });
};

const validity = async (req, res) => {
  res.json({ valid: true });
};

const takeover = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await userService.userExists(username);
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await comparePassword(
      password,
      existingUser.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const activeToken = await authService.checkActiveSession(username);

    console.log(activeToken);

    if (activeToken) {
      const username = getUsernameFromToken(activeToken);

      cacheService.removeData(`${username}-token`);

      addToBlacklist(activeToken);
    }

    const token = authService.generateUserToken(existingUser);

    await cacheService.setData(`${username}-token`, token, 3600);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
  logout,
  validity,
  takeover,
};
