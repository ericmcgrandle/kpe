$(document).ready(() => {
  $.ajax({
    method: "GET",
    url: "/admin/past_orders_data"
  }).done((orders) => {

    renderPastOrders(orders);
  });


  const renderPastOrders = function (orders) {
    for (let order of orders) {
    const dateObj = new Date(order.completed_at);
    const utcString = dateObj.toUTCString();
    const time = utcString.slice(0, 22)
    const $completedOrder = $(`
    <div class="container-past-orders">
      <p class="order-id">Order ID: ${order.id}</p>
      <p class="completed-at">${time}</p>
      <p class="order-name">Client name: ${order.name}</p>
      <p class="order-phone-number">Client phone number: ${order.phone}</p>
    </div>
    `)
    const $past_orders = $('.append-past-orders'); 
    $past_orders.append($completedOrder);
    }
  }
});


