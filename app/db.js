const { Pool } = require('pg');

const pool = new Pool({
  host: 'postgres',
  user: 'user',
  password: 'user123',
  database: 'lab_db',
  port: 5432,
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
