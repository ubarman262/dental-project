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
    const refreshToken = authService.generateRefreshToken(existingUser);

    await cacheService.setData(
      `${username}-token`,
      token,
      process.env.ACCESS_TOKEN_EXPIRY
    );
    await cacheService.setData(
      `${username}-rtoken`,
      refreshToken,
      process.env.REFRESH_TOKEN_EXPIRY
    );

    res.json({ token, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.headers.authorization;

    if (!refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await authService.verifyRefreshToken(refreshToken);

    const newToken = authService.generateUserToken(user);
    const newRefreshToken = authService.generateRefreshToken(user);

    await cacheService.setData(
      `${user.username}-token`,
      newToken,
      process.env.ACCESS_TOKEN_EXPIRY
    );
    await cacheService.setData(
      `${user.username}-rtoken`,
      newRefreshToken,
      process.env.REFRESH_TOKEN_EXPIRY
    );

    res.json({ token: newToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  const token = req.headers.authorization;

  const username = getUsernameFromToken(token);

  cacheService.removeData(`${username}-token`);
  cacheService.removeData(`${username}-rtoken`);

  addToBlacklist(token);

  res.json({ message: `User '${username}' logged out` });
};

const validity = async (req, res) => {
  try {
    res.json({ valid: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
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

    if (activeToken) {
      addToBlacklist(activeToken);
    }

    const token = authService.generateUserToken(existingUser);
    const refreshToken = authService.generateRefreshToken(existingUser);

    await cacheService.setData(
      `${username}-token`,
      token,
      process.env.ACCESS_TOKEN_EXPIRY
    );
    await cacheService.setData(
      `${username}-rtoken`,
      refreshToken,
      process.env.REFRESH_TOKEN_EXPIRY
    );

    res.json({ token, refreshToken });

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
  refreshToken,
};
