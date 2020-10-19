const updateTimeDatabase = (obj, db) => {

  //IN THEN UPDATE QUERY TO GET PHONE NUMBER FROM DATABASE

  return db.query(`
    UPDATE orders
    SET confirmed = ${obj.inputVal}
    WHERE id = ${obj.orderId}
    ;`)
  .then(() =>
    db.query(`
    SELECT phone
    FROM users
    JOIN orders ON (users.id = orders.user_id)
    WHERE orders.id = ${obj.orderId}
    ;`)
  )
  .catch(err => console.log('error', err));

};

module.exports = {
  updateTimeDatabase
}
