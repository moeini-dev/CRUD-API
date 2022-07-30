const mysql = require('mysql2');
const pool = mysql.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB
    // connectionlimit: 10     // it returned a warning in 'mysql2' module!
});

module.exports = pool;

