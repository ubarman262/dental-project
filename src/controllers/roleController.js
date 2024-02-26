const roleService = require("../services/roleService");

const createRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (await roleService.roleExists(role)) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const newRole = await roleService.createRole(role, res);

    res.json({
      message: "Role created successfully",
      role: {
        role: newRole.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!(await roleService.roleExists(role))) {
      return res.status(400).json({ message: "Role not found" });
    }

    const deletedRole = await roleService.deleteRole(role);
    res.json({
      message: "Role deleted",
      role: deletedRole,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createRole,
  deleteRole,
};
