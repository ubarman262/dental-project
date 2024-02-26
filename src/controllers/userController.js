const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (await userService.userExists(username)) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = await userService.createUser(username, password, role);

    res.json({
      message: "User created successfully",
      user: {
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.body;
  try {
    if (!(await userService.userExists(username))) {
      return res.status(400).json({ message: "Username not found" });
    }

    const user = await userService.deleteUser(username);

    res.json({
      message: "User deleted",
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  deleteUser,
};
