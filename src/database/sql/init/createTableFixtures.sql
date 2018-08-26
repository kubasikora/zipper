CREATE TABLE IF NOT EXISTS "fixtures" (
    `fixtureID` INTEGER,
    `home` INTEGER NOT NULL,
    `away` INTEGER NOT NULL,
    `date` INTEGER NOT NULL,
    `final_score` TEXT,
    PRIMARY KEY(`fixtureID`)
)