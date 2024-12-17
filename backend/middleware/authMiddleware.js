const adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === 'Basic admin:password123') {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  
  module.exports = adminAuth;
  