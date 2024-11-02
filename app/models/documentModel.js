const db = require('../config/db');

const insertDocument = (filename, path) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO documents (filename, path) VALUES (?, ?)';
    db.run(sql, [filename, path], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.lastID);
    });
  });
};

const getDocumentById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM documents WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
};

module.exports = { insertDocument, getDocumentById };
