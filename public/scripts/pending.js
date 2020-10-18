$( document ).ready(function() {

  //Gets data for pending orders
  $.ajax({
    method: "GET",
    url: "/admin/pending_data"
  }).done((orders) => {
    renderPending(orders);
  });


  //Creates the div elements for pending orders
  const createOrderElement = (obj, length) => {
    //Order id
    let newOrder = `
      <div>
        <p>
          Order ${obj[0].id}:
        </p>
    `;

    //Order details
    for (let id of obj) {
      newOrder += `
        <p>
          ${id.size} === ${id.item}
        </p>
      `;
    }

    //User information and form
    newOrder += `
        <p>
          ${obj[0].name}
          ${obj[0].phone}
        </p>

        <form>
          <input type="number" value="30" required>
          <input name="time_to_complete" type="submit" value="Confirm">
        </form>
      </div>`;

    return newOrder;
  };

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
      const $order = createOrderElement(obj[id], length);
      $('#append_new_orders').append($order);
    }
  };
});

