-- create--------------------------------------
DELIMITER //

CREATE PROCEDURE CreateToyOrder(
    IN p_orderID INT,
    IN p_toyID INT
)
BEGIN
    INSERT INTO ToyOrders (orderID, toyID)
    VALUES (p_orderID, p_toyID);
END //

DELIMITER ;