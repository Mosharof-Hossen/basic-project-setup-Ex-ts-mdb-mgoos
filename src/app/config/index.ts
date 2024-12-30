import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt_round: process.env.SALT_ROUND,
  default_password: process.env.DEFAULT_PASS,
  node_env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  localhost: process.env.LOCAL_HOST,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  node_mailer_pass: process.env.NODE_MAILER_PASS,
  node_mailer_email: process.env.NODE_MAILER_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASS,
};
