require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'classmysql.engr.oregonstate.edu',
    user              : DB_USER,
    password          : DB_PASSWORD,
    database          : DB_DATABASE
}).promise(); // This makes it so we can use async / await rather than callbacks

console.log('Database pool created');

// Export it for use in our application
module.exports = pool;