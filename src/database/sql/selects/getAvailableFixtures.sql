SELECT t1.fixtureID, t1.date, t1.final_score, t2.name AS home, t3.name AS away
FROM fixtures t1
JOIN teams t2
ON t2.teamID = t1.home
JOIN teams t3 
ON t3.teamID = t1.away
WHERE t1.final_score IS NULL AND t1.date > ?