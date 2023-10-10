import { SequelizeOptions } from "sequelize-typescript";

export const getDatabaseConnectionCredentials = (): SequelizeOptions => {
  const host = process.env.DB_HOST;
  const portStr = process.env.DB_PORT;
  const port = Number(portStr);
  const username = process.env.DB_USER;
  const database = process.env.DB_NAME;
  const password = process.env.DB_PASSWORD;
  if (!host) throw new Error('Missing DB_HOST enviroment variable!');
  if (!portStr) throw new Error('Missing DB_PORT enviroment variable!');
  if (isNaN(port)) throw new Error('Invalid DB_PORT enviroment variable!');
  if (!username) throw new Error('Missing DB_USER enviroment variable!');
  if (!database) throw new Error('Missing DB_NAME enviroment variable!');
  if (!password) throw new Error('Missing DB_PASSWORD enviroment variable!');
  return { dialect: 'postgres', host, port, username, database, password };
}
