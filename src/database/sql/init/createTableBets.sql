CREATE TABLE IF NOT EXISTS "bets" (
    `betID` INTEGER,
    `fixture` INTEGER,
    `user` INTEGER,
    `result` TEXT,
    PRIMARY KEY (`betID`)
)