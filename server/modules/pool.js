const pg = require('pg')

let databaseName = 'to_do_app'

if (process.env.NODE_ENV === 'test') {
  databaseName = 'prime_testing'
}

let pool;
if (process.env.DATABASE_URL) {

     pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
  })} else {
     pool = new pg.Pool({
    host: 'localhost'
    port: 5432,
    database: "to_do_app",
    allowExitOnIdle: true
  })
}
module.exports = pool
