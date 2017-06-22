export default ({ table, db }) => {
  return {
    list(callback) {
      if (NODE_ENV === 'development') {
        console.log(`List rows from ${table}`);
      }
      db.all(`SELECT * FROM '${table}'`)
          .then(data => callback(data))
          .catch(err => console.error(err));
    },
    add(insertData, callback) {
      if (!insertData) { return false; }
      const insertStr = Object.values(insertData)
        .map(str => `"${str}"`).toString();

      db.run(`INSERT INTO ${table} VALUES (NULL, ${insertStr})`)
          .then(data => callback(data));
    },
    change(id, updateData, callback) {
      db.run('UPDATE ? SET ? WHERE `id` = ?', [table, updateData, id])
        .then(data => callback(data));
    },
    complete(id, callback) {
      db.run(`UPDATE ${table} SET \`completed\`=1 WHERE \`id\` = '${id}'`)
        .then(data => callback(data));
    },
    delete(id, callback) {
      db.exec('DELETE FROM ? WHERE `id` = ? LIMIT 1;', [table, id])
        .then(data => callback(data));
    },
  };
};
