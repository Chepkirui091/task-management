const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'daphne',
    password: 'Chepkirui01.',
    database: 'task_manager'
});

module.exports = pool;
