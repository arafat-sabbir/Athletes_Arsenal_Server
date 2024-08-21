import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  database_url: process.env.DB_URL,
  bcrypt_solt_round: process.env.BCRYPT_SOLT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  access_token_secret: process.env.JWT_ACCESS_SECRET,
  access_token_expires: process.env.JWT_ACCESS_EXPIRES,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
};
