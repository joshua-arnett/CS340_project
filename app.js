// Citation for the following page:
// Date: 05/06/2025
// Based on:
// Source URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

// Citation for use of AI Tools:
// Date: 05/22/2025
// Prompts used to help fix project directory issues.
// "I have just moved all my files into a new directory. I am getting an error when I try to run my app.js file. The website states that it cannot find the views folder. I have moved the views folder into the same directory as my app.js file. How do I fix this error?"
// AI Source URL: www.grok.com

// ######################
// ########## SETUP

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// testing
// const PORT = 4788; 
const PORT = 4758;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars'); // Import express-handlebars engine
const path = require('path'); // Import path module to resolve file paths
app.engine('.hbs', engine({ extname: '.hbs' })); // Create instance of handlebars
app.set('view engine', '.hbs'); // Use handlebars engine for *.hbs files.
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ########################################
// ########## ROUTE HANDLERS
// Ordered in the following way:
// 1. Reset Route
// 2. Create Routes
// 3. Read Routes
// 4. Update Routes
// 5. Delete Routes
// #######################
// Within each section, the routes are ordered in the following way:
// Customer, Department, Employee, Order, Toy, ToyOrder
// ########################################


// ########################################
// RESET ROUTE
// ###########################

app.post('/reset-database', async (req, res) => {
    try {
        if (req.body.reset_action === 'reset') {
        // Call the stored procedure to reset the database
        await db.query('CALL sp_load_toyStoreDB()');
        // Redirect to the home page with a success query parameter
        res.redirect('/?success=true');
        } else {
        res.status(400).send('Invalid action.');
        }
    } catch (error) {
        console.error('Error resetting database:', error);
        // Redirect with an error query parameter
        res.redirect('/?success=false');
    }
});

// ########################################
// CREATE ROUTES
// ###########################

// Create Customer using Stored Procedure
app.post('/customers/create', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateCustomer(?, ?, ?)`;
        await db.query(query1, [
            data.create_customer_name,
            data.create_customer_address,
            data.create_customer_phone
        ]);

        console.log(`CREATE Customer. Name: ${data.create_customer_name} ` +
            `Address: ${data.create_customer_address}, ` +
            `Phone: ${data.create_customer_phone}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/customers');
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while adding the customer.'
        );
    }
});

// Create Department using Stored Procedure
app.post('/departments/create', async (req, res) => {
    try {
        const {
            create_department_name,
            create_department_manager,
            create_department_address
        } = req.body;

        await db.query('CALL sp_CreateDepartment(?, ?, ?)', [
            create_department_name,
            create_department_manager,
            create_department_address
        ]);

        res.redirect('/departments');
    } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).send('Error creating department');
    }
});

