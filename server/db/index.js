var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cows',
});

connection.connect({function(err){
    if (err) {
        console.log('Could not connect to the database due to:', err);
        return;
    }
    console.log('Connected to the database')
})

module.exports.connection = connection;

