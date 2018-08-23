exports.users = (db, callback) => {
    var data = [];
    db.all('SELECT * FROM PIWKAHEHE', [], (err, rows) => {
        if(err) throw err; 
        callback(rows)
    });
    return data;
}