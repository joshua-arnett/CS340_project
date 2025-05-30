
-- create--------------------------------------
DELIMITER //

CREATE PROCEDURE CreateDepartment(
    IN deptName VARCHAR(100),
    IN deptManager VARCHAR(100),
    IN deptAddress VARCHAR(255)
)
BEGIN
    INSERT INTO Departments (departmentName, departmentManager, departmentAddress)
    VALUES (deptName, deptManager, deptAddress);
END //

DELIMITER ;

-- update--------------------------------------
DELIMITER //

CREATE PROCEDURE UpdateDepartment(
    IN deptID INT,
    IN deptName VARCHAR(100),
    IN deptManager VARCHAR(100),
    IN deptAddress VARCHAR(255)
)
BEGIN
    UPDATE Departments
    SET 
        departmentName = deptName,
        departmentManager = deptManager,
        departmentAddress = deptAddress
    WHERE departmentID = deptID;
END //

DELIMITER ;

-- delete--------------------------------------
-- delete department will also delete employee 
DELIMITER //

CREATE PROCEDURE DeleteDepartment(
    IN deptID INT
)
BEGIN
    DELETE FROM Departments
    WHERE departmentID = deptID;
END //

DELIMITER ;