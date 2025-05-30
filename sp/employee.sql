
-- create
DELIMITER //

CREATE PROCEDURE AddEmployee (
    IN deptID INT,
    IN empName VARCHAR(25),
    IN empPosition VARCHAR(100)
)
BEGIN
    INSERT INTO Employees (departmentID, employeeName, employeePosition)
    VALUES (deptID, empName, empPosition);
END //

DELIMITER ;


-- delete--------------------------------------
-- Delete employee will also delete reletive order 
DELIMITER //

CREATE PROCEDURE sp_DeleteEmployee(IN empID INT)
BEGIN
    DELETE FROM Employees WHERE employeeID = empID;
END //

DELIMITER ;


-- Update --------------------------------------
DELIMITER //

CREATE PROCEDURE UpdateEmployee (
    IN empID INT,
    IN deptID INT,
    IN empPosition VARCHAR(100)
)
BEGIN
    UPDATE Employees
    SET departmentID = deptID,
        employeePosition = empPosition
    WHERE employeeID = empID;
END //

DELIMITER ;