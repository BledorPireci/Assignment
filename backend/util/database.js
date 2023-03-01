const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost' ,
    user: 'root',
    password: 'programer69',
    database: 'assignment',
});


function getDbConnection() {
    return connection;
}

function closeDbConnection(connection) {
    connection.end();
}

module.exports = { getDbConnection, closeDbConnection };