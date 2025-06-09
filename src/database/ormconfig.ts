import { DataSource } from "typeorm";
import { join } from "path";
import config from "src/config/config";
import { CustomTypeOrmLogger } from "./typeOrmLogger";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const ormOptions: TypeOrmModuleOptions = {
  type: "postgres",
  database: config.database,
  username: config.database_user,
  password: config.database_password,
  host: config.host_database,
  port: 5432,
  schema: "public",
  entities: [
    // '**/**/*.entity{.ts, .js}',
    // join(__dirname, "**", "*.entity.{ts,js}"),
    join(__dirname, "..", "**", "**", "entities", "*.{ts,js}"),

  ],
  migrationsTableName: "migrations",
  migrations: [
    // `**/database/migrations/*{.ts,.js}`
    join(__dirname, "**", "database", "migrations", "*{.ts,.js}"),
  ],
  extra: {
    charset: "utf8mb4_unicode_ci",
  },
  synchronize: config.RUN_MIGRATIONS,
  // namingStrategy: new SnakeNamingStrategy(), // Here you'r using the strategy!
  logging: config.logging,
  logger: new CustomTypeOrmLogger(
    config.logging,
    true,
  ),
};

// ormOptions.migrations = [`src/database/migrations/*{.ts,.js}`]

// const source = new DataSource(ormOptions);

// export default source;
