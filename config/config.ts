require('dotenv').config();
export const c = {  
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME
};

export const postgresConfig = {
  host: "172.24.4.40",
  user: "cm_learning",
  password: "A6Pw6qJkVfRqq5uV",
  database: "OctoBird",
  port: 5432
};