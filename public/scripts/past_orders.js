//Manipulates data, calls createOrderElement, appends to html
// const renderPending = (orders) => {
//   let obj = {};
//   result = orders.reduce(function (accum, current) {
//     accum[current.id] = accum[current.id] || [];
//     accum[current.id].push(current);
//     return accum;
//   }, obj);
//     for (let id in obj) {
//     const length = obj[id].length;
//     if (obj[id][0].confirmed) {
//       const $order = createOrderElement(obj[id], length);
//       $('#orders_in_process').append($order);
//     } else {
//       const $order = createOrderElement(obj[id], length);
//       $('#append_new_orders').append($order);
//     }
//   }

    //Creates the div elements for past orders
    // const createOrderElement = (obj, length) => {
      //Order id
      // let pastOrder = `
      //   <div class="pending-order">
      //     <p class="orderId">Order ${obj[0].id}</p>
      // `;
      //Order details
      // for (let id of obj) {
      //   pastOrder += `
      //     <p>
      //       ${id.size} === ${id.item}
      //     </p>
      //   `;
      // }


// 
$(document).ready(() => {
  $.ajax({
    method: "GET",
    url: "/admin/past_orders_data"
  }).done((orders) => {

    renderPastOrders(orders);
  });


  const renderPastOrders = function (orders) {
    console.log('orders', orders)
    for (let order of orders) {
    const $completedOrder = $(`
    <div class="container-past-orders">
      <p class="order-id"> ${order.id}</p>
      <p class="completed-at"> ${order.completed_at}</p>
      <p class="order-name"> ${order.name}</p>
      <p class="order-phone-number"> ${order.phone}</p>
    </div>
    `)
    const $past_orders = $('.append-past-orders'); 
    $past_orders.append($completedOrder);
    }
  }

  // const createPastOrdersElement = function (orders) {
  //   console.log(name);
  
  // }


});


// 


