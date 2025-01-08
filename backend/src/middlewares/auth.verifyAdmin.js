export const verifyAdmin = async (req, res, next) => {
  const role = req.user.role;
  if (role !== "Admin") {
    return res.status(403).json({
      message: "Unauthorized access. Only admin can perform this action.",
    });
  }
  next();
};
