const Pool = require('pg').Pool
const psql = new Pool({
  user: 'tato',
  host: 'localhost',
  database: 'miner_ucab',
  password: 'password',
  port: 5432,
})

export {psql}