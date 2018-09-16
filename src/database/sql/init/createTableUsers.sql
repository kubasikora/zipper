CREATE TABLE IF NOT EXISTS users (
    `userID` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `login` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `salt` VARCHAR(255),
    `UCLwinner` INT,
    PRIMARY KEY(`userID`)); 
