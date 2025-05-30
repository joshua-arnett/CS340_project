
-- create--------------------------------------
DELIMITER //

CREATE PROCEDURE CreateToy(
    IN toyName VARCHAR(100),
    IN toyDescription TEXT,
    IN toyCost DECIMAL(10,2),
    IN toyStockAmount INT
)
BEGIN
    INSERT INTO Toys (toyName, toyDescription, toyCost, toyStockAmount)
    VALUES (toyName, toyDescription, toyCost, toyStockAmount);
END //

DELIMITER ;

-- update--------------------------------------

DELIMITER //

CREATE PROCEDURE UpdateToy(
    IN in_toyID INT,
    IN in_toyName VARCHAR(100),
    IN in_toyDescription TEXT,
    IN in_toyCost DECIMAL(10,2),
    IN in_toyStockAmount INT
)
BEGIN
    UPDATE Toys
    SET 
        toyName = in_toyName,
        toyDescription = in_toyDescription,
        toyCost = in_toyCost,
        toyStockAmount = in_toyStockAmount
    WHERE toyID = in_toyID;
END //

DELIMITER ;


-- delete--------------------------------------
-- delete toy will delete toyorder 
DELIMITER //

CREATE PROCEDURE DeleteToy(IN in_toyID INT)
BEGIN
    DELETE FROM Toys WHERE toyID = in_toyID;
END //

DELIMITER ;