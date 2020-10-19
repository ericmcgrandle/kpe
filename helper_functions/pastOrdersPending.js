const getPastOrders = (db) => {
  return db.query(`
    SELECT users.name, users.phone, orders.id, orders.completed_at, menu_items.item, menu_items.size
    FROM orders
    JOIN carts ON (orders.id = carts.order_id)
    JOIN menu_items ON (carts.menu_id = menu_items.id)
    JOIN users ON (orders.user_id = users.id)
    WHERE confirmed IS NOT NULL
    ;`)
  .then(res => res.rows)
  .catch(err => console.log('error', err));
};

module.exports = {
  getPastOrders
}