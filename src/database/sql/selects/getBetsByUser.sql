SELECT t1.betID, t1.fixture, t2.date, t2.final_score, t3.name AS home, t1.result AS bet, t4.name AS away
FROM bets t1
JOIN fixtures t2 
ON t1.fixture = t2.fixtureID
JOIN teams t3 
ON t2.home = t3.teamID
JOIN teams t4 
ON t2.away = t4.teamID
WHERE t1.user = ?
