-- citation: 
-- chat GPT: https://chatgpt.com/share/68463511-3fc4-8013-a24a-a7b9e6f9935d
-- Description: Give the database SQL and app.js code, and let it make CRUD sp functions

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
