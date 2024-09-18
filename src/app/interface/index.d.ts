
import { JwtPayload } from 'jsonwebtoken';
// Custom Type to add User on the Request of Express
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      files?: {
        [key: string]: Express.Multer.File[]; // Adjust according to how files are structured
      };
    }
  }
}