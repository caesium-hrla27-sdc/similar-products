const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '18.144.22.72',
  database: 'similar_and_like',
  password: 'plzwork',
  port: 5432
});

pool.connect()
  .then(() => console.log("CONNECTED TO PostgreSQL"))
  .catch(err => console.error(err));

module.exports = pool;
