$( document ).ready(function() {

  //Gets data for pending orders
  $.ajax({
    method: "GET",
    url: "/admin/pending_data"
  }).done((orders) => {
    renderPending(orders);
  });


  //Creates the div elements for pending orders
  const createOrderElement = (obj) => {
    //Order id
    let newOrder = `
      <div class="pending-order">
        <p class="orderId">Order ${obj[0].id}</p>
    `;

    //Order details
    for (let id of obj) {
      newOrder += `
        <p>
          ${id.size} ${id.item}
        </p>
      `;
    }

    //User information and form
    newOrder += `
        <p>
          For:
          <br>
          ${obj[0].name}
          <br>
          ${obj[0].phone}
        </p>
    `;

    if (obj[0].confirmed) {
      newOrder += `
        <form>
          <button class="adminForm" type="submit" id="adminComplete">Complete</button>
        </form>
      </div>`;
    } else {
      newOrder += `
          <form>
            <input class="adminForm" type="number" value="30" required>
            <input class="adminForm adminConfirmButton" name="time_to_complete" type="submit" value="Confirm">
          </form>
        </div>`;
    }

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
      if (obj[id][0].confirmed) {
        const $order = createOrderElement(obj[id]);
        $('#orders_in_process').append($order);
      } else {
        const $order = createOrderElement(obj[id]);
        $('#append_new_orders').append($order);
      }
    }

    let adminConfirmButton = $('.adminConfirmButton');
    $(adminConfirmButton).on('click', function(event) {
      event.preventDefault();

      //Get div element
      const button = event.target;
      const form = button.closest('form');
      //Time value
      const inputVal = $(form).find('input').val();
      //Div element
      const pendingDiv = button.closest('.pending-order');
      console.log('pendingDiv :', pendingDiv);
      const str = pendingDiv.outerHTML;

      let order = $(pendingDiv).find('.orderId').text();
      const orderId = order.substring(6);

      //Manipulate div element to have confirm button
      const substring = str.substring(str.lastIndexOf("<form>"), str.lastIndexOf("</form>") + 7);

      const newSubstring =
      `<form>
      <button type="submit" id="adminComplete">Complete</button>
      </form>`

      const confirmedOrder = str.replace(substring, newSubstring);

      //remove from pending orders, add to orders in process
      $(pendingDiv).remove();
      $('#orders_in_process').append($(confirmedOrder));

      //update database
      $.ajax({
        method: "POST",
        url: "/admin/updateTimeDatabase",
        data: { inputVal, orderId }
      }).done((orders) => {
        console.log('update complete');
      });
    });
  };
});