// Create Employee using Stored Procedure
app.post('/employees/create', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query = `CALL sp_CreateEmployee(?, ?, ?)`;
        await db.query(query, [
            data.create_employee_departmentID,
            data.create_employee_name,
            data.create_employee_position
        ]);

        console.log(`CREATE Employee. Name: ${data.create_employee_name}, ` +
            `Department ID: ${data.create_employee_departmentID}, ` +
            `Position: ${data.create_employee_position}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/employees');
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while adding the employee.'
        );
    }
});

// Create Order using Stored Procedure
app.post('/orders/create', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateOrder(?, ?, ?, ?)`;
        await db.query(query1, [
            data.create_order_customerID,
            data.create_order_employeeID,
            data.create_order_date,
            data.create_order_cost
        ]);

        console.log(`CREATE Order. Customer ID: ${data.create_order_customerID}, ` +
            `Employee ID: ${data.create_order_employeeID}, ` +
            `Order Date: ${data.create_order_date}, ` +
            `Order Cost: ${data.create_order_cost}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/orders');
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while adding the order.'
        );
    }
});

// Create Toy using Stored Procedure
app.post('/toys/create', async (req, res) => {
    try {
        const {
            create_toy_toyName,
            create_toy_toyDescription,
            create_toy_toyCost,
            create_toy_toyStockAmount
        } = req.body;

        await db.query('CALL sp_CreateToy(?, ?, ?, ?)', [
            create_toy_toyName,
            create_toy_toyDescription,
            create_toy_toyCost,
            create_toy_toyStockAmount
        ]);

        res.redirect('/toys');
    } catch (error) {
        console.error('Error creating toy:', error);
        res.status(500).send('Error creating toy');
    }
});

// Create Toy Order using Stored Procedure
app.post('/toyorders/create', async (req, res) => {
    try {
        console.log('Received data:', req.body); // Debugging line

        const { create_toyorder_orderID, create_toyorder_toyID } = req.body;

        await db.query('CALL sp_CreateToyOrder(?, ?)', [
            create_toyorder_orderID,
            create_toyorder_toyID,
        ]);

        res.redirect('/toyorders');
    } catch (error) {
        console.error('Error creating toy order:', error);
        res.status(500).send('Error creating toy order');
    }
});

// ########################################
// READ ROUTES
// ###########################
app.get('/', async function (req, res) {
    try {
        res.render('home'); // Render the home.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
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

app.get('/orders', async function (req, res) {
    try {
        // Create and execute our queries
        const [orders] = await db.query(`
            SELECT 
            orderID,
            customerID,
            employeeID,
            DATE_FORMAT(orderDate, '%d %b %Y') AS orderDate,
            orderCost
            FROM Orders;`
        );
        const [customers] = await db.query('SELECT * FROM Customers');
        const [employees] = await db.query('SELECT * FROM Employees');

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
            DATE_FORMAT(orderDate, '%d %b %Y') AS orderDate
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
// UPDATE ROUTES
// ###########################

// Update Customer using Stored Procedure
app.post('/customers/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_UpdateCustomer(?, ?, ?)`;
        await db.query(query1, [
            data.update_customer_id,
            data.update_customer_address,
            data.update_customer_phone
        ]);

        console.log(`UPDATED Customer. ID: ${data.update_customer_id}, ` +
            `Email: ${data.update_customer_address}, ` +
            `Phone: ${data.update_customer_phone}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/customers');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// Update Department using Stored Procedure
app.post('/departments/update', async (req, res) => {
    try {
        const {
            update_department_id,
            update_department_name,
            update_department_manager,
            update_department_address
        } = req.body;

        await db.query('CALL sp_UpdateDepartment(?, ?, ?, ?)', [
            update_department_id,
            update_department_name,
            update_department_manager,
            update_department_address
        ]);

        res.redirect('/departments');
    } catch (error) {
        console.error('Error updating department:', error);
        res.status(500).send('Error updating department');
    }
});

// Update Employee using Stored Procedure
app.post('/employees/update', async function (req, res) {
    try {
        const data = req.body;

        const query = `CALL sp_UpdateEmployee(?, ?, ?)`;
        await db.query(query, [
            data.update_employee_id,
            data.update_departmentID,
            data.update_department_position
        ]);

        console.log(`UPDATED Employee. ID: ${data.update_employee_id}, ` +
            `Department ID: ${data.update_departmentID}, ` +
            `Position: ${data.update_department_position}`
        );

        res.redirect('/employees');
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).send('An error occurred while updating the employee.');
    }
});

// Update Order using Stored Procedure
app.post('/orders/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;
        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_UpdateOrder(?, ?, ?, ?)`;
        await db.query(query1, [
            data.update_order_id,
            data.update_order_employeeID,
            data.update_order_date,
            data.update_order_cost
        ]);
        console.log(`UPDATED Order. ID: ${data.update_order_id} ` +
            `Employee ID: ${data.update_order_employeeID}, ` +
            `Order Date: ${data.update_order_date}, ` +
            `Order Cost: ${data.update_order_cost}`
        );

        res.redirect('/orders');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// Update Toy using Stored Procedure
app.post('/toys/update', async (req, res) => {
    try {
        const {
            update_toy_id,
            update_toy_name,
            update_toy_description,
            update_toy_cost,
            update_toy_stockamount
        } = req.body;

        await db.query('CALL sp_UpdateToy(?, ?, ?, ?, ?)', [
            update_toy_id,
            update_toy_name,
            update_toy_description,
            update_toy_cost,
            update_toy_stockamount
        ]);

        res.redirect('/toys');
    } catch (error) {
        console.error('Error updating toy:', error);
        res.status(500).send('Error updating toy');
    }
});

// Update Toy Order using Stored Procedure
app.post('/toyorders/update', async (req, res) => {
    try {
        const data = req.body;

        await db.query('CALL sp_UpdateToyOrder(?, ?, ?)', [
            data.update_toyorder_id,
            data.update_toyorder_orderID,
            data.update_toyorder_toyID
        ]);

        res.redirect('/toyorders');
    } catch (error) {
        console.error('Error updating toy order:', error);
        res.status(500).send('Error updating toy order');
    }
});


// ########################################
// DELETE ROUTES
// ###########################

// Delete Customer using Stored Procedure
app.post('/customers/delete', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteCustomer(?);`;
        await db.query(query1, [data.delete_customer_id]);

        console.log(`DELETE Customer. ID: ${data.delete_customer_id} ` +
            `Name: ${data.delete_customer_name}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/customers');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// Delete Employee using Stored Procedure
app.post('/employees/delete', async (req, res) => {
    try {
        const data = req.body;

        const query = `CALL sp_DeleteEmployee(?);`;
        await db.query(query, [data.delete_employee_id]);

        console.log(`DELETE Employee. ID: ${data.delete_employee_id} Name: ${data.delete_employee_name}`);

        res.redirect('/employees');
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).send('An error occurred while deleting the employee.');
    }
});

// Delete Department using Stored Procedure
app.post('/departments/delete', async (req, res) => {
    try {
        data = req.body;

        await db.query('CALL sp_DeleteDepartment(?)', [data.delete_department_id]);
        console.log(`DELETE Department. ID: ${data.delete_department_id}, ` +
            `Department Name: ${data.delete_department_name}, `
        );

        res.redirect('/departments');
    } catch (error) {
        console.error('Error deleting department:', error);
        res.status(500).send('Error deleting department');
    }
});

// Delete Order using Stored Procedure
app.post('/orders/delete', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteOrder(?);`;
        await db.query(query1, [data.delete_order_id]);

        console.log(`DELETE Order. ID: ${data.delete_order_id} `);

        // Redirect the user to the updated webpage data
        res.redirect('/orders');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// Delete Toy using Stored Procedure
app.post('/toys/delete', async (req, res) => {
    try {
        const { delete_toy_id } = req.body;
        await db.query('CALL sp_DeleteToy(?)', [delete_toy_id]);

        res.redirect('/toys');
    } catch (error) {
        console.error('Error deleting toy:', error);
        res.status(500).send('Error deleting toy');
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