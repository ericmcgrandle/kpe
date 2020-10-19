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
      <div class="pending-order">
        <p class="orderId">Order ${obj[0].id}</p>
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
    `;

    if (obj[0].confirmed) {
      newOrder += `
        <form>
          <button type="submit" id="adminComplete">Complete</button>
        </form>
      </div>`;
    } else {
      newOrder += `
          <form>
            <input type="number" value="30" required>
            <input class="adminConfirmButton" name="time_to_complete" type="submit" value="Confirm">
          </form>
        </div>`;
    }

    return newOrder;
  };


  //Manipulates data, calls createOrderElement, appends to html
  const renderPending = (orders) => {

    console.log('orders', orders);

    //REDUCE FUNCTION
    let obj = {};
    result = orders.reduce(function (accum, current) {
      accum[current.id] = accum[current.id] || [];
      accum[current.id].push(current);
      return accum;
    }, obj);

    console.log('after reduce', obj);

    //LOOP THROUGH REDUCED OBJ
    for (let id in obj) {

      //Inside of for loop
      console.log('inside for loop', obj[id]);

      const length = obj[id].length;

      //IF ITEM IS CONFIRMED
      if (obj[id][0].confirmed) {
        const $order = createOrderElement(obj[id], length);
        $('#orders_in_process').append($order);
      } else {
        const $order = createOrderElement(obj[id], length);
        $('#append_new_orders').append($order);
      }
    }


    //BUTTON FUNCTIONALITY

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
      const str = pendingDiv.innerHTML;

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

