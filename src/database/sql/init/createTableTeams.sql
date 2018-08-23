CREATE TABLE IF NOT EXISTS "teams" (
    `teamID` INTEGER,
    `name` VARCHAR,
    `groupLetter` CHAR ( 1 ) NOT NULL,
    `matchesPlayed` INTEGER,
    `wins` INTEGER,
    `draws` INTEGER,
    `losses` INTEGER,
    `goalsScored` INTEGER,
    `goalsConceded` INTEGER,
    `isPlaying` TEXT,
    PRIMARY KEY(`teamID`)
)