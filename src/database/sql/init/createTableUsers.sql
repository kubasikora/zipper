CREATE TABLE IF NOT EXISTS "users" (
    `userID` INTEGER NOT NULL,
    `name` VARCHAR,
    `login` VARCHAR ( 255 ) NOT NULL,
    `password` VARCHAR ( 255 ) NOT NULL,
    PRIMARY KEY(`userID`) 
)