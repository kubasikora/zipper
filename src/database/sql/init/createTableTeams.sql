CREATE TABLE IF NOT EXISTS "teams" (
    `teamID` INTEGER NOT NULL,
    `name` VARCHAR UNIQUE,
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