CREATE TABLE IF NOT EXISTS fixtures (
    `fixtureID` INTEGER NOT NULL AUTO_INCREMENT,
    `home` INTEGER NOT NULL,
    `away` INTEGER NOT NULL,
    `date` BIGINT NOT NULL,
    `final_score` TEXT,
    PRIMARY KEY(`fixtureID`)
);