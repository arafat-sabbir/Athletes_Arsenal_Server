import jwt from 'jsonwebtoken';
export const generateToken = async (
  jwtPayload: { userId: string; role: string; name: string; photo: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
