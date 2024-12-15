import jwt from 'jsonwebtoken';
import process from 'node:process';


export const authenticateAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.adminData = { adminId: decodedToken.adminId };
    next();
  } catch {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
