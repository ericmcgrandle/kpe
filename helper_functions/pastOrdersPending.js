const getPastOrders = (db) => {
  return db.query(`
    SELECT users.name, users.phone, orders.id, orders.completed_at
    FROM orders
    JOIN users ON orders.user_id = users.id
    WHERE orders.completed_at IS NOT NULL
    ORDER BY orders.completed_at DESC
    ;`)
  .then(res => res.rows)
  .catch(err => console.log('error', err));
};

module.exports = {
  getPastOrders
}