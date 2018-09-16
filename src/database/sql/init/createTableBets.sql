CREATE TABLE IF NOT EXISTS bets (
    `betID` INTEGER NOT NULL AUTO_INCREMENT,
    `fixture` INTEGER,
    `user` INTEGER,
    `result` TEXT,
    PRIMARY KEY (`betID`)
);