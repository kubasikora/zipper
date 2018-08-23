var express = require('express')
var logger = require('./server/logger.js').logger;
var users = require('./api/users').users;

var init = require('./database/init')
var app = express()


init.init();
app.use(logger);
app.use(express.static('../public'));

app.get('/api', (req, res) => {
    users(null, (rows) => {
        res.status(200);
        res.contentType('application/json');
        res.send(rows)
    });
});

app.get('/add', (req, res) => {
    db.run('INSERT INTO PIWKAHEHE (FROM_ID, TO_ID) VALUES (1, 4)', () => {
        res.send('Added')
    });
})

app.listen(8080);
console.log("Listening on port 8080");