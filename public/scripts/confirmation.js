$(() => {

  const url = window.location.href;
  const orderId = url.substring(30);

  $.ajax({
    method: "GET",
    url: `/getData/${orderId}`
  }).done((user) => {
    renderConfirmation(user);
  });

  const renderConfirmation = (userData) => {
    const userName = `
      <div class="confirmation-content">
        <h1>Thank You ${userData.name} For Your Order!</h1>
        <p>Stay tuned for the restaurant to confirm your order and return an estimate on the time...</p>
      </div>
    `
    $('#no-user').remove();
    $('#confirm-data').append(userName);
  }
});
