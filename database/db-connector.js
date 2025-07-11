// Citation for the following page:
// Date: 05/06/2025
// Based on:
// Source URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948 


require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

// DB_USER='cs340_arnettj';
// DB_PASSWORD='7494';
// DB_DATABASE='cs340_arnettj';

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