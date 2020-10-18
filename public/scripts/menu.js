$(document).ready(function() {
  let removeBtn = $('.remove-btn');
  removeBtn.each(function() {
    $(this).on('click', function(event) {
      const buttonClicked = event.target;
      const tableRow = buttonClicked.closest('tr');
      tableRow.remove();
      updateCartTotal()

    })
  })
});

const updateCartTotal = function() {
  const cartItems = $('.cart-row');
  let total = 0;
  cartItems.each(function() {
    const cartItem = $(this);
    const itemPrice = cartItem.find('.item-price');
    const quantityItem = cartItem.find('.quantity-input');
    const price = parseInt(itemPrice.text().replace('$', ''));
    const quantity = quantityItem.val();
    total = total + (price * quantity);
  })
  $('.total-price').html('$' + total + '.00');
};



