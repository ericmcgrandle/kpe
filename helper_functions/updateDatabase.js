const { user } = require("pg/lib/defaults");

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

const updateCompletedAt = (obj, db) => {
  return db.query(`
  UPDATE orders
  SET completed_at = NOW()
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

const updateOrderPurchase = (obj, db) => {
  console.log('object', obj.phone);
    return db.query(`
    INSERT INTO users (name, phone)
    VALUES ('${obj.name}', ${obj.phone})  
    ;`)
  .then(() =>
    db.query(`
    INSERT INTO orders (user_id, created_at, confirmed, completed_at)
    VALUES (
      (
      SELECT users.id
      FROM users
      WHERE users.name = '${obj.name}'
      AND users.phone = ${obj.phone}
      ),
      NOW(), NULL, NULL) 
    ;`)
  )
  .catch(err => console.log('error', err));
};

module.exports = {
  updateTimeDatabase,
  updateCompletedAt,
  updateOrderPurchase
}
