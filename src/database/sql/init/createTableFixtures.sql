CREATE TABLE IF NOT EXISTS "fixtures" (
    `fixtureID` INTEGER,
    `home` INTEGER NOT NULL,
    `away` INTEGER NOT NULL,
    `date` TEXT NOT NULL,
    `final_score` TEXT,
    PRIMARY KEY(`fixtureID`)
)