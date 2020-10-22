$(() => {
  const url = window.location.href;
  const orderId = url.substring(30);

  //Ajax calls for get data
  const getData = () => {
    console.log('loading data');

    //get user data
    $.ajax({
      method: "GET",
      url: `/getData/${orderId}`
    }).done((user) => {
      renderConfirmation(user);
    });

    //check if restaurant has updated time estimate
    $.ajax({
      method: "GET",
      url: `/checkTimeData/${orderId}`
    }).done((value) => {
      if (value.confirmed && !value.completed_at) {
        addTime(value.confirmed);
      }
    });

    //check if restaurant has completed order
    $.ajax({
      method: "GET",
      url: `/orderComplete/${orderId}`
    }).done((data) => {
      if (data.completed_at) {
        renderCompleted(data);
      }
    });
  };

  //Get data on initial load, set interval for every 60 seconds
  getData();
  setInterval(getData, 10000);


  const renderCompleted = function(data) {
    const pTag = `
    Your order is ready for pickup!
    `;
    $('#message').html(pTag)
  }

  const renderConfirmation = (userData) => {
    const userName = `
      Thank You ${userData.name} For Your Order!
    `;

    $('#header-message').html(userName);
  };

  const addTime = (time) => {
    const timeElement = `
    Your order will be ready in ${time} minutes!
    `;
    $('#message').html(timeElement);
  };
});
