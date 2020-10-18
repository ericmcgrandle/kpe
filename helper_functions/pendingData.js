const getPending = (db) => {
  return db.query(`
    SELECT orders.id, menu_items.item, size
    FROM orders
    JOIN carts ON (orders.id = carts.order_id)
    JOIN menu_items ON (carts.menu_id = menu_items.id)
    WHERE completed_at IS NULL
    ;`)
  .then(res => res.rows)
  .catch(err => console.log('error', err));
};


module.exports = {
  getPending
}
