import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin', 'moderator'] },
  photo: { type: String, required: false },
});

const UserModel = model<TUser>('User', userSchema);
export default UserModel;
