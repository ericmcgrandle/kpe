//Manipulates data, calls createOrderElement, appends to html
const renderPending = (orders) => {
  let obj = {};
  result = orders.reduce(function (accum, current) {
    accum[current.id] = accum[current.id] || [];
    accum[current.id].push(current);
    return accum;
  }, obj);
    for (let id in obj) {
    const length = obj[id].length;
    if (obj[id][0].confirmed) {
      const $order = createOrderElement(obj[id], length);
      $('#orders_in_process').append($order);
    } else {
      const $order = createOrderElement(obj[id], length);
      $('#append_new_orders').append($order);
    }
  }

    //Creates the div elements for past orders
    const createOrderElement = (obj, length) => {
      //Order id
      let pastOrder = `
        <div class="pending-order">
          <p class="orderId">Order ${obj[0].id}</p>
      `;
      //Order details
      for (let id of obj) {
        pastOrder += `
          <p>
            ${id.size} === ${id.item}
          </p>
        `;
      }