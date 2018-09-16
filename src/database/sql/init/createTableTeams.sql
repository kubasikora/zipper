CREATE TABLE IF NOT EXISTS teams (
  `teamID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `groupLetter` VARCHAR(1) NOT NULL,
  `matchesPlayed` INT,
  `wins` INT,
  `draws` INT,
  `losses` INT,
  `goalsScored` INT,
  `goalsConceded` INT,
  `isPlaying` TEXT,
  PRIMARY KEY(`teamID`),
  UNIQUE(`name`)
);