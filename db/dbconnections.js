const poolmanager = require("./poolmanager");

const sqlConfig1 = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  server: process.env.DB_HOST,
  pool: {
    max: 100,
    min: 0,
    idleTimeoutMillis: 500000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

const connection = poolmanager.get("dbo",sqlConfig1);

module.exports = {
    connection
}

