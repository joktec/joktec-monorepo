import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as dotenv from 'dotenv';

dotenv.config();

const TypeOrmConfig: MysqlConnectionOptions = {
  type: 'mysql',
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  port: parseInt(process.env.MYSQL_PORT),
  host: process.env.MYSQL_HOST,
  entities: ['dist/modules/**/entities/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
};

export { TypeOrmConfig };
