module.exports = {
  "development": {
    dialect: process.env["DATABASE_DIALECT"] ?? "postgres",
    host: process.env["DATABASE_HOST"] ?? "localhost",
    port: Number(process.env["DATABASE_PORT"]) ?? 5432,
    username: process.env["DATABASE_USERNAME"] ?? "username",
    password: process.env["DATABASE_PASSWORD"] ?? "password",
    database: process.env["DATABASE_NAME"] ?? "database",
  },
  "test": {
    dialect: process.env["DATABASE_DIALECT"] ?? "postgres",
    host: process.env["DATABASE_HOST"] ?? "localhost",
    port: Number(process.env["DATABASE_PORT"]) ?? 5432,
    username: process.env["DATABASE_USERNAME"] ?? "username",
    password: process.env["DATABASE_PASSWORD"] ?? "password",
    database: process.env["DATABASE_NAME"] ?? "database",
  },
  "production": {
    dialect: process.env["DATABASE_DIALECT"] ?? "postgres",
    host: process.env["DATABASE_HOST"] ?? "localhost",
    port: Number(process.env["DATABASE_PORT"]) ?? 5432,
    username: process.env["DATABASE_USERNAME"] ?? "username",
    password: process.env["DATABASE_PASSWORD"] ?? "password",
    database: process.env["DATABASE_NAME"] ?? "database",
  }
}
