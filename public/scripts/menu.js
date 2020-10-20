// const { ConnectAppInstance } = require("twilio/lib/rest/api/v2010/account/connectApp");

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
  const cartNames = $('.cart-name');
  // console.log('this is cart names', cartNames);
  if (cartNames.length === 0) {
    addNewItem(itemName, price, size)
  } else if (!cartNames.text().includes(itemName)) {
    addNewItem(itemName, price, size);
  } else {
    cartNames.each(function() {
      const cartContainer = $(this).closest('.cart-row');
      const sizeContainer = $(cartContainer).find('.cart-size');
      const sizeCart = sizeContainer.text();
      const cartName = $(this).text();
      if (cartName === itemName ) {
        const allSizes = $(`.cart-row:contains(${cartName})`).children('td.cart-size');
        console.log('all sizes', allSizes);
        if(!allSizes.text().includes(size)) {
          addNewItem(itemName, price, size);
        } else {
          $(allSizes).each((index)=> {
            console.log('this is all sizes index', allSizes[index]);
            console.log('this is all size includes size', allSizes.text().includes(size));
            if ($(allSizes[index]).text().toLowerCase() !== size.toLowerCase()) {
              return;
            }
            console.log('sizes are the same');
            const quantity = $(allSizes[index]).siblings().children('input.quantity-input');
            console.log('this is quantity', quantity);
            let currentQuantity = parseInt(quantity.val());
            currentQuantity += 1;
            $(quantity).val(currentQuantity);

        })
      }
    }
  })
  }
};
// const quantity = $(cartContainer).find('.quantity-input');
// $(allSizes).text().includes(size) &&




// const checkSize = function(cartName, sizeCart) {
//   const sizeArray = ['Small', 'Medium', 'Large'];
//   for(let i = 0; i< 3; i++) {
//     if ( sizeArray[i] === size && cartName === itemName) {
//       console.log('im in quantity increase')
//       const quantity = $(cartContainer).find('.quantity-input');
//       let currentQuantity = parseInt(quantity.val());
//       currentQuantity += 1;
//       $(quantity).val(currentQuantity);
//   }
//   }

// }

  //   if () {
  //     console.log('this is itemName', itemName);
  //     console.log('this is name', name);
  //     console.log('this is size', size);
  //     console.log('this is sizeCart', sizeCart);
  //     const quantity = $(cartContainer).find('.quantity-input');
  //     let currentQuantity = parseInt(quantity.val());
  //     currentQuantity += 1;
  //     $(quantity).val(currentQuantity);
  //     return false;
  //   }
  //   })
  // } else {
  //   console.log('im down here');
  //   addNewItem(itemName, price, size);
  //   return false;
  // }
//   }
// };

const increaseQuantity = function() {


}

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
    $(removeBtn).on('click', removeCartItem);
    const quantityChange = $('.quantity-input');
    $(quantityChange).on('change', quantityChanged);

}
  // } else if (){
  //   cartNames.each(function() {
  //   const name = $(this).text();
  //   console.log(name);
  //   const cartContainer = $(this).closest('.cart-row');
  //   const sizeContainer = $(cartContainer).find('.cart-size');
  //   const sizeCart = sizeContainer.text();
  //   if (name === itemName && sizeCart === size) {
  //     const quantity = $(cartContainer).find('.quantity-input');
  //     let currentQuantity = parseInt(quantity.val());
  //     currentQuantity += 1;
  //     $(quantity).val(currentQuantity);
  //     return false;
  //   )}
    // };


// const addItemToCart = function(itemName, price, size) {
//   const cartNames = $('.cart-name');
//
//     const name = $(this).text();
//     console.log(name);
//     const cartContainer = $(this).closest('.cart-row');
//     const sizeContainer = $(cartContainer).find('.cart-size');
//     const sizeCart = sizeContainer.text();
//     if (name === itemName && sizeCart === size) {
//       const quantity = $(cartContainer).find('.quantity-input');
//       let currentQuantity = parseInt(quantity.val());
//       currentQuantity += 1;
//       $(quantity).val(currentQuantity);
//       return false;
//       }
//     })
//     const $newItem = $(`<tr class="cart-row">
//     <td class="cart-name">${itemName}</td>
//     <td class="cart-size">${size}</td>
//     <td class="item-price">${price}</td>
//     <td><input class="quantity-input" type="number" value="1"></td>
//     <td><button class="remove-btn" type="button">Delete</button></td>
//     </tr>`)
//     const $container = $('.cart-items');
//     $container.append($newItem);
//     const removeBtn = $('.remove-btn');
//     $(removeBtn).on('click', removeCartItem);
//     const quantityChange = $('.quantity-input');
//     $(quantityChange).on('change', quantityChanged);
// };






const confirmClicked = function() {

}

// const cartNames = $('.cart-name');
//     cartNames.each(function() {
//     const name = $(this).text();
//     const cartContainer = $(this).closest('.cart-row');
//     const sizeContainer = $(cartContainer).find('.cart-size');
//     const sizeCart = sizeContainer.text();
//     if (name !== itemName && sizeCart !== size) {
//       const $newItem = $(`<tr class="cart-row">
//        <td class="cart-name">${itemName}</td>
//        <td class="cart-size">${size}</td>
//        <td class="item-price">${price}</td>
//        <td><input class="quantity-input" type="number" value="1"></td>
//        <td><button class="remove-btn" type="button">Delete</button></td>
//        </tr>`)
//        const $container = $('.cart-items');
//        $container.append($newItem);
//        const removeBtn = $('.remove-btn');
//        $(removeBtn).on('click', removeCartItem);
//        const quantityChange = $('.quantity-input');
//        $(quantityChange).on('change', quantityChanged);
//     } else {
//       const quantity = $(cartContainer).find('.quantity-input');
//       let currentQuantity = parseInt(quantity.val());
//       currentQuantity += 1;
//       $(quantity).val(currentQuantity);

//   }
// })
// };
