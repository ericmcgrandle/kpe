$(() => {

  const url = window.location.href;
  const orderId = url.substring(30);

  //get user data
  $.ajax({
    method: "GET",
    url: `/getData/${orderId}`
  }).done((user) => {
    renderConfirmation(user);
  });

  $.ajax({
    method: "GET",
    url: `/orderComplete/${orderId}`
  }).done((data) => {
    console.log('THIS IS DATA', data)
    if (data.completed_at) {
      renderCompleted(data);
    }
  })

  const renderCompleted = function(data) {
    const complete = `
    <div class="complete-content">
      <p>Good news... your order is ready for pickup!</p>
    </div>
    `
    // $().remove();
    $('#confirm-data').append(complete);
  }
  //check if restaurant has updated time estimate
  $.ajax({
    method: "GET",
    url: `/checkTimeData/${orderId}`
  }).done((value) => {
    if (value.confirmed) {
      addTime(value.confirmed);
    }
  });




  const renderConfirmation = (userData) => {
    const userName = `
      <div class="confirmation-content">
        <h1>Thank You ${userData.name} For Your Order!</h1>
        <p>Stay tuned for the restaurant to confirm your order and return an estimate on the time...</p>
      </div>
    `;
    $('#no-user').remove();
    $('#confirm-data').append(userName);
  };

  const addTime = (time) => {
    const timeElement = `
    <p>Your order will be ready in ${time} minutes!</p>
    `;

    $('#updated-time').append(timeElement);

  };
});
