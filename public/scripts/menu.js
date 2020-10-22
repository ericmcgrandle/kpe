let objOrderData = [];
$(document).ready(function() {

  const inputQuantities = $('.quantity-input');
  inputQuantities.each(function() {
    $(this).on('change', quantityChanged)
  })
  const addSizeBtns = $('.size-btn');
  addSizeBtns.each(function() {
    $(this).on('click', addToCartClick);
  })
  const confirmButton = $('.confirm-btn');
  $(confirmButton).on('click', purchaseClicked);

});

const removeCartItem = function(event) {

  const buttonClicked = event.target;
  const tableRow = buttonClicked.closest('tr');
  const cartSize = $(tableRow).find('.cart-size').text();
  const cartName = $(tableRow).find('.cart-name').text();

  //Find index of object in array
  const index = objOrderData.findIndex(x => (x.name === cartName && x.size === cartSize));
  objOrderData.splice(index, 1);

  tableRow.remove();
  updateCartTotal();

  //If user deletes all items from cart, hide cart
  const cartNames = $('.cart-row');
  if (cartNames.length === 0) {
    $('#cart').css('display', 'none');
  }
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
  const priceSlice = price.slice(1,3)
  let object = {
    name: itemName,
    price: priceSlice,
    size: size
  };
  objOrderData.push(object);
  addItemToCart(itemName, price, size);
  updateCartTotal();
};

const addItemToCart = function(itemName, price, size) {
  const cartNames = $('.cart-row');
  //If user adds something to cart, show cart
  if (cartNames.length+1 !== 0) {
    $('#cart').css('display', 'inline');
  }

  if (cartNames.length === 0) {
    addNewItem(itemName, price, size)
  } else if (!cartNames.text().includes(itemName)) {
    addNewItem(itemName, price, size);
  } else {
    //use count to see if size is found before foreach loops through all items
    let count = 0;
    //Loop through each item in the cart
    cartNames.each(function() {
      const container = $(this).closest('.cart-row');
      const sizeContainer = $(container).find('.cart-size').text();
      const nameContainer = $(container).find('.cart-name').text();

      //if size is the same exit foreach loop and name is same
      if (sizeContainer === size && nameContainer === itemName) {
        return false;
      }
      count++;
    });

    //if count is the same as length that size was not in the cart
    if (cartNames.length === count) {
      addNewItem(itemName, price, size);
    } else {
      //dom traversal to find and update quantity
      const table = $('#cart-table-id');
      const tbody = $(table.children()[1]);
      const tr = $(tbody.children()[count]);
      const quantity = $(tr).find('.quantity-input');
      let currentQuantity = parseInt(quantity.val());
      currentQuantity += 1;
      $(quantity).val(currentQuantity);
    }
  }
};

const addNewItem = function(itemName, price, size) {
  const $newItem = $(`<tr class="cart-row">
    <td class="cart-name">${itemName}</td>
    <td class="cart-size">${size}</td>
    <td class="item-price">${price}</td>
    <td><input class="quantity-input" type="number" value="1"></td>
    <td><button class="remove-btn" type="button">Delete</button></td>
    </tr>`)
    const $container = $('.cart-items');
    $container.append($newItem);

    const removeBtn = $('.remove-btn');
    $(removeBtn).off();
    $(removeBtn).on('click', removeCartItem);

    const quantityChange = $('.quantity-input');
    $(quantityChange).on('change', quantityChanged);
};

const purchaseClicked = function(event) {
  event.preventDefault();
  const button = $(this);
  const form = button.closest('.contact-form');
  const name = $(form).find('.contact-name').val();
  const phone = $(form).find('.contact-phone').val();

  $.ajax({
    method: "POST",
    url: "/updateOrderPurchase",
    data: { objOrderData, name, phone }
  }).done((data) => {
    window.location.href = `/OrderId/${data[0].id}`
  });
};
