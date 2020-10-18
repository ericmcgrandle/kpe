$( document ).ready(function() {

  $.ajax({
    method: "GET",
    url: "/admin/pending_data"
  }).done((orders) => {
    renderPending(orders);
  });


  const createDivElement = (obj, length) => {

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
          -Name-
          -Phone-
        </p>

        <form>
          <input type="number" value="30" required>
          <input name="time_to_complete" type="submit" value="Confirm">
        </form>
      </div>`;

    return newOrder;
  };

  const renderPending = (orders) => {
    let obj = {};
    result = orders.reduce(function (accum, current) {
      accum[current.id] = accum[current.id] || [];
      accum[current.id].push(current);
      return accum;
    }, obj);

    for (let id in obj) {
      const length = obj[id].length;
      const $order = createDivElement(obj[id], length);
      $('#append_new_orders').append($order);
    }
  };
});

