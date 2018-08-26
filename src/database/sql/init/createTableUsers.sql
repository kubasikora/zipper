CREATE TABLE IF NOT EXISTS "users" (
    `userID` INTEGER NOT NULL,
    `name` TEXT,
    `login` TEXT NOT NULL UNIQUE,
    `password` TEXT NOT NULL,
    `salt` TEXT,
    PRIMARY KEY(`userID`) 
)