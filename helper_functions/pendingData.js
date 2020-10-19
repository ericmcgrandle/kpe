const getPending = (db) => {
  return db.query(`
    SELECT orders.id, menu_items.item, menu_items.size, users.name, users.phone, orders.confirmed
    FROM orders
    JOIN carts ON (orders.id = carts.order_id)
    JOIN menu_items ON (carts.menu_id = menu_items.id)
    JOIN users ON (orders.user_id = users.id)
    WHERE completed_at IS NULL
    ;`)
  .then(res => res.rows)
  .catch(err => console.log('error', err));
};


module.exports = {
  getPending
}
