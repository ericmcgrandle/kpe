const createDivElement = (order, user) => {

}



$(() => {

  //On button click
  $('#confirm_order').click((event) => {
    event.preventDefault();

    //Check information


    //add div to pending.ejs
    //fake data
    const order = {
      name: 'Veggie',
      size: 'small',
      price: 16
    };
    const user = {
      name: 'Eric',
      phone: 7788723562
    };

    createDivElement(order, user);


    //send text

  })

});
