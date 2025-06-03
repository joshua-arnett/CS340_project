
DELIMITER //

-- create--------------------------------------

CREATE PROCEDURE sp_CreateCustomer(
    IN custName VARCHAR(100),
    IN custAddress VARCHAR(100),
    IN custPhone VARCHAR(30)
)
BEGIN
    INSERT INTO Customers (customerName, customerAddress, customerPhone)
    VALUES (custName, custAddress, custPhone);
END //

-- update--------------------------------------

CREATE PROCEDURE sp_UpdateCustomer(
    IN custID INT,
    IN custName VARCHAR(50),
    IN custAddress VARCHAR(100),
    IN custPhone VARCHAR(25)
)
BEGIN
    UPDATE Departments
    SET 
        departmentName = deptName,
        departmentManager = deptManager,
        departmentAddress = deptAddress
    WHERE customerID = deptID;
END //

-- delete--------------------------------------

CREATE PROCEDURE sp_DeleteCustomer(
    IN custID INT
)
BEGIN
    DELETE FROM Customers
    WHERE customerID = custID;
END //

DELIMITER ;