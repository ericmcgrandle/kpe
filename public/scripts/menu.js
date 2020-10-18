$(document).ready(function() {
  let removeBtn = $('.remove-btn');
  removeBtn.each(function() {
    $(this).on('click', removeCartItem)
  })
  const inputQuantities = $('.quantity-input');
  inputQuantities.each(function() {
    $(this).on('change', quantityChanged)
  })
  const addSizeBtns = $('.size-btn');
  addSizeBtns.each(function() {
    $(this).on('click', addToCartClick);
  })
  const confirmButton = $('.confirm-btn');
  $(confirmButton).on('click', confirmClicked);

});

const removeCartItem = function(event) {
  const buttonClicked = event.target;
  const tableRow = buttonClicked.closest('tr');
  tableRow.remove();
  updateCartTotal()
};

const quantityChanged = function(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal();
};

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
  $('.total-price').text('$' + total + '.00');
};

const addToCartClick = function(event) {
  const button = event.target;
  const itemContainer = button.closest('.pizza-item');
  const item = $(itemContainer).find('h4');
  const itemName = item.text();
  const priceContainer = button.closest('.size-container');
  const priceEl = $(priceContainer).find('.menu-price');
  const price = priceEl.text();
  const sizeSelected = $(priceContainer).find('.menu-size');
  const size = sizeSelected.text();
  addItemToCart(itemName, price, size);
  updateCartTotal();
};

const addItemToCart = function(itemName, price, size) {
  // const cartNames = $('.cart-name');
  // cartNames.each(function() {
  //   if(cartNames.text() === itemName) {

  //   }
  // })
  const $newItem = $(`<tr class="cart-row">
  <td class="cart-name">${itemName}</td>
  <td>${size}</td>
  <td class="item-price">${price}</td>
  <td><input class="quantity-input" type="number" value="1"></td>
  <td><button class="remove-btn" type="button">Delete</button></td>
  </tr>`)
  const $container = $('.cart-items');
  $container.append($newItem);
  const removeBtn = $('.remove-btn');
  $(removeBtn).on('click', removeCartItem);
  const quantityChange = $('.quantity-input');
  $(quantityChange).on('change', quantityChanged);
};

const confirmClicked = function() {

}




