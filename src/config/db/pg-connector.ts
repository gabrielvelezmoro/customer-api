import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME || ("cliente" as string);
const dbUser = process.env.DB_USER || ("postgres" as string);
const dbHost = process.env.DB_HOST || "localhost";
const dbPassword = process.env.DB_PASSWORD || "123456";

const dbConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default dbConnection;
