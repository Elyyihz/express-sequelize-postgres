import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from "pg";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectModule: pg,
});

export default sequelize;
