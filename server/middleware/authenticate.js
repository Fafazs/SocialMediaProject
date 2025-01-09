const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.cookies.authToken;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'User not logged' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid Token!'}, err.message);
  }
};

module.exports = authenticate;