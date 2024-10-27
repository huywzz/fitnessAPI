import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config(); // Load environment variables

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: process.env.DB_SSL === 'true',
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/../src/db/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
});

export default dataSource;
