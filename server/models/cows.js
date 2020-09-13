var db = require('../db');
var mysql = require('mysql');

//models define database queries

module.exports = {
  getAll: function (callback) {
      var queryString = 'SELECT * FROM list_of_cows'
      db.connection.query(queryString, (err, data) => {
          if (err) {
              throw 'Error getting cows'
          } else {
              callback(err, data)
          }
      })
  },
  create: function (callback) {},
};
