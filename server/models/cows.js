var db = require('../db');
var mysql = require('mysql');

//models define database queries

module.exports = {
  getAll: function (callback) {
    //
    let queryString = 'SELECT * FROM list_of_cows;';
    //
    db.connection.query(queryString, (err, data) => {
      if (err) {
        throw 'Error getting cows';
      } else {
        callback(err, data);
      }
    });
  },
  create: function ({ name, description }, callback) {
    //
    let queryString = `INSERT INTO list_of_cows (name, description) \ 
    VALUES (${mysql.escape(name)}, ${mysql.escape(description)});`;
    //
    db.connection.query(queryString, (err, data) => {
      if (err) {
        throw 'Error adding cows to herd';
      } else {
        callback(err, data);
      }
    });
  },
  delete: function (id, callback) {
    //
    let queryString = `DELETE FROM list_of_cows WHERE list_of_cows.id = ${mysql.escape(id)}`;
    //
    db.connection.query(queryString, (err, data) => {
      if (err) {
        throw 'Error deleting cow';
      } else {
        callback(err, data);
      }
    });
  },
  put: function ({ id, name, description }, callback) {
    //
    let queryString = `UPDATE list_of_cows SET ? WHERE list_of_cows.id = ${mysql.escape(id)}`;
    //
    db.connection.query(queryString, { name, description }, (err, data) => {
      if (err) {
        throw 'Error updating row';
      } else {
        callback(err, data);
      }
    });
  },
};
