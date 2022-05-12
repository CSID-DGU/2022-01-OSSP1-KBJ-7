const mysql = require('mysql');

const db = mysql.createPool({
    host: 'database-1.chlqnazpznfr.us-west-2.rds.amazonaws.com',
    port: '3306',
    user: 'root',
    password: 'qwer1234?',
    database: 'new_schema'
});

module.exports = db;