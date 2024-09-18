import AppError from '../../errors/AppError';
import { hashInfo } from '../../utils/hashInfo';
import { TLogin, TUser } from './user.interface';
import UserModel from './user.model';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/generateToken';
import config from '../../config';

const createNewUser = async (user: TUser) => {
  const { password, ...rest } = user;
  const hashedPassword = await hashInfo(password);
  const newUser = await UserModel.create({ ...rest, password: hashedPassword });
  return newUser;
};

const loginUser = async (payload: TLogin) => {
  const { email, password } = payload;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(400, "Password Didn't Match Try Again");
  }
  const accessToken = await generateToken(
    {
      userId: String(user._id),
      role: user.role as string,
      name: user.name as string,
      photo: (user?.photo as string) || '/user/photo',
      email: user.email as string,
    },
    config.access_token_secret as string,
    config.access_token_expires as string
  );
  return { accessToken };
};

export const userServices = { createNewUser, loginUser };
