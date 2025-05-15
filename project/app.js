// Citation for the following page:
// Date: 05/06/2025
// Based on:
// Source URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

// ######################
// ########## SETUP

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 4758;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars'); // Import express-handlebars engine
app.engine('.hbs', engine({ extname: '.hbs' })); // Create instance of handlebars
app.set('view engine', '.hbs'); // Use handlebars engine for *.hbs files.

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/', async function (req, res) {
    try {
        res.render('home'); // Render the home.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

app.get('/toys', async function (req, res) {
    try {
        // Create and execute our queries
        const [toys] = await db.query('SELECT * FROM Toys;');

        // Render the toys.hbs file, and also send the renderer
        //  an object that contains our Toys information
        res.render('toys', { toys: toys });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/orders', async function (req, res) {
    try {
        // Create and execute our queries
        const [orders] = await db.query('SELECT * FROM Orders;');
        const [customers] = await db.query('SELECT * FROM Customers');
        const [employees] = await db.query('SELECT * FROM Employeess');

        // Render the orders.hbs file, and also send the renderer
        //  an object that contains our Orders information
        res.render('orders', { 
            orders: orders,
            customers: customers,
            employees: employees
         });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/customers', async function (req, res) {
    try {
        // Create and execute our queries
        const [customers] = await db.query('SELECT * FROM Customers;');

        // Render the customers.hbs file, and also send the renderer
        //  an object that contains our Customers information
        res.render('customers', { customers: customers });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/employees', async function (req, res) {
    try {
        // Create and execute our queries
        const [employees] = await db.query('SELECT * FROM Employees;');
        const [departments] = await db.query('SELECT * FROM Departments;');

        // Render the toys.hbs file, and also send the renderer
        //  an object that contains our Employees information
        res.render('employees', {
            employees: employees,
            departments: departments
        });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});


app.get('/departments', async function (req, res) {
    try {
        // Create and execute our queries
        const [departments] = await db.query('SELECT * FROM Departments;');

        // Render the departments.hbs file, and also send the renderer
        //  an object that contains our Departments information
        res.render('departments', { departments: departments });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/toyorders', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use select all of the data on the Orders table
        const query1 = `
        SELECT 
            ToyOrders.toyOrderID,
            ToyOrders.toyID,
            Toys.toyName,
            ToyOrders.orderID,
            Orders.orderDate
        FROM ToyOrders
        JOIN Toys ON ToyOrders.toyID = Toys.toyID
        JOIN Orders ON ToyOrders.orderID = Orders.orderID;`;
        const [toyorders] = await db.query(query1);
        const [toys] = await db.query('SELECT * FROM Toys;');
        const [orders] = await db.query('SELECT * FROM Orders;');

        // Render the orders.hbs file, and also send the renderer
        //  an object that contains our Orders information
        res.render('toyorders', { toyorders: toyorders,
                                  toys: toys,
                                  orders: orders
         });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' +
            PORT +
            '; press Ctrl-C to terminate.'
    );
});