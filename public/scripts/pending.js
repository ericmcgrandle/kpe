$( document ).ready(function() {

  const pastOrders = `
    <div class="header-right">
          <a class="admin" href="past_orders">Past Orders</a>
        </div>
  `;

  $('.admin').remove();
  $('.header').append(pastOrders);


  //Gets data for pending orders
  $.ajax({
    method: "GET",
    url: "/admin/pending_data"
  }).done((orders) => {
    console.log('rendering new data');
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
          <button class="adminForm adminComplete btn btn-dark" type="submit">Complete</button>
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

    //Confirm button handler
    const confirmButton = function () {

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
        const str = pendingDiv.outerHTML;

        let order = $(pendingDiv).find('.orderId').text();
        const orderId = order.substring(6);

        //Manipulate div element to have confirm button
        const substring = str.substring(str.lastIndexOf("<form>"), str.lastIndexOf("</form>") + 7);

        const newSubstring =
        `<form>
        <button type="submit" class="adminForm adminComplete">Complete</button>
        </form>`

        const confirmedOrder = str.replace(substring, newSubstring);

        //remove from pending orders, add to orders in process, create event listener
        $(pendingDiv).remove();
        $('#orders_in_process').append($(confirmedOrder));
        completeButton();

        //update database for confirm button
        $.ajax({
          method: "POST",
          url: "/admin/updateTimeDatabase",
          data: { inputVal, orderId }
        });
      });
    }

    const completeButton = function () {
      // Create event listener
      const $completeButton = $('.adminComplete');
      $completeButton.on('click', function (event) {

        event.preventDefault();
        // find div
        const button = event.target;
        const pendingDiv = button.closest('.pending-order');
        let order = $(pendingDiv).find('.orderId').text();
        const orderId = order.substring(6);

        $(pendingDiv).remove();
        // update database for complete button
        $.ajax({
          method: "POST",
          url: "/admin/updateCompletedTime",
          data: { orderId }
        });
      });
    }

    //Call functions so when page is refreshed event listeners are created
    confirmButton();
    completeButton();

  };

});

