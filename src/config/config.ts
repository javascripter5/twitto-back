import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })
//ngrok http --authtoken=2XwApRwTnvcCStPyYIuECrJyYlP_3czxAbKuER957dm7gVavd --domain=free-growing-sailfish.ngrok-free.app 4000
export default {
  'NODE_ENV': process.env.NODE_ENV,
  'jwt_secret': process.env.jwt_secret || "myjsonwbtoken",
  'MQ_URL': process.env.MQ_URL || "104.248.47.7",
  'MQ_USER': process.env.MQ_USER || "app",
  'MQ_PASS': process.env.MQ_PASS || "pos",
  'email': process.env.email || "abdooctopus@gmail.com",
  'email_password': process.env.email_password || "Mypassword2022",
  'database_password': process.env.database_password || "password", //"Twitto.20010",
  'host_database': process.env.host_database || "localhost",  //"aws-0-eu-central-1.pooler.supabase.com",//"ec2-54-82-56-105.compute-1.amazonaws.com",
  'database_user': process.env.database_user || "postgres",// "abdo",// "postgres.qatgrqvckxbybvjqefxw",
  'database': process.env.database || 'postgres',
  "RUN_MIGRATIONS": Boolean(process.env.RUN_MIGRATIONS) || true, //=== "true" ? true : false,
  'port': parseInt(process.env.port) || 4000,
  'logging': process.env.ENV === "debug" || false,
  // 'stripe_secret_key': process.env.stripe_secret_key || "sk_test_51LmPZoJbRKuoPOFhsdDpxYrvP0OjL8dd5bD1qN2R2dLJVmNv2K5sdIHALCyn3FYjzR9sOLN6atbNfDvBZTcNd4ll00CZkMc0Xl",
}