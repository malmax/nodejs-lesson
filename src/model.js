import mysql from 'mysql';
import config from './config';

const pool = mysql.createPool(config);


export default (table) => {
  return {
    list(callback) {
      pool.getConnection((err, connection) => {
        // используем полученное соединение
        connection.query('SELECT * FROM ??', [table], (queryErr, rows) => {
          // возвращаем соединение в пул
          connection.release();

          if (queryErr) {
            // console.log("Error", err);
            return callback(queryErr);
          }
          return callback(null, rows);
        });
      });
    },
    add(insertData, callback) {
      pool.getConnection((err, connection) => {
        // используем полученное соединение
        connection.query('INSERT INTO ?? SET ?', [table, insertData], (queryErr, results) => {
          // возвращаем соединение в пул
          connection.release();

          if (queryErr) {
            // console.log("Error", err);
            return callback(queryErr);
          }
          console.log(`Добавлена запись ${results.insertId}`);
          return callback(null, results.insertId);
        });
      });
    },
    change(id, updateData, callback) {
      pool.getConnection((err, connection) => {
        // используем полученное соединение
        connection.query('UPDATE ?? SET ? WHERE `id` = ?', [table, updateData, id], (queryErr, results) => {
          // возвращаем соединение в пул
          connection.release();

          if (queryErr) {
            // console.log("Error", err);
            return callback(queryErr);
          }
          return callback(null, results.changedRows);
        });
      });
    },
    complete(id, callback) {
      pool.getConnection((err, connection) => {
        // используем полученное соединение
        connection.query('UPDATE ?? SET `complete`=1 WHERE `id` = ?', [table, id], (queryErr, results) => {
          // возвращаем соединение в пул
          connection.release();

          if (queryErr) {
            // console.log("Error", err);
            return callback(queryErr);
          }
          return callback(null, results.changedRows);
        });
      });
    },
    delete(id, callback) {
      pool.getConnection((err, connection) => {
        // используем полученное соединение
        connection.query('DELETE FROM ?? WHERE `id` = ? LIMIT 1;', [table, id], (queryErr, results) => {
          // возвращаем соединение в пул
          connection.release();

          if (queryErr) {
            // console.log("Error", err);
            return callback(queryErr);
          }
          return callback(null, Boolean(results.affectedRows));
        });
      });
    },
  };
};
