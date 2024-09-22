import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

/**
 * Middleware to authorize requests.
 * Checks if the request has a valid authorization token.
 * If not, it throws an unauthorized error.
 */

const AuthorizeRequest = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Get the authorization token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    // If no token is provided, throw an unauthorized error
    if (!token) {
      throw new AppError(401, 'Unauthorized Access1');
    }
    try {
      const decoded = jwt.verify(token, config.access_token_secret as string) as JwtPayload;
      req.user = decoded;
    } catch (error) {
      throw new AppError(401, 'Unauthorized Access3');
    }
    next();
  });
};

export default AuthorizeRequest;
