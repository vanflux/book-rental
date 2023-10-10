import { SequelizeOptions } from "sequelize-typescript";

const missingEnv = (variable: string) => `Missing ${variable} enviroment variable!`;
const invalidEnv = (variable: string) => `Invalid ${variable} enviroment variable!`;

export function loadConfig() {
  return {
    ...loadDbConfig(),
    ...loadJwtConfig(),
  };
}

export function loadJwtConfig() {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error(missingEnv('JWT_SECRET'));
  return { jwtSecret };
}

export function loadDbConfig(): SequelizeOptions {
  const host = process.env.DB_HOST;
  const portStr = process.env.DB_PORT;
  const port = Number(portStr);
  const username = process.env.DB_USER;
  const database = process.env.DB_NAME;
  const password = process.env.DB_PASSWORD;
  if (!host) throw new Error(missingEnv('DB_HOST'));
  if (!portStr) throw new Error(missingEnv('DB_PORT'));
  if (isNaN(port)) throw new Error(invalidEnv('DB_PORT'));
  if (!username) throw new Error(missingEnv('DB_USER'));
  if (!database) throw new Error(missingEnv('DB_NAME'));
  if (!password) throw new Error(missingEnv('DB_PASSWORD'));
  return { dialect: 'postgres', host, port, username, database, password };
}
