import jwt from 'jsonwebtoken';
import Login from '../Models/login.js';
import { UNAUTHORIZED, SERVERERROR,BADREQUEST } from '../constant/statuscode.js';

export const authMiddleware = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Login.findById(decoded.id).select('-password');

        if (!req.user) {
          return next(new AppError('User not found', UNAUTHORIZED));
        }

        next();
      } catch (error) {
        console.error(error);
        return next(new AppError('Not authorized, token failed', UNAUTHORIZED));
      }
    }

    if (!token) {
      return next(new AppError('Not authorized, no token', UNAUTHORIZED));
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return next(new AppError("Internal Server Error during authorization", SERVERERROR));
  }
};
