const updateTimeDatabase = (obj, db) => {

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
        ORDER BY id DESC
        LIMIT 1
      ),
      NOW(), NULL, NULL)
    ;`)
  )
  .then(() => {
    for(let item of obj.objOrderData) {
      db.query(`
      INSERT INTO carts (order_id, menu_id)
      VALUES
      (
        (
          SELECT orders.id
          FROM orders
          ORDER BY created_at DESC
          LIMIT 1
        ),
        (
          SELECT menu_items.id
          FROM menu_items
          WHERE item = '${item.name}'
          AND price = ${Number(item.price)}
        )
      )
      ;`)
    }
  })
  .then(() => {
    return db.query(`
    SELECT id FROM orders ORDER BY id DESC LIMIT 1;
    `)
  })
  .catch(err => console.log('error', err));
};


const getUserData = (id, db) => {
  return db.query(`
    SELECT * FROM orders WHERE id = ${id};
  `)
  .then((result) => {
    const ordersObj = result.rows[0];
    const userId = ordersObj.user_id;

    return db.query(`
    SELECT * FROM users WHERE id = ${userId};
    `)
  })
  .catch((err) => console.log('err', err));
};

const orderReady = function(id, db) {
  return db.query(`
  SELECT id, completed_at
  FROM orders
  WHERE id = ${id}
  ;`)
};

const checkTime = (orderId, db) => {
  return db.query(`
    SELECT confirmed, completed_at FROM orders WHERE id = ${orderId};
  `)
};

module.exports = {
  updateTimeDatabase,
  updateCompletedAt,
  updateOrderPurchase,
  getUserData,
  orderReady,
  checkTime
}
