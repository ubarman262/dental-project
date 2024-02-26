const authService = require("../services/authService");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.handleUserLogin(username, password);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const protected = async (req, res) => {
  res.json({ message: "Protected resource accessed successfully" });
};

module.exports = {
  login,
  protected,
};
