// Middleware to allow only specific user roles on a route.
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized for this action' });
    }

    next();
  };
};

module.exports = {
  authorize,
};
