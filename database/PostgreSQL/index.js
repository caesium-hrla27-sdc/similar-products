const { Pool, Client } = require('pg');
const pool = new Pool();

await pool.connect({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres'
});

module.exports = pool;