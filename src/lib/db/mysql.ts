import mysql, { type Pool, type PoolOptions } from "mysql2/promise";

declare global {
  var __elevationMysqlPool: Pool | undefined;
}

function getPoolOptions(): PoolOptions | string | null {
  const url = process.env.MYSQL_URL;
  if (url) {
    return url;
  }

  const host = process.env.MYSQL_HOST;
  const user = process.env.MYSQL_USER;
  const database = process.env.MYSQL_DATABASE;

  if (!host || !user || !database) {
    return null;
  }

  return {
    host,
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user,
    password: process.env.MYSQL_PASSWORD ?? "",
    database,
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT ?? 10),
    queueLimit: 0,
    dateStrings: true,
  };
}

export function isDatabaseConfigured() {
  return getPoolOptions() !== null;
}

export function getMysqlPool() {
  if (!globalThis.__elevationMysqlPool) {
    const options = getPoolOptions();

    if (!options) {
      throw new Error(
        "MySQL is not configured. Set MYSQL_URL or MYSQL_HOST, MYSQL_DATABASE, and MYSQL_USER.",
      );
    }

    globalThis.__elevationMysqlPool =
      typeof options === "string" ? mysql.createPool(options) : mysql.createPool(options);
  }

  return globalThis.__elevationMysqlPool;
}
